import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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
    //NOTE: Uncomment the line below to see the response in the console
    // console.log(response);
    if (!response.ok) {
      console.log("Error creating calendar event:", response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw error;
  }
};

export const useCreateCalendarEventMutation = () => {
  return useMutation<void, Error, string>({
    mutationFn: (event: string) => createCalendarEvent(event),
    onSuccess: () => {
      console.log("Calendar event created successfully!");
      toast.success("Event created successfully!", {
        description: "Check your Google Calendar!",
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    },
    onError: (error) => {
      console.error("Error creating calendar event:", error);
      toast.error("Error creating event.", {
        description: "Try logging in again?",
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    },
  });
};
