import { useLocation } from "react-router-dom";

export default function ResultsPage() {
  const location = useLocation();
  const payload = location.state?.payload;

  return (
    <div>
      <h1>Results Page</h1>
      <pre>{JSON.stringify(payload, null, 2)}</pre>
    </div>
  );
}
