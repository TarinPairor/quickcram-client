import { CredentialResponse } from "@react-oauth/google";

export const fetchUserPayload = async (response: CredentialResponse) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-credential`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ credential: response.credential }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Verification response:", data);
      localStorage.setItem("userName", JSON.stringify(data.payload.given_name));
      localStorage.setItem("userEmail", JSON.stringify(data.payload.email));
      localStorage.setItem("userPicture", JSON.stringify(data.payload.picture));
      console.log("User name:", localStorage.getItem("userName"));
      console.log("User email:", localStorage.getItem("userEmail"));
      console.log("User picture:", localStorage.getItem("userPicture"));
    })
    .catch((error) => {
      console.error("Error verifying credential:", error);
    });
