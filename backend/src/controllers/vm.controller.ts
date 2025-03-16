import { Request, Response, NextFunction } from "express";
import { InstancesClient } from "@google-cloud/compute";

const instancesClient = new InstancesClient(); // ✅ Use InstancesClient

export const stopVM = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { projectId, zone, vmName } = req.body;

    if (!projectId || !zone || !vmName) {
      res.status(400).json({ error: "projectId, zone, and vmName are required" });
    }

    console.log(`Stopping VM: ${vmName} in zone: ${zone}`);

    const [operation] = await instancesClient.stop({
      instance: vmName,
      project: projectId,
      zone: zone,
    });

    res.json({ message: `Stopping VM: ${vmName}`, operation: operation.latestResponse });
  } catch (error) {
    console.error("Error stopping VM:", error);
    next(error); // ✅ Proper error handling
  }
};
