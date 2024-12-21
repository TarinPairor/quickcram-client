import { GoogleCalendarRequestBody } from "../types/GoogleCalendarRequestBody";

export const reformatEvent = (
  event: string
): GoogleCalendarRequestBody | null => {
  try {
    const parsedEvent = JSON.parse(event);

    return {
      summary: parsedEvent.summary,
      description: parsedEvent.description,
      location: parsedEvent.location,
      start: parsedEvent.start.map((start: { dateTime: string }) => ({
        dateTime: start.dateTime,
      })),
      end: parsedEvent.end.map((end: { dateTime: string }) => ({
        dateTime: end.dateTime,
      })),
    };
  } catch (error) {
    console.error("Error parsing event JSON:", error);
    return null;
  }
};
