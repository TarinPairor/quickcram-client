export const fetchHealthCheckData = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //test deployment 1
    const json = await response.json();
    return JSON.stringify(json, null, 2);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
