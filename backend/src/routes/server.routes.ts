import express from "express";
import { getRunningServers } from "../controllers/server.controller";

const router = express.Router();

router.get("/", getRunningServers); // ✅ Ensure controller is properly typed

export default router;
