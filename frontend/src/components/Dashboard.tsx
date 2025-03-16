import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Dashboard = () => {
  interface Service {
    name: string;
    podCount: number;
    status: string;
  }

  const [services, setServices] = useState<Service[]>([]);
  interface Log {
    timestamp: string;
    message: string;
  }

  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server:", socket.id);
    });

    socket.on("updateServers", (data) => {
      console.log("Received real-time server update:", data);
      setServices(data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected. Attempting to reconnect...");
    });

    return () => {
      socket.off("updateServers");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div>
      <h2>Running Services</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Pod Count</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.name}</td>
              <td>{service.podCount}</td>
              <td>{service.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Logs</h2>
      <div
        style={{
          maxHeight: "200px",
          overflowY: "scroll",
          border: "1px solid gray",
          padding: "10px",
        }}
      >
        {logs.map((log, index) => (
          <p key={index}>
            {log.timestamp}: {log.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
