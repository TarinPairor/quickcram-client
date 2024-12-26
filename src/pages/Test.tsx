import { fetchHealthCheckData } from "../functions/fetchHealthCheckData";
import { useQuery } from "@tanstack/react-query";

export default function Test() {
  const {
    data: healthCheck,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["healthCheck"],
    queryFn: fetchHealthCheckData,
  });

  console.log("Health check data:", healthCheck);
  return (
    <div>
      <div className="mb-6 font-poppins">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}
        {healthCheck && <pre>{JSON.stringify(healthCheck, null, 2)}</pre>}
      </div>
    </div>
  );
}
