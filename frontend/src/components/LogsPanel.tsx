import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper } from "@mui/material";
import { io } from "socket.io-client";
import { baseAPIUrl } from "../config";

interface LogEntry {
  timestamp: string;
  message: string;
}

interface LogsPanelProps {
  serviceName: string | null; // Name of the selected service
}

const socket = io(baseAPIUrl); // Connect to WebSocket server

const LogsPanel: React.FC<LogsPanelProps> = ({ serviceName }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    if (!serviceName) return;

    // Fetch logs when service is selected
    axios.get<LogEntry[]>(`${baseAPIUrl}/api/logs?service=${serviceName}`)
      .then(response => setLogs(response.data))
      .catch(error => console.error("Error fetching logs:", error));

    // Listen for real-time logs
    socket.on(`logs-update-${serviceName}`, (newLog: LogEntry) => {
      setLogs(prevLogs => [...prevLogs, newLog]); // Append new log
    });

    return () => {
      socket.off(`logs-update-${serviceName}`);
    };
  }, [serviceName]);

  return (
    <Box sx={{ position: "fixed", right: 0, bottom: 0, width: "30%", height: "30%", overflowY: "auto" }}>
      <Paper sx={{ padding: 2, backgroundColor: "#333", color: "white" }}>
        <Typography variant="h6">Logs for {serviceName || "Service"}</Typography>
        <Box sx={{ maxHeight: "200px", overflowY: "scroll" }}>
          {logs.map((log, index) => (
            <Typography key={index} sx={{ fontSize: "12px" }}>
              [{log.timestamp}] {log.message}
            </Typography>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default LogsPanel;
