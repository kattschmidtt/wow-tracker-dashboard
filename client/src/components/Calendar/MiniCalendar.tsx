import React, { useContext } from 'react';
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
      <Tooltip title='Add calendar event' placement='top' >
        <IconButton component={Link} to="/login" style={{ 
          justifyContent: 'space-between', 
          marginLeft: 'auto', 
          background: '#68ad51', 
          color: '#ffffff',
          top: '1.125rem'}}>
          <AddIcon />
        </IconButton>
      </Tooltip>

      <br/>
      
      <div className='mini-cal'>
        <Calendar />
      </div>
    </>
  );
};

export default MiniCalendar;