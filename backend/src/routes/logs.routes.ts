import express from "express";
import { getServiceLogs } from "../controllers/logs.controller";

const router = express.Router();

router.get("/:serviceName", getServiceLogs);

export default router;
