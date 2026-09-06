import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Multer
|--------------------------------------------------------------------------
| Store audio temporarily in memory.
| The audio is uploaded directly to Cloudinary.
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
| Sanitize folder name
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
| Upload buffer to Cloudinary
|--------------------------------------------------------------------------
*/

const uploadToCloudinary = ({
    buffer,
    folder,
    publicId,
    coverNumber,
    travelAgency,
    fieldName,
}) => {
    return new Promise((resolve, reject) => {
        const uploadStream =
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "video",

                    folder,

                    public_id: publicId,

                    overwrite: false,

                    context: {
                        coverNumber:
                            coverNumber || "",

                        travelAgency:
                            travelAgency || "",

                        fieldName:
                            fieldName || "",

                        uploadedFrom:
                            "Hajj Feedback Portal",
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
                    message:
                        "No audio file received.",
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
             * Get Field Name
             */

            const fieldName = String(
                req.body.fieldName || ""
            ).trim();

            /*
             * Get Recording Folder ID
             *
             * This is generated ONCE by Feedback.jsx
             * for the entire feedback submission.
             */

            const recordingFolderId = String(
                req.body.recordingFolderId || ""
            ).trim();

            /*
             |--------------------------------------------------------------------------
             | FOLDER LOGIC
             |--------------------------------------------------------------------------
             |
             | Cover Number exists:
             |
             |   recordings/12345/
             |
             |
             | Cover Number does NOT exist:
             |
             |   recordings/al_huda_tours-ABC123/
             |
             |
             | The recordingFolderId is sent from
             | Feedback.jsx and is the SAME for
             | every recording in that submission.
             |--------------------------------------------------------------------------
             */

            let folderName;

            if (coverNumber) {
                /*
                 * Cover Number has highest priority.
                 */

                folderName =
                    sanitizeFolderName(
                        coverNumber
                    );

            } else if (
                travelAgency &&
                recordingFolderId
            ) {
                /*
                 * No Cover Number.
                 *
                 * Use Travel Agency + the
                 * submission's unique folder ID.
                 */

                const agencyName =
                    sanitizeFolderName(
                        travelAgency
                    );

                const uniqueId =
                    sanitizeFolderName(
                        recordingFolderId
                    );

                folderName =
                    `${agencyName}-${uniqueId}`;

            } else if (travelAgency) {
                /*
                 * Fallback in case old frontend
                 * doesn't send recordingFolderId.
                 *
                 * This should normally not happen
                 * after the frontend is updated.
                 */

                folderName =
                    sanitizeFolderName(
                        travelAgency
                    );

            } else {
                return res.status(400).json({
                    success: false,

                    message:
                        "Cover Number or Travel Agency is required.",
                });
            }

            /*
             * Cloudinary folder
             */

            const cloudinaryFolder =
                `hajj-feedback/recordings/${folderName}`;

            /*
             * Unique filename for THIS recording.
             *
             * Important:
             *
             * The filename is unique,
             * BUT the folder remains the SAME
             * for all recordings from this submission.
             */

            const publicId =
                `remarks-${Date.now()}-${Math.round(
                    Math.random() * 1e9
                )}`;

            /*
             * Logs
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
                "Recording Folder ID:",
                recordingFolderId || "N/A"
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

            /*
             * Upload to Cloudinary
             */

            const result =
                await uploadToCloudinary({
                    buffer:
                        req.file.buffer,

                    folder:
                        cloudinaryFolder,

                    publicId,

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
             * Success logs
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

            /*
             * Response
             */

            return res.status(200).json({
                success: true,

                message:
                    "Recording uploaded successfully.",

                folderName,

                recordingFolderId,

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