import { createContext, ReactNode, useState, useEffect } from "react";
import {
  BlizzardEventModel,
  UserCalendarEventModel,
} from "../Models/calendarModel";

export const CalendarContext = createContext<{
  userEvents: UserCalendarEventModel[];
  blizzardEvents: BlizzardEventModel[];
  addUserEvent: (event: UserCalendarEventModel) => void;
  updateUserEvent: (event: UserCalendarEventModel) => void;
  deleteUserEvent: (eventId: number) => void;
  isLoading: boolean;
  error: string | null;
}>({
  userEvents: [],
  blizzardEvents: [],
  addUserEvent: () => {},
  updateUserEvent: () => {},
  deleteUserEvent: () => {},
  isLoading: true,
  error: null,
});

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider = ({
  children,
}: CalendarProviderProps): JSX.Element => {
  const [userEvents, setUserEvents] = useState<UserCalendarEventModel[]>(() => {
    const saved = sessionStorage.getItem("userEvents");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((event: any) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
    }
    return [];
  });
  const [blizzardEvents, setBlizzardEvents] = useState<BlizzardEventModel[]>(
    [],
  ); //this should be in the same place as the user .json events but rarely editted
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //sessionstorage for userevents
  useEffect(
    () => sessionStorage.setItem("userEvents", JSON.stringify(userEvents)),
    [userEvents],
  );

  //load in blizz event on render
  useEffect(() => {
    const loadBlizzEvent = async () => {
      try {
        //trying out async await format instead of .then
        const resp = await fetch(`/placeholderCalendar.json`);
        const eventData = await resp.json();
        const mappedEvents: BlizzardeventModel[] = eventData.map(
          (event: any) => ({
            id: event.id,
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
          }),
        );

        setBlizzardEvents(mappedEvents);
        setIsLoading(false);
      } catch (err) {
        setError(`Failed to load blizz events: ${err}`);
        setIsLoading(false);
      }
    };

    loadBlizzEvent();
  }, []);

  //user based events
  const addUserEvent = (event: UserCalendarEventModel) =>
    setUserEvents((prevEvents) => [...prevEvents, event]);
  const updateUserEvent = (event: UserCalendarEventModel) => {
    setUserEvents((prevEvents) =>
      prevEvents.map((e) => (e.id === event.id ? event : e)),
    );
  };
  const deleteUserEvent = (eventId: number) =>
    setUserEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventId));

  return (
    <CalendarContext.Provider
      value={{
        isLoading,
        error,
        userEvents,
        blizzardEvents,
        addUserEvent,
        updateUserEvent,
        deleteUserEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
