import express from "express";

import { submitFeedback } from "../controllers/feedbackController.js";
import { fetchFeedback } from "../controllers/feedbackListController.js";
import { feedbackDetails } from "../controllers/feedbackDetailsController.js";

const router = express.Router();

// Submit Feedback
router.post("/", submitFeedback);

// Fetch All Feedback
router.get("/", fetchFeedback);

// Fetch Single Feedback
router.get("/:id", feedbackDetails);

export default router;