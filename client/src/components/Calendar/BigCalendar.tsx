// MyCalendar.tsx
import { useContext, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import CalendarToolbar from "./CalendarToolbar";
import { CalendarContext } from "../../context/CalendarContext";
import Tooltip from "@mui/material/Tooltip";
import { UserCalendarEventModel } from "../../Models/calendarModel";
import EditEventModal from "./EditEventModal";

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
  const {
    userEvents,
    blizzardEvents,
    isLoading,
    error,
    updateUserEvent,
    deleteUserEvent,
  } = useContext(CalendarContext);
  const [editingEvent, setEditingEvent] =
    useState<UserCalendarEventModel | null>(null); //the actual event being edited

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const allEvents = [...userEvents, ...blizzardEvents];

  //determine event color based on tags
  const eventPropGetter = (event: any) => {
    let bgColor = "#1e71e7"; //basic blizzard blue

    if (event.tags && event.tags.includes("raid")) {
      bgColor = "#d9ac25";
    }
    if (event.tags && event.tags.includes("guild event")) {
      bgColor = "7A49A5";
    }
    if (event.tags && event.tags.includes("important")) {
      bgColor = "#E4009A";
    }

    return {
      style: {
        backgroundColor: bgColor,
        color: "#ffffff",
        borderRadius: "4px",
        border: "none",
      },
    };
  };

  const HoverEvent = ({ event }: { event: UserCalendarEventModel }) => (
    <Tooltip title={event.description} placement="top">
      <div style={{ width: "100%", height: "100%" }}>{event.title}</div>
    </Tooltip>
  );

  const handleEditDoubleClick = (event: any) => {
    //alert("you clicked edit woohoo");
    //check to make sure it is a user event, blizzard events not editable
    const isUserEvent = userEvents.some((e) => e.id === event.id); //where e is the item clicked
    if (!isUserEvent) return;

    setEditingEvent(event);
  };

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
        components={{ toolbar: CalendarToolbar, event: HoverEvent }}
        eventPropGetter={eventPropGetter}
        onDoubleClickEvent={handleEditDoubleClick}
        tooltipAccessor={() => ""}
      />

      <EditEventModal
        event={editingEvent}
        open={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        onSubmit={updateUserEvent}
        onDelete={(event) => deleteUserEvent(event.id)}
      />
    </div>
  );
};

export default MyCalendar;
