import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardContent, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const MiniCalendar = () => {

  const { user } = useContext(UserContext);

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-start', paddingTop: '5rem'}}>
        <Tooltip title='Add calendar event' placement='right'>
          <IconButton sx={{
            '&:hover': {
              color: 'black',
            },
            backgroundColor: '#5c946d', 
            color: '#ffffff',
          }}
            size="small"
            component={Link}
            to="/my-calendar">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>

      <br/>

      <Card sx={{width: '38vh'}}>
        <CardContent>
      <div className='mini-cal'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar sx={{}}/>
        </LocalizationProvider>
      </div>
      </CardContent>
      </Card>
    </>
  );
};

export default MiniCalendar;
