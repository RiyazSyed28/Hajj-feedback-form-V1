import express from "express";

import { analytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/", analytics);

export default router;