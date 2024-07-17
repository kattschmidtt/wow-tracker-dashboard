import { useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { UserContext } from '../../context/userContext';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const MiniCalendar = () => {

  const { user } = useContext(UserContext);

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-start'}}>
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
            to="/login">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>

      <br/>
      
      <div className='mini-cal'>
        <Calendar />
      </div>
    </>
  );
};

export default MiniCalendar;
