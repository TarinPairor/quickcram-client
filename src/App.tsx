import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/Home";
import viteLogo from "/vite.svg";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <img src={viteLogo} alt="Vite Logo" />
      <Home />
      {/* <Home /> */}
    </QueryClientProvider>
  );
}
