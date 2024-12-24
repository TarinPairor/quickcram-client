import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function HandleAuthCallback() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      console.log("Authorization Code:", code);
      setValue(40);

      if (code) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/create-tokens`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ code }),
            }
          );
          setValue(70);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Tokens received:", data);

          //TODO: Encrypt
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("refreshToken", data.refresh_token);
          localStorage.setItem("idToken", data.id_token);
          toast.info("Authenticated");
          setValue(100);
          navigate("/");
        } catch (error) {
          console.error("Error exchanging code:", error);
          toast.error("Error exchanging code.");
        }
      } else {
        console.error("No authorization code found in URL.");
        toast.error("No authorization code found in URL.");
        navigate("/");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">
          Processing authentication...
        </h2>
        <Progress className="w-full" value={value} />
      </div>
    </div>
  );
}

export default HandleAuthCallback;
