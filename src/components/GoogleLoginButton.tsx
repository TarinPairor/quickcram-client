import { fetchUserPayload } from "@/functions/fetchUserPayload";
import { redirectToAuthPage } from "@/functions/redirectToAuthPage";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  return (
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
  );
};

export default GoogleLoginButton;
