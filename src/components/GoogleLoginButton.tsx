import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const handleSuccess = async (
    credentialResponse: GoogleCredentialResponse
  ) => {
    console.log("Login Success:", credentialResponse);
    const { credential } = credentialResponse;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/verify-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ credential }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  };

  const handleError = () => {
    console.error("Login Failed:");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default GoogleLoginButton;
