import { useMutation } from "@tanstack/react-query";

const testEvent = {
  summary: "Test Event",
  description: "This is a test event",
  location: "1234 Test St, Test City, TS",
  start: [
    {
      dateTime: new Date().toISOString(),
    },
  ],
  end: [
    {
      dateTime: new Date().toISOString(),
    },
  ],
};

const createCalendarEvent = async (event: string) => {
  try {
    console.log("Creating calendar event...");
    console.log("Event:", event);
    const reformattedEvent = JSON.parse(event);
    console.log("Reformatted event:", reformattedEvent);
    console.log("Correct event format:", testEvent);
    //convert event to testEvent format

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/create-calendar-event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event: reformattedEvent }),
      }
    );
    console.log("Sent reformatted event:", { event: reformattedEvent });
    console.log(response);
  } catch (error) {
    console.error("Error creating calendar event:", error);
  }
};

export const useCreateCalendarEventMutation = () => {
  return useMutation<void, Error, string>({
    mutationFn: (event: string) => createCalendarEvent(event),
  });
};
