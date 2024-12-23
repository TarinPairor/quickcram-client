import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HandleAuthCallback from "./pages/HandleAuthCallback";
import Test from "./pages/Test";
import "./App.css";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function App() {
  return (
    <div className="font-sans">
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={clientId}>
          <Toaster richColors />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
              <Route path="/auth/callback" element={<HandleAuthCallback />} />
            </Routes>
          </Router>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </div>
  );
}
