import { Response, NextFunction } from "express";
import { CustomRequest } from "../types"; // ✅ Import the correct type

export const getRunningServers = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const servers = [
      { name: "Server-1", status: "Running", podCount: 5 },
      { name: "Server-2", status: "Stopped", podCount: 2 },
    ];

    console.log("Sending server update to clients...");
    req.io?.emit("updateServers", servers); // ✅ Optional chaining to prevent errors

    return res.status(200).json(servers);
  } catch (error) {
    console.error("Error fetching servers:", error);
    next(error);
  }
};
