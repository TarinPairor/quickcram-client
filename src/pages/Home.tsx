import { useEffect, useMemo, useState } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useChatGPTMutation } from "../functions/useChatGPTMutation";
import { useCreateCalendarEventMutation } from "../functions/useCreateCalendarEventMutation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CalendarEventDialog from "../components/CalendarEventDialog";
import InfoAccordion from "@/components/InfoAccordion";
import ProfileDropdown from "@/components/ProfileDropdown";
import { toast } from "sonner";
import AppHeader from "../components/AppHeader";

function Home() {
  const [prompt, setPrompt] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventData, setEventData] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState("");
  const [previousEventData, setPreviousEventData] = useState("");
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = useMemo(
    () => (SpeechRecognition ? new SpeechRecognition() : null),
    [SpeechRecognition]
  );

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
            toast.info("Our AI created an event for you!");
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

  useEffect(() => {
    if (!mic) {
      console.error("SpeechRecognition is not supported in this browser.");
      return;
    }

    const handleListen = () => {
      if (isListening) {
        mic.start();
        mic.onend = () => {
          console.log("continue..");
          mic.start();
        };
      } else {
        mic.stop();
        mic.onend = () => {
          console.log("Stopped Mic on Click");
        };
      }
      mic.onstart = () => {
        console.log("Mics on");
      };

      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        console.log(transcript);
        setPrompt(
          (prevPrompt) => prevPrompt + (prevPrompt ? ". " : " ") + transcript
        );
        mic.onerror = (event) => {
          console.log(event.error);
        };
      };
    };
    handleListen();
  }, [isListening, mic]);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="absolute top-0 right-0 p-4">
        <ProfileDropdown />
      </div>
      <AppHeader />
      <div className="flex flex-wrap justify-center gap-2 m-10 p-10 border-4 rounded-md">
        <Button onClick={handleChatGPTClick} variant={"default"}>
          Submit Event
        </Button>
        {!mic ? (
          <span className="font-light text-xs">
            change browser for audio input
          </span>
        ) : (
          <Button
            variant={"ghost"}
            onClick={() => setIsListening((prevState) => !prevState)}
          >
            Start/Stop {isListening ? <span>🎙️...</span> : <span>🛑</span>}
          </Button>
        )}
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
