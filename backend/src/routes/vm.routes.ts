import express from "express";
import { stopVM } from "../controllers/vm.controller";
const router = express.Router();

router.post("/stop", stopVM);

export default router;
