import { useState, useContext, useMemo } from 'react';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { Box, TableHead, TableRow, TableCell, TableSortLabel, Paper, TableContainer, Table, TableBody, FormControlLabel, Switch, Tooltip, CircularProgress } from '@mui/material';
import { LeaderboardContext } from '../../context/LeaderboardContext';
import { LeaderboardModel } from '../../Models/leaderboardModel';
import { prettySpecificDate, prettyTime } from '../../util/util';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: string | number },
  b: { [key in Key]: string | number },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: Exclude<keyof LeaderboardModel, 'affixes'>;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'dungeon',
    numeric: false,
    disablePadding: true,
    label: 'Dungeon',
  },
  {
    id: 'score',
    numeric: true,
    disablePadding: false,
    label: 'Score',
  },
  {
    id: 'mythic_level',
    numeric: true,
    disablePadding: false,
    label: 'Level',
  },
  {
    id: 'clear_time_ms',
    numeric: true,
    disablePadding: false,
    label: 'Clear Time',
  },
  {
    id: 'completed_at',
    numeric: true,
    disablePadding: false,
    label: 'Completed On',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: Exclude<keyof LeaderboardModel, 'affixes'>) => void;
  order: Order;
  orderBy: Exclude<keyof LeaderboardModel, 'affixes'>;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: Exclude<keyof LeaderboardModel, 'affixes'>) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<Exclude<keyof LeaderboardModel, 'affixes'>>('score');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  
  const { leaderboard, isLoading, error } = useContext(LeaderboardContext);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: Exclude<keyof LeaderboardModel, 'affixes'>,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - leaderboard.length) : 0;

  const sortedRows = useMemo(
    () =>
      //ensure that leaderboard is not null or undefined
      stableSort(leaderboard || [], getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [leaderboard, order, orderBy, page, rowsPerPage],
  );

  if (error !== null) {
    console.error(error)
    return <div>No current season active. <br/>Check back later!</div>
  }

  if (!leaderboard || leaderboard.length === 0) {
    return <div>No leaderboard data to show</div>
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {
          isLoading ? (<CircularProgress />) : (
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={leaderboard.length}
                />
                <TableBody>
                  {sortedRows.map((row, index) => {
                    console.log(row)
                    const labelId = `enhanced-table-checkbox-${index}`
                    const affixNames = row.affixes.map((affix) => affix.name).join(', ')
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          sx={{fontFamily: 'Poppins'}}
                        >
                          <b>{row.dungeon}</b>
                        </TableCell>
                        <TableCell align="right">{row.score}</TableCell>
                        <Tooltip placement="top" title={affixNames}>
                          <TableCell align="right">{row.mythic_level}</TableCell>
                        </Tooltip>
                        <TableCell align="right">{prettyTime(row.clear_time_ms)}</TableCell>
                        <TableCell align="right">{prettySpecificDate(row.completed_at)}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )
        }
        
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Squish"
      />
    </Box>
  );
}
