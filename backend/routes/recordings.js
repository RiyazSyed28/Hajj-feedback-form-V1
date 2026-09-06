import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Multer
|--------------------------------------------------------------------------
| Store the uploaded audio temporarily in memory.
| We DO NOT save it to Render's filesystem.
|--------------------------------------------------------------------------
*/

const storage = multer.memoryStorage();

const upload = multer({
    storage,

    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },

    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "audio/webm",
            "audio/mp4",
            "audio/mpeg",
            "audio/ogg",
        ];

        if (allowedTypes.includes(file.mimetype)) {
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
|--------------------------------------------------------------------------
| Helper: sanitize folder name
|--------------------------------------------------------------------------
*/

const sanitizeFolderName = (value) => {
    return String(value || "")
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .replace(/_+/g, "_");
};

/*
|--------------------------------------------------------------------------
| Helper: upload buffer to Cloudinary
|--------------------------------------------------------------------------
*/

const uploadToCloudinary = ({
    buffer,
    folder,
    publicId,
    mimetype,
    coverNumber,
    travelAgency,
    fieldName,
}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "video",

                folder,

                public_id: publicId,

                overwrite: false,

                context: {
                    coverNumber: coverNumber || "",
                    travelAgency: travelAgency || "",
                    fieldName: fieldName || "",
                    uploadedFrom: "Hajj Feedback Portal",
                },

                tags: [
                    "hajj-feedback",
                    "voice-recording",
                ],
            },

            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
};

/*
|--------------------------------------------------------------------------
| POST /api/recordings/upload
|--------------------------------------------------------------------------
*/

router.post(
    "/upload",
    upload.single("audio"),
    async (req, res) => {
        try {
            /*
             * Make sure audio exists
             */

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No audio file received.",
                });
            }

            /*
             * Get Cover Number
             */

            const coverNumber = String(
                req.body.coverNumber || ""
            ).trim();

            /*
             * Get Travel Agency
             */

            const travelAgency = String(
                req.body.travelAgency || ""
            ).trim();

            /*
             * Get field name
             */

            const fieldName = String(
                req.body.fieldName || ""
            ).trim();

            /*
             * Cover Number takes priority.
             * Travel Agency is fallback.
             */

            const originalFolderName =
                coverNumber || travelAgency;

            /*
             * Identifier is required
             */

            if (!originalFolderName) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Cover Number or Travel Agency is required.",
                });
            }

            /*
             * Safe folder name
             */

            const folderName =
                sanitizeFolderName(
                    originalFolderName
                );

            /*
             * Cloudinary folder
             *
             * Example:
             *
             * hajj-feedback/recordings/ABC123
             */

            const cloudinaryFolder =
                `hajj-feedback/recordings/${folderName}`;

            /*
             * Generate unique public ID
             */

            const publicId =
                `remarks-${Date.now()}-${Math.round(
                    Math.random() * 1e9
                )}`;

            /*
             * Upload to Cloudinary
             */

            console.log(
                "================================="
            );

            console.log(
                "Uploading audio to Cloudinary..."
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
                "Field:",
                fieldName || "N/A"
            );

            console.log(
                "Folder:",
                cloudinaryFolder
            );

            console.log(
                "Original MIME:",
                req.file.mimetype
            );

            console.log(
                "File Size:",
                req.file.size
            );

            console.log(
                "================================="
            );

            const result =
                await uploadToCloudinary({
                    buffer: req.file.buffer,

                    folder:
                        cloudinaryFolder,

                    publicId,

                    mimetype:
                        req.file.mimetype,

                    coverNumber,

                    travelAgency,

                    fieldName,
                });

            /*
             * Cloudinary URL
             */

            const secureUrl =
                result.secure_url;

            /*
             * Success
             */

            console.log(
                "================================="
            );

            console.log(
                "Audio uploaded successfully"
            );

            console.log(
                "Cloudinary Public ID:",
                result.public_id
            );

            console.log(
                "Cloudinary URL:",
                secureUrl
            );

            console.log(
                "================================="
            );

            return res.status(200).json({
                success: true,

                message:
                    "Recording uploaded successfully.",

                folderName,

                coverNumber,

                travelAgency,

                fieldName,

                filename:
                    result.public_id,

                filePath:
                    secureUrl,

                url:
                    secureUrl,

                cloudinaryPublicId:
                    result.public_id,

                resourceType:
                    result.resource_type,

                format:
                    result.format,

                bytes:
                    result.bytes,
            });

        } catch (error) {
            console.error(
                "================================="
            );

            console.error(
                "CLOUDINARY RECORDING UPLOAD FAILED"
            );

            console.error(
                "Message:",
                error.message
            );

            console.error(
                "Full Error:",
                error
            );

            console.error(
                "================================="
            );

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
|--------------------------------------------------------------------------
| Handle Multer errors
|--------------------------------------------------------------------------
*/

router.use(
    (error, req, res, next) => {
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