import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

interface Service {
  name: string;
  podCount: number;
  status: string;
}

const Dashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    axios.get<Service[]>("http://localhost:5000/api/running-vms")
      .then(response => setServices(response.data))
      .catch(error => console.error("Error fetching services:", error));
  }, []);

  return (
    <div>
      <h2>Running Services</h2>
      {services.map((service, index) => (
        <Card key={index} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6">{service.name}</Typography>
            <Typography>Pods: {service.podCount}</Typography>
            <Typography>Status: {service.status}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
