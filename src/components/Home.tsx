import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "../App.css";
import { fetchHealthCheckData } from "../functions/fetchHealthCheckData";
import GoogleLoginButton from "./GoogleLoginButton";

function Home() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchHealthCheckData,
  });

  const [event, setEvent] = useState("");

  const handleChatGPTRequest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chatgpt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: "I need to meet John at 7:50-8:30PM tomorrow.",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createCalendarEvent = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/create-calendar-event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          // empty body
          body: JSON.stringify({}),
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error creating calendar event:", error);
    }
  };

  return (
    <>
      <button onClick={handleChatGPTRequest} className="">
        Call chatgpt
      </button>
      <GoogleLoginButton />
      <div className="mb-6 font-poppins">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        <label
          htmlFor="large-input"
          className="block mb-2 text-lg text-gray-900 dark:text-white"
        >
          Large input
        </label>
        <textarea
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          id="large-input"
          className="block w-full p-4 text-gray-900 border-b border-l border-gray-300 rounded-lg bg-gray-50 text-base focus:border-b-blue-500 focus:border-l-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-b-blue-500"
        />
        <button onClick={createCalendarEvent} className="mt-4">
          Create Calendar Event
        </button>
      </div>
    </>
  );
}

export default Home;
