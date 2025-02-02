export interface BlizzardEventModel {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
}

/**
 * Example model:
 * {
 *  id: 1,
 *  title: 'this is the title',
 *  start: '2011-10-05T14:48:00.000Z',
 *  end: '2011-10-05T14:48:00.000Z',
 *  tags: ['raid', 'important', 'guild event'],
 *  emailOptIn: true,
 *  inAppOptIn: false,
 *  description: 'this is a really long description that will tell the user so much information it will be insane',
 *  repeatEvent: true,
 *  repeatOccurance: 'weekly'
 * }
 **/

export interface UserCalendarEventModel {
  id: number;
  title: string;
  start: Date;
  end: Date;
  tags?: string[];
  emailOptIn: boolean;
  inAppOptIn: boolean;
  description?: string;
  repeatEvent?: boolean;
  repeatOccurance?: string;
}

/* [
  {
    "id": 1,
    "title": "hallows eve",
    "start": "2024-11-15T10:00:00",
    "end": "2024-11-15T11:00:00"
  },
  {
    "id": 2,
    "title": "winter veil",
    "start": "2024-11-20T09:00:00",
    "end": "2024-11-20T17:00:00"
  }
] */

