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

  return <button onClick={handleLoginClick}>Sign in with Google</button>;
};

export default GoogleLoginButton;
