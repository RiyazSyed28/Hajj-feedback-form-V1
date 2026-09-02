import express from "express";

import {
    exportExcel,
    exportPDF
} from "../controllers/exportController.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/excel", verifyToken, exportExcel);

router.get("/pdf", verifyToken, exportPDF);

export default router;