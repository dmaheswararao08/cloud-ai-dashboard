import { Key, useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import axios from "axios";
import { baseAPIUrl } from "../config";

// ✅ Connect to Socket.IO server
const socket = io(baseAPIUrl, {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

// ✅ Log Interface
interface Log {
  timestamp: string;
  message: string;
}

interface DashboardProps {
  showLogs: Log[];
}

const Dashboard = ({ showLogs=[] }: DashboardProps) => {
  console.log(showLogs,'showLogs')
  // ✅ Service Interface
  interface Service {
    name: string;
    podCount: number;
    status: "RUNNING" | "Stopped";
  }

  // ✅ States
  const [services, setServices] = useState<Service[]>([]);
  // const [logs, setLogs] = useState<Log[]>([]);

  // ✅ Fetch initial data from API
  useEffect(() => {
    console.log(
      "📡 Connecting to Socket.IO...",
      fetch(baseAPIUrl+"/api/servers"),
    );
    console.log(
      "📡 Connecting to Socket.IO...",
      fetch(baseAPIUrl+"/api/logs/sample"),
    );

    // ✅ Listen for real-time updates
    socket.on("updateServers", (data) => {
      console.log("🔄 Received Server Update:", data);
      setServices(data);
    });

    // socket.on("serviceLogs", ({ logs }) => {
    //   console.log("📜 Received Logs Update:", logs);
    //   setLogs((prevLogs) => [...prevLogs, ...logs]);
    // });

    return () => {
      socket.off("updateServers");
      socket.off("serviceLogs");
    };
  }, []);

  // ✅ Start Service
  const handleStartService = async (serviceName: string) => {
    try {
      await axios.post(
        `${baseAPIUrl}/api/servers/${serviceName}/start`,
      );
      setServices((prev) =>
        prev.map((service) =>
          service.name === serviceName
            ? { ...service, status: "RUNNING" }
            : service,
        ),
      );
    } catch (error) {
      console.error("Error starting service:", error);
    }
  };

  // ✅ Stop Service
  const handleStopService = async (serviceName: string) => {
    try {
      await axios.post(`${baseAPIUrl}/api/servers/${serviceName}/stop`);
      setServices((prev) =>
        prev.map((service) =>
          service.name === serviceName
            ? { ...service, status: "Stopped" }
            : service,
        ),
      );
    } catch (error) {
      console.error("Error stopping service:", error);
    }
  };

  // ✅ Scale Up Service
  const handleScaleUp = async () => {
    try {
      await axios.post(`${baseAPIUrl}/api/servers/scale/up`);
      setServices((prev) =>
        prev.map((service) => ({ ...service, podCount: service.podCount + 1 })),
      );
    } catch (error) {
      console.error("Error scaling up:", error);
    }
  };

  // ✅ Scale Down Service
  const handleScaleDown = async (serviceName: string) => {
    try {
      await axios.post(
        `${baseAPIUrl}/api/servers/${serviceName}/scale/down`,
      );
      setServices((prev) =>
        prev.map((service) =>
          service.name === serviceName
            ? { ...service, podCount: Math.max(0, service.podCount - 1) }
            : service,
        ),
      );
    } catch (error) {
      console.error("Error scaling down:", error);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* 🔹 Running Services Table */}
      <Typography variant="h5" gutterBottom>
        Running Services
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Service Name</b>
              </TableCell>
              <TableCell>
                <b>Pod Count</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={index}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.podCount}</TableCell>
                <TableCell
                  sx={{
                    color: service.status === "RUNNING" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {service.status}
                </TableCell>
                <TableCell>
                  {/* Start Button */}
                  {service.status === "Stopped" && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleStartService(service.name)}
                      sx={{ marginRight: "10px" }}
                    >
                      Start
                    </Button>
                  )}

                  {/* Stop Button */}
                  {service.status === "RUNNING" && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleStopService(service.name)}
                      sx={{ marginRight: "10px" }}
                    >
                      Stop
                    </Button>
                  )}

                  {/* Scale Up Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleScaleUp}
                    sx={{ marginRight: "5px" }}
                  >
                    Scale Up
                  </Button>

                  {/* Scale Down Button */}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleScaleDown(service.name)}
                  >
                    Scale Down
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🔹 Logs Section */}
      {showLogs.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Service Logs
          </Typography>
          <Paper
            sx={{
              maxHeight: "250px",
              overflowY: "auto",
              padding: "10px",
              border: "1px solid gray",
            }}
          >
            <List>
              {showLogs.map(
                (
                  log: { timestamp: any; message: any },
                  index: Key | null | undefined,
                ) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={`${log.timestamp}: ${log.message}`}
                    />
                  </ListItem>
                ),
              )}
            </List>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
