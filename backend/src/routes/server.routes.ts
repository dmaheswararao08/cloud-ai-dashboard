import { Router } from "express";
import {
  getRunningServers,
  startVMController,
  stopVMController,
  scaleUpController,
  scaleDownController,
  getServicePods,
} from "../controllers/server.controller";

const router = Router();

router.get("/", getRunningServers);
router.post("/:serviceName/start", startVMController);
router.post("/:serviceName/stop", stopVMController);
router.post("/scale/up", scaleUpController);
router.post("/:serviceName/scale/down", scaleDownController);
router.get("/pods/:serviceName", getServicePods);

export default router;
