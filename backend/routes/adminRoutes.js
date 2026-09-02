import express from "express";

import {
    loginAdmin,
    getDashboard,
    getAllFeedback,
    getFeedbackDetails,
    deleteFeedback,
    getAnalytics
} from "../controllers/adminController.js";

import verifyToken from "../middleware/verifyToken.js";
import {
    getProfile,
    updateProfile,
    changePassword
} from "../controllers/adminController.js";


const router = express.Router();

// ====================
// Public
// ====================

router.post("/login", loginAdmin);

// ====================
// Protected Routes
// ====================

router.get("/dashboard", verifyToken, getDashboard);

router.get("/feedback", verifyToken, getAllFeedback);

router.get("/feedback/:id", verifyToken, getFeedbackDetails);

router.delete("/feedback/:id", verifyToken, deleteFeedback);

router.get("/analytics", verifyToken, getAnalytics);

router.get(
    "/profile",
    verifyToken,
    getProfile
);

router.put(
    "/profile",
    verifyToken,
    updateProfile
);

router.put(
    "/change-password",
    verifyToken,
    changePassword
);


export default router;