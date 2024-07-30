import { Box, Card, CardContent, IconButton, Tab, Tabs, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import ThisWeekTracking from './ThisWeekTracking';
import { NavLink } from 'react-router-dom';

const MythicPlusTracking = () => {


  const [activeTab, setActiveTab] = useState<string>('Mythic+') //set to default, will read from user profile db

  const tabs: string[] = [
    'This week (week #)',
    //'Next three (3) weeks' <- implement later when I figure out a way to get next weeks
  ];

/*  
* in settings have user choose a "focus" between guild and m+ (pvp later maybe), meaning
*  this will make be the default leaderboard tab when the user loads in 
*/
  const handleTabSwitch = (e: React.SyntheticEvent, newTab: string) => {
    setActiveTab(newTab);
  }

  const renderTab = () => {
    switch(activeTab) { 
      case 'This week (week #)': { 
        return (<ThisWeekTracking />)
      }
      default: { 
        return (
          <Card>
            <CardContent></CardContent>
          </Card>)
      } 
    } 
  } 

  return (
    <Card>
      <CardContent>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Tabs value={activeTab} onChange={handleTabSwitch}>
            {tabs.map((tab) => (
              <Tab label={tab} key={tab} value={tab} sx={{color: 'black', fontFamily: 'Poppins'}}/>
            ))}
          </Tabs>
          <Tooltip placement='top' title='Raider.io Best Routes'>
            <IconButton 
              aria-label='raider.io' 
              component={NavLink} 
              to={'https://raider.io/weekly-routes'}
              disableRipple={true}
              sx={{display: 'flex', justifyContent: 'flex-end', width: 'auto', height: 'auto', padding: 0 }}>
              <img style={{width: '32px', height: '32px' }}src="https://avatars.githubusercontent.com/u/26493840?s=280&v=4" />
            </IconButton>
          </Tooltip>
        </Box>
        {renderTab()}
      </CardContent>
    </Card>
  );
};

export default MythicPlusTracking;