import { Response, NextFunction, query } from "express";
import { CustomRequest } from "../types";
import {
  getRunningServersService,
  startVM,
  stopVM,
  scaleUpVM,
  scaleDownVM,
  getPodsByService,
} from "../services/server.service";

const PROJECT_ID = "ltc-hack-prj-7";
const ZONE = "us-central1-c"; // Example: "us-central1-a"

// ✅ Get Running Servers
export const getRunningServers = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    // const servers = [
    //   { name: "homes", status: "Running", podCount: 5 },
    //   { name: "cards", status: "Stopped", podCount: 2 },
    //   { name: "loans", status: "Stopped", podCount: 4 },
    // ];
    const servers = await getRunningServersService(PROJECT_ID, ZONE);
    console.log(servers,'test');
    req.io?.emit("updateServers", servers);
    return res.status(200).json(servers);
  } catch (error) {
    console.error("❌ Error fetching servers:", error);
    next(error);
  }
};

// ✅ Start VM
export const startVMController = async (
  req: CustomRequest,
  res: Response,
): Promise<any> => {
  const { serviceName } = req.params;
  try {
    if (!req.io) {
      return res
        .status(500)
        .json({ error: "Socket.io instance is not available" });
    }
    const response = await startVM(PROJECT_ID, ZONE, serviceName, req.io);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: "Failed to start VM" });
  }
};

// ✅ Stop VM
export const stopVMController = async (
  req: CustomRequest,
  res: Response,
): Promise<any> => {
  const { serviceName } = req.params;
  try {
    if (!req.io) {
      return res
        .status(500)
        .json({ error: "Socket.io instance is not available" });
    }
    const response = await stopVM(PROJECT_ID, ZONE, serviceName, req.io);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: "Failed to stop VM" });
  }
};

// ✅ Scale Up (Create New VM)
export const scaleUpController = async (
  req: CustomRequest,
  res: Response,
): Promise<any> => {
  const { templateInstance } = req.body;
  try {
    if (!req.io) {
      return res
        .status(500)
        .json({ error: "Socket.io instance is not available" });
    }
    const response = await scaleUpVM(
      PROJECT_ID,
      ZONE,
      templateInstance,
      req.io,
    );
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: "Failed to scale up VM" });
  }
};

// ✅ Scale Down (Delete VM)
export const scaleDownController = async (
  req: CustomRequest,
  res: Response,
): Promise<any> => {
  const { serviceName } = req.params;
  try {
    if (!req.io) {
      return res
        .status(500)
        .json({ error: "Socket.io instance is not available" });
    }
    const response = await scaleDownVM(PROJECT_ID, ZONE, serviceName, req.io);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: "Failed to scale down VM" });
  }
};

export const getServicePods = async (
  req: CustomRequest,
  res: Response,
): Promise<any> => {
  try {
    const { serviceName } = req.params;
    const pods = await getPodsByService(serviceName);
    res.json(pods);
  } catch (error) {
    console.error("Error fetching pods:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
