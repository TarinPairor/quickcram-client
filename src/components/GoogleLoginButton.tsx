import { fetchUserPayload } from "@/functions/fetchUserPayload";
import { redirectToAuthPage } from "@/functions/redirectToAuthPage";
// import googleLogo from "../assets/google-logo.svg";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  return (
    <>
      {/* <button
        onClick={redirectToAuthPage}
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
          redirectToAuthPage();
        }}
        onError={() => {
          console.error("Google login failed:");
        }}
      />
    </>
  );
};

export default GoogleLoginButton;
