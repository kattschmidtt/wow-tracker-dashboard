// MyCalendar.tsx
import { useContext } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import CalendarToolbar from "./CalendarToolbar";
import { CalendarContext } from "../../context/CalendarContext";

const locales = { "en-US": enUS };
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
  const { userEvents, blizzardEvents, isLoading, error } =
    useContext(CalendarContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const allEvents = [...userEvents, ...blizzardEvents];

  return (
    <div style={{ height: "100vh" }}>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month", "week", "day"]}
        style={{ height: "100%", width: "100%" }}
        components={{ toolbar: CalendarToolbar }}
      />
    </div>
  );
};

export default MyCalendar;
