import { useEffect, useState } from "react";
import "../App.css";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useChatGPTMutation } from "../functions/handleChatGPTRequest";
import { useCreateCalendarEventMutation } from "../functions/useCreateCalendarEventMutation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Home() {
  const [isSignedIn, setIsSignedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    setIsSignedIn(!!localStorage.getItem("accessToken"));
  }, []);

  const [prompt, setPrompt] = useState("");

  const chatGPTMutation = useChatGPTMutation();
  const createCalendarEventMutation = useCreateCalendarEventMutation();

  const handleChatGPTClick = async () => {
    chatGPTMutation.mutate(prompt, {
      onSuccess: (data) => {
        if (data) {
          console.log("ChatGPT response:", data);
          createCalendarEventMutation.mutate(data);
        }
      },
      onError: (error) => {
        console.error("Error calling chatgpt:", error);
      },
    });
  };

  return (
    <>
      <Button onClick={handleChatGPTClick} className="">
        Call chatgpt
      </Button>

      {isSignedIn ? (
        <>
          <label
            htmlFor="large-input"
            className="block mb-2 text-lg text-gray-900 dark:text-white"
          >
            Large input
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            id="large-input"
          />
        </>
      ) : (
        <GoogleLoginButton />
      )}
    </>
  );
}

export default Home;
