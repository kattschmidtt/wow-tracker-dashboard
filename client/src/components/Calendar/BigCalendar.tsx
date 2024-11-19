// MyCalendar.tsx
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { BlizzardEventModel } from '../../Models/calendarModel';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: enUS }),
  getDay,
  locales,
});

// Define MyCalendar component with loading state for events
//TODO: make this a context call using the blizzard api. Model will have to be
//  redone
const MyCalendar = () => {
  const [blizzEvents, setBlizzEvents] = useState<BlizzardEventModel[]>([]);

  useEffect(() => {
    //load in placeholder blizzard events
    const loadBlizzEvents = async () => {
      try {
        const response = await fetch('/placeholderCalendar.json');
        const eventsData = await response.json();
        //map data based on blizzeventmodel (NEED TO CHANGE FROM "any")
        const mappedEvents: BlizzardEventModel[] = eventsData.map((event: any) => ({
          id: event.id,
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setBlizzEvents(mappedEvents);
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };

    loadBlizzEvents();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Calendar
        localizer={localizer}
        events={blizzEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={['month', 'week', 'day']}
        style={{ height: '100%', width: '100%'}}
      />
    </div>
  );
};

export default MyCalendar;
