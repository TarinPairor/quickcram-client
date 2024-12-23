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
    })
    .catch((error) => {
      console.error("Error verifying credential:", error);
    });
