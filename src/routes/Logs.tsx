import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

interface LogEntry {
  timestamp: string;
  message: string;
}

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [searchParams] = useSearchParams();
  const serviceName = searchParams.get("service");

  useEffect(() => {
    if (serviceName) {
      axios.get<LogEntry[]>(`http://localhost:5000/api/logs?service=${serviceName}`)
        .then(response => setLogs(response.data))
        .catch(error => console.error("Error fetching logs:", error));
    }
  }, [serviceName]);

  return (
    <div>
      <h1>Logs for {serviceName || "Service"}</h1>
      <pre>
        {logs.map((log, index) => (
          <div key={index}>
            [{log.timestamp}] {log.message}
          </div>
        ))}
      </pre>
    </div>
  );
};

export default Logs;
