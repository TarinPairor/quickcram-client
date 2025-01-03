import { useEffect, useMemo, useState } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useChatGPTMutation } from "../functions/useChatGPTMutation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CalendarEventDialog from "../components/CalendarEventDialog";
import InfoAccordion from "@/components/InfoAccordion";
import ProfileDropdown from "@/components/ProfileDropdown";
import { toast } from "sonner";
import AppHeader from "../components/AppHeader";

function Spinner() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      {/* <span className="sr-only">Loading...</span> */}
    </div>
  );
}

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

  const { mutate: chatGPTMutate, isPending } = useChatGPTMutation();

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
      chatGPTMutate(prompt, {
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
          (prevPrompt) => prevPrompt + (prevPrompt ? ". " : "") + transcript
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
        <Button
          onClick={handleChatGPTClick}
          variant={"default"}
          disabled={localStorage.getItem("accessToken") !== "YouWish"}
        >
          {isPending ? "Submit Event" : <Spinner />}
        </Button>
        {!mic ? (
          <span className="font-light text-xs">
            change browser for audio input
          </span>
        ) : (
          <Button
            variant={"default"}
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
          // onConfirm={handleConfirm}
          eventData={eventData}
        />
      </div>
      <InfoAccordion />
    </div>
  );
}

export default Home;
