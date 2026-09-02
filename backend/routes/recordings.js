import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

/*
 * Main recordings directory
 *
 * public/
 *   recordings/
 */
const recordingsDir = path.join(
    process.cwd(),
    "public",
    "recordings"
);

if (!fs.existsSync(recordingsDir)) {
    fs.mkdirSync(recordingsDir, {
        recursive: true,
    });
}

/*
 * Make Cover Number / Travel Agency safe
 * to use as a folder name.
 *
 * Example:
 *
 * "ABC/123"      -> "ABC_123"
 * "Agency Name"  -> "Agency_Name"
 */
const sanitizeFolderName = (value) => {
    return String(value || "")
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .replace(/_+/g, "_");
};

/*
 * IMPORTANT
 *
 * We first save the recording into a temporary
 * folder.
 *
 * We DO NOT use req.body inside multer's
 * destination() because multipart form fields
 * may not have been processed yet when Multer
 * calls destination().
 */
const temporaryDir = path.join(
    recordingsDir,
    "_temp"
);

if (!fs.existsSync(temporaryDir)) {
    fs.mkdirSync(temporaryDir, {
        recursive: true,
    });
}

/*
 * Multer storage
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, temporaryDir);
    },

    filename: (req, file, cb) => {
        let extension = "webm";

        if (file.mimetype === "audio/mp4") {
            extension = "mp4";
        } else if (
            file.mimetype === "audio/mpeg"
        ) {
            extension = "mp3";
        } else if (
            file.mimetype === "audio/ogg"
        ) {
            extension = "ogg";
        }

        const filename =
            `remarks-${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}.${extension}`;

        cb(null, filename);
    },
});

/*
 * Multer configuration
 */
const upload = multer({
    storage,

    limits: {
        fileSize: 10 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "audio/webm",
            "audio/mp4",
            "audio/mpeg",
            "audio/ogg",
        ];

        if (
            allowedTypes.includes(
                file.mimetype
            )
        ) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    `Unsupported audio format: ${file.mimetype}`
                ),
                false
            );
        }
    },
});

/*
 * POST
 * /api/recordings/upload
 */
router.post(
    "/upload",
    upload.single("audio"),
    (req, res) => {
        try {
            /*
             * Make sure a file was uploaded
             */
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message:
                        "No audio file received.",
                });
            }

            /*
             * Get Cover Number
             */
            const coverNumber =
                String(
                    req.body.coverNumber || ""
                ).trim();

            /*
             * Get Travel Agency
             */
            const travelAgency =
                String(
                    req.body.travelAgency || ""
                ).trim();

            /*
             * Cover Number takes priority.
             *
             * If Cover Number is empty,
             * Travel Agency is used.
             */
            const originalFolderName =
                coverNumber ||
                travelAgency;

            /*
             * No identifier
             */
            if (!originalFolderName) {
                if (
                    req.file.path &&
                    fs.existsSync(
                        req.file.path
                    )
                ) {
                    fs.unlinkSync(
                        req.file.path
                    );
                }

                return res.status(400).json({
                    success: false,
                    message:
                        "Cover Number or Travel Agency is required.",
                });
            }

            /*
             * Make folder name safe
             */
            const folderName =
                sanitizeFolderName(
                    originalFolderName
                );

            /*
             * User's recording folder
             *
             * Example:
             *
             * public/recordings/ABC123/
             *
             * OR
             *
             * public/recordings/Al_Huda_Tours/
             */
            const userRecordingDir =
                path.join(
                    recordingsDir,
                    folderName
                );

            /*
             * Create folder if it doesn't exist
             */
            if (
                !fs.existsSync(
                    userRecordingDir
                )
            ) {
                fs.mkdirSync(
                    userRecordingDir,
                    {
                        recursive: true,
                    }
                );
            }

            /*
             * Final file location
             */
            const finalPath =
                path.join(
                    userRecordingDir,
                    req.file.filename
                );

            /*
             * Move temporary recording
             * into user's folder
             */
            fs.renameSync(
                req.file.path,
                finalPath
            );

            /*
             * URL used by frontend/backend
             */
            const filePath =
                `/recordings/${folderName}/${req.file.filename}`;

            /*
             * Console information
             */
            console.log(
                "================================="
            );

            console.log(
                "Audio saved successfully"
            );

            console.log(
                "Cover Number:",
                coverNumber || "N/A"
            );

            console.log(
                "Travel Agency:",
                travelAgency || "N/A"
            );

            console.log(
                "Folder:",
                folderName
            );

            console.log(
                "Field:",
                req.body.fieldName || "N/A"
            );

            console.log(
                "File:",
                req.file.filename
            );

            console.log(
                "Path:",
                filePath
            );

            console.log(
                "================================="
            );

            /*
             * Send response
             */
            return res.status(200).json({
                success: true,

                message:
                    "Recording uploaded successfully.",

                folderName,

                coverNumber,

                travelAgency,

                fieldName:
                    req.body.fieldName || "",

                filename:
                    req.file.filename,

                filePath,
            });
        } catch (error) {
            console.error(
                "Recording upload error:",
                error
            );

            /*
             * Delete temporary file if
             * something went wrong
             */
            if (
                req.file?.path &&
                fs.existsSync(
                    req.file.path
                )
            ) {
                try {
                    fs.unlinkSync(
                        req.file.path
                    );
                } catch (cleanupError) {
                    console.error(
                        "Temporary file cleanup error:",
                        cleanupError
                    );
                }
            }

            return res.status(500).json({
                success: false,

                message:
                    error.message ||
                    "Failed to upload recording.",
            });
        }
    }
);

/*
 * Handle Multer errors
 */
router.use(
    (
        error,
        req,
        res,
        next
    ) => {
        if (
            error instanceof
            multer.MulterError
        ) {
            console.error(
                "Multer error:",
                error
            );

            return res.status(400).json({
                success: false,
                message:
                    error.message ||
                    "File upload error.",
            });
        }

        if (error) {
            console.error(
                "Recording middleware error:",
                error
            );

            return res.status(400).json({
                success: false,
                message:
                    error.message ||
                    "Recording upload failed.",
            });
        }

        next();
    }
);

export default router;