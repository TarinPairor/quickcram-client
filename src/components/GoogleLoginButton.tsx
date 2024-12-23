import { fetchUserPayload } from "@/functions/fetchUserPayload";
// import googleLogo from "../assets/google-logo.svg";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const handleLoginClick = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    const scope =
      "openid profile email https://www.googleapis.com/auth/calendar";
    const responseType = "code";
    const accessType = "offline";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(
      scope
    )}&access_type=${accessType}`;

    // Redirect the user to Google's OAuth 2.0 authorization endpoint
    window.location.href = authUrl;
  };
  return (
    <>
      {/* <button
        onClick={handleLoginClick}
        className="flex items-center justify-center px-4 py-2 bg-black border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <img src={googleLogo} alt="Google Logo" className="w-6 h-6 mr-2" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button> */}
      <GoogleLogin
        size="large"
        shape="rectangular"
        onSuccess={(response) => {
          console.log("Google fetching payload with crendentials:", response);
          fetchUserPayload(response);
          handleLoginClick();
        }}
        onError={() => {
          console.error("Google login failed:");
        }}
      />
    </>
  );
};

export default GoogleLoginButton;
