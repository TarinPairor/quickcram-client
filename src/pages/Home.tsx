import { useEffect, useState } from "react";
import "../App.css";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useChatGPTMutation } from "../functions/handleChatGPTRequest";
import { useCreateCalendarEventMutation } from "../functions/useCreateCalendarEventMutation";
import { Button } from "@/components/ui/button";

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
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            id="large-input"
            className="block w-full p-4 text-gray-900 border-b border-l border-gray-300 rounded-lg bg-gray-50 text-base focus:border-b-blue-500 focus:border-l-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-b-blue-500"
          />
        </>
      ) : (
        <GoogleLoginButton />
      )}
    </>
  );
}

export default Home;
