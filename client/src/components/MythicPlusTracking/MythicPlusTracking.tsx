import { Card, CardContent, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ThisWeekTracking from './ThisWeekTracking';

const MythicPlusTracking = () => {

  const fetchAffixes = () => {
    fetch('https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchAffixes()
  }, []);

  const [activeTab, setActiveTab] = useState<string>('Mythic+') //set to default, will read from user profile db

  const tabs: string[] = [
    'This week (week #)',
    'Next three (3) weeks'
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
      case 'Next three (3) weeks': {
        return (<ThisWeekTracking />)
      }
      default: { 
        return (null)
      } 
   } 
  } 

  return (
    <Card>
      <CardContent>
        <Tabs value={activeTab} onChange={handleTabSwitch}>
          {tabs.map((tab) => (
            <Tab label={tab} key={tab} value={tab} sx={{color: 'black', fontFamily: 'Poppins'}}/>
          ))}
        </Tabs>
        {renderTab()}
      </CardContent>
    </Card>
  );
};

export default MythicPlusTracking;