import { useState } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useChatGPTMutation } from "../functions/handleChatGPTRequest";
import { useCreateCalendarEventMutation } from "../functions/useCreateCalendarEventMutation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CalendarEventDialog from "../components/CalendarEventDialog";
import InfoAccordion from "@/components/InfoAccordion";
import ProfileDropdown from "@/components/ProfileDropdown";
import { toast } from "sonner";
import Dictaphone from "../components/Dictaphone";
import AppHeader from "../components/AppHeader";

function Home() {
  const [prompt, setPrompt] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventData, setEventData] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState("");
  const [previousEventData, setPreviousEventData] = useState("");

  // const [isListening, setIsListening] = useState(false);
  // const [note, setNote] = useState<string | null | never>(null);
  // const [savedNotes, setSavedNotes] = useState<string[]>([]);

  const chatGPTMutation = useChatGPTMutation();
  const createCalendarEventMutation = useCreateCalendarEventMutation();

  const handleChatGPTClick = async () => {
    if (!prompt) {
      toast.warning("Please enter an event description.");
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
            toast.success("Event created successfully!", {
              description: "Check your Google Calendar to see the event.",
              action: {
                label: "Close",
                onClick: () => {
                  toast.dismiss();
                },
              },
            });
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
    <div className="flex flex-col items-center min-h-screen">
      <Dictaphone />
      <div className="absolute top-0 right-0 p-4">
        {localStorage.getItem("userName") &&
          localStorage.getItem("accessToken") && <ProfileDropdown />}
      </div>
      <AppHeader />
      <div className=" flex flex-wrap justify-center gap-2 m-10 p-10 border-4 rounded-md">
        <Button onClick={handleChatGPTClick} variant={"default"}>
          Submit Event
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
      <InfoAccordion />
    </div>
  );
}

export default Home;
