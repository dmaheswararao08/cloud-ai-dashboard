import { Router } from "express";
import {
  getRunningServers,
  startVMController,
  stopVMController,
  scaleUpController,
  scaleDownController,
} from "../controllers/server.controller";

const router = Router();

router.get("/", getRunningServers);
router.post("/:serviceName/start", startVMController);
router.post("/:serviceName/stop", stopVMController);
router.post("/scale/up", scaleUpController);
router.post("/:serviceName/scale/down", scaleDownController);

export default router;
