export default function AppHeader() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-4">QuickCram</h1>
      <p className="text-center mt-2 flex flex-wrap">
        {localStorage.getItem("userName")
          ? `Welcome ${localStorage.getItem("userName")?.replace(/['"]+/g, "")}`
          : "Sign in through Google"}
        . Quickly create Google Calendar events with AI!
      </p>
    </div>
  );
}
