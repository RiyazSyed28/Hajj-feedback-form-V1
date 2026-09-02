import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
    FaMicrophone,
    FaStop,
    FaTrash,
    FaPlay,
    FaRedo,
} from "react-icons/fa";

const MAX_RECORDING_TIME = 60;

export default function RemarksQuestion({
    name,
    label = "Remarks",
    maxWords = 25,
    required = false,
}) {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const value = watch(name) || "";

    const coverNumber = watch("coverNumber") || "";
    const travelAgency = watch("travelAgency") || "";

    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioUrl, setAudioUrl] = useState("");
    const [audioBlob, setAudioBlob] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }

            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [audioUrl]);

    const wordCount = value
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    /*
     * START RECORDING
     */
    const startRecording = async () => {
        try {
            if (!navigator.mediaDevices?.getUserMedia) {
                alert(
                    "Audio recording is not supported in this browser."
                );
                return;
            }

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

            let mimeType = "audio/webm";

            if (
                MediaRecorder.isTypeSupported(
                    "audio/webm;codecs=opus"
                )
            ) {
                mimeType = "audio/webm;codecs=opus";
            } else if (
                MediaRecorder.isTypeSupported("audio/webm")
            ) {
                mimeType = "audio/webm";
            } else if (
                MediaRecorder.isTypeSupported("audio/mp4")
            ) {
                mimeType = "audio/mp4";
            }

            const mediaRecorder =
                new MediaRecorder(stream, {
                    mimeType,
                });

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(
                        event.data
                    );
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(
                    audioChunksRef.current,
                    {
                        type: mimeType,
                    }
                );

                stream
                    .getTracks()
                    .forEach((track) => track.stop());

                /*
                 * Store recording locally.
                 *
                 * IMPORTANT:
                 * We DO NOT upload here.
                 */
                setAudioBlob(blob);

                /*
                 * Store Blob inside React Hook Form.
                 * Feedback.jsx will upload this Blob
                 * only when the complete form is submitted.
                 */
                setValue(
                    `${name}Recording`,
                    blob,
                    {
                        shouldDirty: true,
                    }
                );

                const url =
                    URL.createObjectURL(blob);

                setAudioUrl(url);
            };

            mediaRecorder.start();

            setIsRecording(true);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => {
                    if (
                        prev >=
                        MAX_RECORDING_TIME - 1
                    ) {
                        stopRecording();
                        return MAX_RECORDING_TIME;
                    }

                    return prev + 1;
                });
            }, 1000);
        } catch (error) {
            console.error(
                "Microphone access error:",
                error
            );

            alert(
                "Unable to access microphone. Please allow microphone permission."
            );
        }
    };

    /*
     * STOP RECORDING
     */
    const stopRecording = () => {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state !==
                "inactive"
        ) {
            mediaRecorderRef.current.stop();
        }

        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        setIsRecording(false);
    };

    /*
     * DELETE RECORDING
     */
    const deleteRecording = () => {
        if (
            isPlaying &&
            audioRef.current
        ) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        setIsPlaying(false);
        setAudioBlob(null);

        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }

        setAudioUrl("");

        /*
         * Remove pending recording from
         * React Hook Form.
         */
        setValue(
            `${name}Recording`,
            null,
            {
                shouldDirty: true,
            }
        );
    };

    /*
     * PLAY / PAUSE
     */
    const togglePlayback = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    /*
     * RE-RECORD
     */
    const reRecord = () => {
        deleteRecording();

        setTimeout(() => {
            startRecording();
        }, 100);
    };

    /*
     * TIMER FORMAT
     */
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");

        const secs = (seconds % 60)
            .toString()
            .padStart(2, "0");

        return `${mins}:${secs}`;
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6">

            {/* Label */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <label
                    htmlFor={name}
                    className="text-sm sm:text-base font-semibold text-gray-800"
                >
                    {label}

                    {required && (
                        <span className="text-red-500 ml-1">
                            *
                        </span>
                    )}
                </label>

                <span
                    className={`text-xs font-medium ${
                        wordCount > maxWords
                            ? "text-red-500"
                            : "text-gray-500"
                    }`}
                >
                    {wordCount}/{maxWords} words
                </span>
            </div>

            {/* Textarea */}
            <textarea
                id={name}
                rows={4}
                placeholder="Enter your remarks..."
                {...register(name, {
                    required: required
                        ? "This field is required"
                        : false,

                    validate: (value) => {
                        const count = value
                            .trim()
                            .split(/\s+/)
                            .filter(Boolean)
                            .length;

                        if (count > maxWords) {
                            return `Maximum ${maxWords} words allowed`;
                        }

                        return true;
                    },
                })}
                className={`w-full rounded-xl border px-4 py-3 text-sm sm:text-base text-gray-700 outline-none resize-none transition ${
                    errors?.[name]
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                }`}
            />

            {errors?.[name] && (
                <p className="text-xs text-red-500 mt-2">
                    {errors[name]?.message}
                </p>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200" />

                <span className="text-xs text-gray-400">
                    OR
                </span>

                <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Voice recording */}
            <div className="mb-3">
                <p className="text-sm font-semibold text-gray-700">
                    Voice Remarks
                </p>

                <p className="text-xs text-gray-500 mt-1">
                    Record your remarks for up to{" "}
                    {MAX_RECORDING_TIME} seconds.
                </p>
            </div>

            {/* Record button */}
            {!audioUrl && !isRecording && (
                <button
                    type="button"
                    onClick={startRecording}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition"
                >
                    <FaMicrophone />

                    Record Voice
                </button>
            )}

            {/* Recording */}
            {isRecording && (
                <div className="border border-red-200 bg-red-50 rounded-xl p-4">

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

                            <span className="text-sm font-medium text-red-700">
                                Recording...
                            </span>
                        </div>

                        <span className="text-sm font-semibold text-red-700">
                            {formatTime(recordingTime)} /{" "}
                            {formatTime(
                                MAX_RECORDING_TIME
                            )}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={stopRecording}
                        className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition"
                    >
                        <FaStop />

                        Stop Recording
                    </button>
                </div>
            )}

            {/* Recorded audio */}
            {audioUrl && (
                <div className="border border-gray-200 rounded-xl p-4">

                    <audio
                        ref={audioRef}
                        src={audioUrl}
                        onEnded={handleAudioEnded}
                        className="hidden"
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                        {/* Play */}
                        <button
                            type="button"
                            onClick={togglePlayback}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium transition"
                        >
                            <FaPlay />

                            {isPlaying
                                ? "Playing"
                                : "Play Recording"}
                        </button>

                        {/* Re-record */}
                        <button
                            type="button"
                            onClick={reRecord}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium transition"
                        >
                            <FaRedo />

                            Re-record
                        </button>

                        {/* Delete */}
                        <button
                            type="button"
                            onClick={deleteRecording}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 text-sm font-medium transition"
                        >
                            <FaTrash />

                            Delete
                        </button>
                    </div>

                    {/* Pending message */}
                    <div className="mt-4 text-xs text-gray-500">
                        Recording will be saved when you
                        submit the complete form.
                    </div>
                </div>
            )}

            {/* Identifier warning */}
            {!coverNumber.trim() &&
                !travelAgency.trim() && (
                    <p className="text-xs text-amber-600 mt-3">
                        Enter your Cover Number or Travel
                        Agency before recording voice
                        remarks.
                    </p>
                )}
        </div>
    );
}