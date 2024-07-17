import { Card, CardContent, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

const Leaderboard = () => {

  const [activeTab, setActiveTab] = useState<string>('Mythic+') //set to default, will read from user profile db

  const tabs: string[] = [
    'Mythic+',
    'Guild Raiding',
    'PvP'
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
      case 'Guild Raiding': { 
        return (<div>Guild Raiding Card Component here</div>)
      } 
      case 'PvP': { 
        return (<div>PvP Card Component here</div>)
      } 
      default: { 
        return (<div>M+ Card Component here</div>)
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

export default Leaderboard;