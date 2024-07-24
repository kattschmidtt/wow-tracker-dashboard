import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { prettyNumberFormat } from '../../util/util';
import { Box, TableHead, TableRow, TableCell, TableSortLabel, Toolbar, Typography, Paper, TableContainer, Table, TableBody, FormControlLabel, Switch } from '@mui/material';

interface MythicPlusData {
  id: number;
  dungeonName: string;
  fortScore: number;
  tyranScore: number;
  rating: number;
  bestTime: string;
  latestTime: string;
  worldRanking: number;
}

function createData(
  id: number,
  dungeonName: string,
  fortScore: number,
  tyranScore: number,
  rating: number,
  bestTime: string,
  latestTime: string,
  worldRanking: number,
): MythicPlusData {
  return {
    id,
    dungeonName,
    fortScore,
    tyranScore,
    rating,
    bestTime,
    latestTime,
    worldRanking,
  };
}

const rows = [
  createData(1, 'Brackenhide Hollow', 11, 11, 359.7, '24:58', '25:30', 116239),
  createData(2, 'Azure Vault', 10, 12, 359.7, '24:58', '25:30', 116239),
  createData(3, 'Algethar Academy', 9, 11, 359.7, '24:58', '25:30', 116239),
  createData(4, 'Ruby Life Pools', 5, 1, 359.7, '24:58', '25:30', 116239),
  createData(5, 'Neltharius', 11, 11, 359.7, '24:58', '25:30', 116239),
  createData(6, 'Halls of Infusion', 10, 11, 359.7, '24:58', '25:30', 116239),
  createData(7, 'The Nokhud Offensive', 11, 11, 359.7, '24:58', '25:30', 116239),
  createData(8, 'Uldaman: Legacy of Tyr', 11, 11, 359.7, '24:58', '25:30', 116239),
];

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
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
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
  id: keyof MythicPlusData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'dungeonName',
    numeric: false,
    disablePadding: true,
    label: 'Dungeon Name',
  },
  {
    id: 'fortScore',
    numeric: true,
    disablePadding: false,
    label: 'Fortified Score',
  },
  {
    id: 'tyranScore',
    numeric: true,
    disablePadding: false,
    label: 'Tyranical Score',
  },
  {
    id: 'rating',
    numeric: true,
    disablePadding: false,
    label: 'Rating',
  },
  {
    id: 'bestTime',
    numeric: true,
    disablePadding: false,
    label: 'Best Time',
  },
  {
    id: 'latestTime',
    numeric: true,
    disablePadding: false,
    label: 'Latest Time',
  },
  {
    id: 'worldRank',
    numeric: true,
    disablePadding: false,
    label: 'World Rank',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof MythicPlusData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof MythicPlusData) => (event: React.MouseEvent<unknown>) => {
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
              {headCell.label}
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

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Dragonflight Season 4
        </Typography>
      )}
    </Toolbar>
  );
}
export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof MythicPlusData>('fortScore');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof MythicPlusData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.dungeonName}
                    </TableCell>
                    <TableCell align="right">{row.fortScore}</TableCell>
                    <TableCell align="right">{row.tyranScore}</TableCell>
                    <TableCell align="right">{row.rating}</TableCell>
                    <TableCell align="right">{row.bestTime}</TableCell>
                    <TableCell align="right">{row.latestTime}</TableCell>
                    <TableCell align="right">{prettyNumberFormat(row.worldRanking)}</TableCell>
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
        
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Squish"
      />
    </Box>
  );
}
