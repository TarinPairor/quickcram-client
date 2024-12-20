import { useMutation } from "@tanstack/react-query";
// import { GoogleCalendarRequestBody } from "../types/GoogleCalendarRequestBody";

const handleChatGPTRequest = async (
  event: string
): Promise<string | undefined> => {
  try {
    if (!event) {
      console.error("No event provided.");
      return undefined;
    }
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/chatgpt`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: event,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json.choices[0].message.content);
    return json.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const useChatGPTMutation = () => {
  return useMutation<string | undefined, Error, string>({
    mutationFn: (event: string) => handleChatGPTRequest(event),
  });
};
