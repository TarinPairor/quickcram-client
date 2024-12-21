import { useState } from "react";
import "../App.css";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useChatGPTMutation } from "../functions/handleChatGPTRequest";
import { useCreateCalendarEventMutation } from "../functions/useCreateCalendarEventMutation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CalendarEventDialog from "../components/CalendarEventDialog";

function Home() {
  const [prompt, setPrompt] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventData, setEventData] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState("");
  const [previousEventData, setPreviousEventData] = useState("");

  const chatGPTMutation = useChatGPTMutation();
  const createCalendarEventMutation = useCreateCalendarEventMutation();

  const handleChatGPTClick = async () => {
    if (!prompt) {
      return;
    }
    if (prompt === previousPrompt && previousEventData) {
      // Reuse the existing event data
      setEventData(previousEventData);
      setIsDialogOpen(true);
    } else {
      // Make a new API call
      chatGPTMutation.mutate(prompt, {
        onSuccess: (data) => {
          if (data) {
            console.log("ChatGPT response:", data);
            setEventData(data);
            setPreviousPrompt(prompt);
            setPreviousEventData(data);
            setIsDialogOpen(true);
          }
        },
        onError: (error) => {
          console.error("Error calling chatgpt:", error);
        },
      });
    }
  };

  const handleConfirm = () => {
    if (eventData) {
      createCalendarEventMutation.mutate(eventData);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="container flex flex-col gap-2">
      <Button onClick={handleChatGPTClick} className="">
        Call chatgpt
      </Button>

      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        id="large-input"
      />

      <GoogleLoginButton />

      <CalendarEventDialog
        isOpen={isDialogOpen}
        onRequestClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
        eventData={eventData}
      />
    </div>
  );
}

export default Home;
