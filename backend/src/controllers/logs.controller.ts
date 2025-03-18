import { Response, NextFunction } from "express";
import { CustomRequest } from "../types";
import { Logging } from "@google-cloud/logging";

const logging = new Logging();

export const getServiceLogs = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { serviceName } = req.params;
    const projectId = "ltc-hack-prj-7"; // Replace with your actual GCP Project ID

    const logName = `projects/${projectId}/logs/kubernetes`;
    const filter = `resource.type="k8s_container" AND resource.labels.container_name="${serviceName}"`;

    const [entries] = await logging.getEntries({
      //filter,
      orderBy: "timestamp desc",
      pageSize: 10, // Fetch latest 10 logs
    });
    const logs = entries.map((entry) => ({
      timestamp: entry.metadata.timestamp,
      message: entry.data?.message || JSON.stringify(entry.data),
    }));

    // Emit logs update through Socket.IO for real-time updates
    if (req.io) {
      console.log(`🔹 Sending logs for service: ${serviceName}`);
      req.io.emit("serviceLogs", { serviceName, logs });
    }

    res.json(logs);
  } catch (error) {
    console.error("❌ Error fetching logs:", error);
    next(error); // Pass error to Express error handler
  }
};
