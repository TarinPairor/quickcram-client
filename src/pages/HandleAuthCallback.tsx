import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HandleAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      console.log("Authorization Code:", code);

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

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Tokens received:", data);

          //TODO: Encrypt
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("refreshToken", data.refresh_token);
          localStorage.setItem("idToken", data.id_token);
          navigate("/");
        } catch (error) {
          console.error("Error exchanging code:", error);
        }
      } else {
        console.error("No authorization code found in URL.");
        navigate("/");
      }
    };

    handleCallback();
  }, [navigate]);

  return <div>Processing authentication...</div>;
}

export default HandleAuthCallback;
