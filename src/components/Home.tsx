import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "../App.css";
import { fetchHealthCheckData } from "../functions/fetchHealthCheckData";

function Home() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchHealthCheckData,
  });

  const [event, setEvent] = useState("");
  const [id, setId] = useState(localStorage.getItem("id") || "");

  const handleChatGPTRequest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chatgpt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: "Who are you?" }),
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

  const handleIdSubmit = () => {
    localStorage.setItem("id", id);
    alert(`ID ${id} stored in browser`);
  };

  return (
    <>
      <button onClick={handleChatGPTRequest}>Call chatgpt</button>
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
      </div>
      <div className="mb-6 font-poppins">
        <label
          htmlFor="id-input"
          className="block mb-2 text-lg text-gray-900 dark:text-white"
        >
          Set ID
        </label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          id="id-input"
          className="block w-full p-4 text-gray-900 border-b border-l border-gray-300 rounded-lg bg-gray-50 text-base focus:border-b-blue-500 focus:border-l-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-b-blue-500"
        />
        <button
          onClick={handleIdSubmit}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Submit ID
        </button>
      </div>
    </>
  );
}

export default Home;
