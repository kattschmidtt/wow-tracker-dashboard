import { createContext, ReactNode, useState } from "react";
import {
  BlizzardEventModel,
  UserCalendarEventModel,
} from "../Models/calendarModel";

export const CalendarContext = createContext<{
  userEvents: UserCalendarEventModel[];
  blizzardEvents: BlizzardEventModel[];
  isLoading: boolean;
  error: string | null;
}>({
  userEvents: [],
  blizzardEvents: [],
  isLoading: true,
  error: null,
});

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider = ({
  children,
}: CalendarProviderProps): JSX.Element => {
  const [userEvents, setUserEvents] = useState<UserCalendarEventModel[]>([]); //initialized to saved .json
  const [blizzardEvents, setBlizzardEvents] = useState<BlizzardEventModel[]>(
    [],
  ); //this should be in the same place as the user .json events but rarely editted
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <CalendarContext.Provider
      value={{ isLoading, error, userEvents, blizzardEvents }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
