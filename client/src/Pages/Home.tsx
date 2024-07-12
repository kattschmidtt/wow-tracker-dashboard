import { useContext, useEffect, useState } from 'react';
import MiniCalendar from '../components/Calendar/MiniCalendar';
import {getCurrentISODate, prettyDate} from '../util/util';
import { UserContext } from '../context/userContext';

const Home = () => {

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setCurrentTime(getCurrentISODate())
    prettyDate()
  }, [])

  return (
    <div>
      <MiniCalendar />
    </div>
  );
};

export default Home;