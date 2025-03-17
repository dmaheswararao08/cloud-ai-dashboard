import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardContent, Typography, Grid, Box, CircularProgress,
  Chip, Avatar
} from "@mui/material";
import { Cloud, CheckCircle, Cancel } from "@mui/icons-material";
import PodDialog from "../components/PodDialog";
import { baseAPIUrl } from "../config";

// Service and Pod Interfaces
interface Service {
  name: string;
  podCount: number;
  status: string;
}

interface Pod {
  podName: string;
  status: string;
  logs: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [pods, setPods] = useState<Pod[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch services
  useEffect(() => {
    axios.get<Service[]>(baseAPIUrl+"/api/servers")
      .then(response => {
        console.log("Fetched services:", response.data);
        setServices(response.data);
      })
      .catch(error => console.error("Error fetching services:", error))
      .finally(() => setLoading(false));
  }, []);

  // Open popup and fetch pods when a card is clicked
  const handleCardClick = async (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);

    try {
      const response = await axios.get<Pod[]>(`${baseAPIUrl}/api/servers/pods/${service.name}`);
      setPods(response.data);
    } catch (error) {
      console.error("Error fetching pods:", error);
    }
  };

  // Close popup
  const handleClose = () => {
    setIsDialogOpen(false);
    setPods([]);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        All Cloud Services
      </Typography>

      {/* Loader while fetching data */}
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: "12px",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)", cursor: "pointer" },
                }}
                onClick={() => handleCardClick(service)}
              >
                <CardContent>
                  {/* Service Name */}
                  <Box display="flex" alignItems="center" mb={1}>
                    <Avatar sx={{ bgcolor: "#2196f3", marginRight: 1 }}>
                      <Cloud />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {service.name}
                    </Typography>
                  </Box>

                  {/* Pod Count */}
                  <Typography variant="body1">
                    <b>Pods:</b> {service.podCount}
                  </Typography>

                  {/* Service Status */}
                  <Chip
                    label={service.status}
                    icon={service.status === "RUNNING" ? <CheckCircle /> : <Cancel />}
                    color={service.status === "RUNNING" ? "success" : "error"}
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pod Dialog Component */}
      <PodDialog
        open={isDialogOpen}
        onClose={handleClose}
        serviceName={selectedService?.name || ""}
        pods={pods}
      />
    </Box>
  );
};

export default Services;
