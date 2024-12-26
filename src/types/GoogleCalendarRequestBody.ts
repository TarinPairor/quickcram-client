export interface GoogleCalendarRequestBody {
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime: string;
    timeZone: string;
  }[];
  end: {
    dateTime: string;
    timeZone: string;
  }[];
}
