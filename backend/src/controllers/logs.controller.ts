import { Response, NextFunction } from "express";
import { CustomRequest } from "../types";

export const getServiceLogs = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { serviceName } = req.params;

    // Simulated log data
    const logs = [{ timestamp: new Date().toISOString(), message: `Log entry for ${serviceName}` }];

    // Emit logs update through Socket.IO
    if (req.io) {
      req.io.emit("serviceLogs", { serviceName, logs });
    }

    res.json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    next(error); // Pass error to Express error handler
  }
};
