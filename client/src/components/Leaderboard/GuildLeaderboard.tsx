import { Box, Paper, TableContainer, Table, TableBody, TableRow, TableCell, Tooltip, FormControlLabel, Switch, TableHead } from '@mui/material';
import React from 'react';
import { prettyTime, prettySpecificDate } from '../../util/util';

const GuildLeaderboard = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <TableHead>hehe</TableHead>
            <TableBody>
              wfwf
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </Box>
  );
};

export default GuildLeaderboard;