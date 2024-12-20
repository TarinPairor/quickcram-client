export interface GoogleCalendarRequestBody {
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime: string;
  }[];
  end: {
    dateTime: string;
  }[];
}
