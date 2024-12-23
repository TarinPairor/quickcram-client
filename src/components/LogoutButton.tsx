import { toast } from "sonner";

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPicture");
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully", {
      action: {
        label: "Close",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center px-4 py-2 bg-red-600 text-white border border-red-700 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
