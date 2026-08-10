import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
export default function App() {
  const [status, setStatus] = useState("Connecting to the API...");
  useEffect(() => {
    fetch(`${apiUrl}/api/health`).then((response) => response.json())
      .then((data) => setStatus(`${data.message}; MongoDB: ${data.database}`))
      .catch((error) => setStatus(`API unavailable: ${error.message}`));
  }, []);
  return <main><section><h1>CS628 Social Media</h1><p>MERN stack application</p><p>{status}</p></section></main>;
}
