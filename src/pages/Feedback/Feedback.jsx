import api from "../../api/api";

import toast from "react-hot-toast";

import { useState, useEffect } from "react";

import { useForm, FormProvider } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import ProgressBar from "../../components/feedback/ProgressBar";

import NavigationButtons from "../../components/feedback/NavigationButtons";

import FeedbackHeader from "../../components/feedback/FeedbackHeader";

import SubmitModal from "../../components/feedback/SubmitModal";

import PersonalInfo from "../../components/feedback/steps/PersonalInfo";

import Departure from "../../components/feedback/steps/Departure";

import Mina from "../../components/feedback/steps/Mina";

import Arafat from "../../components/feedback/steps/Arafat";

import DhulHijjah from "../../components/feedback/steps/DhulHijja";

import Madinah from "../../components/feedback/steps/Madinah";

import ReturnJourney from "../../components/feedback/steps/ReturnJourney";

import Health from "../../components/feedback/steps/Health";

import GeneralFeedback from "../../components/feedback/steps/GeneralFeedback";

import {
    LanguageProvider,
    useLanguage,
} from "../../context/LanguageContext";

import {
    feedbackTranslations,
} from "../../translations/feedback";


function FeedbackContent() {
    const navigate = useNavigate();

    const {
        language,
        setLanguage,
        isUrdu,
    } = useLanguage();

    const t =
        feedbackTranslations[language];

    const [showModal, setShowModal] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const totalSteps = 9;

    const [step, setStep] = useState(1);

    const [completedSteps, setCompletedSteps] =
        useState([1]);


    /*
     * --------------------------------------------------
     * Load saved form data
     * --------------------------------------------------
     */

    const savedData = (() => {
        try {
            return (
                JSON.parse(
                    localStorage.getItem(
                        "hajj-feedback"
                    )
                ) || {}
            );
        } catch {
            return {};
        }
    })();


    /*
     * --------------------------------------------------
     * React Hook Form
     * --------------------------------------------------
     */

    const methods = useForm({
        mode: "onTouched",

        defaultValues: {
            ...savedData,

            language:
                savedData.language ||
                "English",
        },

        shouldFocusError: true,
    });


    const {
        watch,
        trigger,
        handleSubmit,
        setValue,
    } = methods;


    const formValues = watch();


    /*
     * --------------------------------------------------
     * Keep React Hook Form language in sync
     * --------------------------------------------------
     */

    useEffect(() => {
        setValue(
            "language",
            language === "ur"
                ? "Urdu"
                : "English",
            {
                shouldDirty: false,
                shouldValidate: false,
            }
        );
    }, [
        language,
        setValue,
    ]);


    /*
     * --------------------------------------------------
     * Save normal form data locally
     *
     * IMPORTANT:
     * Blob recordings are NOT saved to localStorage.
     * --------------------------------------------------
     */

    useEffect(() => {
        try {
            const dataToSave = {
                ...formValues,
            };

            /*
             * Remove recording Blobs before
             * saving to localStorage.
             *
             * Blob cannot be reliably stored
             * using JSON.stringify().
             */

            Object.keys(dataToSave)
                .filter((key) =>
                    key.endsWith(
                        "Recording"
                    )
                )
                .forEach((key) => {
                    delete dataToSave[key];
                });

            localStorage.setItem(
                "hajj-feedback",
                JSON.stringify(
                    dataToSave
                )
            );
        } catch (error) {
            console.error(
                "Local storage error:",
                error
            );
        }
    }, [formValues]);


    /*
     * --------------------------------------------------
     * Validation
     * --------------------------------------------------
     */

    const stepValidation = {
        1: [
            "fullName",
            "identifierType",
            "education",
            "gender",
        ],
    };


    /*
     * --------------------------------------------------
     * Upload ONE recording
     *
     * This function is ONLY called after the
     * feedback form has successfully been submitted.
     * --------------------------------------------------
     */

    const uploadRecording = async ({
        blob,
        fieldName,
        coverNumber,
        travelAgency,
    }) => {
        const formData =
            new FormData();


        /*
         * Determine file extension
         */

        const extension =
            blob.type ===
            "audio/mp4"
                ? "mp4"
                : "webm";


        /*
         * Add audio
         */

        formData.append(
            "audio",
            blob,
            `remarks-${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}.${extension}`
        );


        /*
         * Add Cover Number
         */

        formData.append(
            "coverNumber",
            coverNumber
        );


        /*
         * Add Travel Agency
         */

        formData.append(
            "travelAgency",
            travelAgency
        );


        /*
         * Add original remarks field name
         */

        formData.append(
            "fieldName",
            fieldName
        );


        /*
         * Send recording to backend
         */

        const response =
            await fetch(
                "http://localhost:5000/api/recordings/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );


        const result =
            await response.json();


        if (!response.ok) {
            throw new Error(
                result.message ||
                    "Recording upload failed."
            );
        }


        return result;
    };


    /*
     * --------------------------------------------------
     * Upload ALL pending recordings
     * --------------------------------------------------
     */

    const uploadAllRecordings = async (
        data
    ) => {
        const coverNumber =
            String(
                data.coverNumber ||
                    ""
            ).trim();


        const travelAgency =
            String(
                data.travelAgency ||
                    ""
            ).trim();


        /*
         * Find every Blob recording.
         *
         * Example:
         *
         * minaRemarksRecording
         * arafatRemarksRecording
         * healthRemarksRecording
         */

        const recordingFields =
            Object.keys(data).filter(
                (key) =>
                    key.endsWith(
                        "Recording"
                    ) &&
                    data[key] instanceof
                        Blob
            );


        console.log(
            "Recordings waiting for upload:",
            recordingFields
        );


        const uploadedRecordings = {};


        /*
         * Upload recordings one by one
         */

        for (
            const recordingKey of
                recordingFields
        ) {
            const blob =
                data[recordingKey];


            /*
             * Remove "Recording"
             *
             * minaRemarksRecording
             *
             * becomes:
             *
             * minaRemarks
             */

            const fieldName =
                recordingKey.replace(
                    /Recording$/,
                    ""
                );


            console.log(
                "Uploading:",
                fieldName
            );


            const result =
                await uploadRecording({
                    blob,
                    fieldName,
                    coverNumber,
                    travelAgency,
                });


            uploadedRecordings[
                fieldName
            ] = result;


            console.log(
                "Recording uploaded:",
                result
            );
        }


        return uploadedRecordings;
    };


    /*
     * --------------------------------------------------
     * Submit
     * --------------------------------------------------
     */

    const submit = async (data) => {
        try {
            setLoading(true);


            /*
             * ------------------------------------------
             * 1. Submit the normal feedback first
             * ------------------------------------------
             *
             * IMPORTANT:
             *
             * We do NOT upload recordings before this.
             */

            const cleanData = {
                ...data,
            };


            /*
             * Remove Blob recording fields from
             * the normal feedback API request.
             *
             * The recordings are handled separately.
             */

            Object.keys(cleanData)
                .filter((key) =>
                    key.endsWith(
                        "Recording"
                    )
                )
                .forEach((key) => {
                    delete cleanData[key];
                });


            console.log(
                "Submitting feedback:",
                cleanData
            );


            const response =
                await api.post(
                    "/feedback",
                    cleanData
                );


            /*
             * ------------------------------------------
             * 2. Check feedback submission
             * ------------------------------------------
             */

            if (
                !response.data.success
            ) {
                throw new Error(
                    response.data.message ||
                        t.submissionFailed
                );
            }


            /*
             * ------------------------------------------
             * 3. Feedback successfully saved
             *
             * NOW upload recordings.
             * ------------------------------------------
             */

            const recordingFields =
                Object.keys(data).filter(
                    (key) =>
                        key.endsWith(
                            "Recording"
                        ) &&
                        data[key] instanceof
                            Blob
                );


            if (
                recordingFields.length >
                0
            ) {
                toast.loading(
                    "Saving voice recordings...",
                    {
                        id: "recordings-upload",
                    }
                );


                await uploadAllRecordings(
                    data
                );


                toast.success(
                    "Voice recordings saved successfully.",
                    {
                        id: "recordings-upload",
                    }
                );
            }


            /*
             * ------------------------------------------
             * 4. Everything succeeded
             * ------------------------------------------
             */

            localStorage.removeItem(
                "hajj-feedback"
            );


            toast.success(
                t.feedbackSubmitted
            );


            navigate("/success");
        } catch (error) {
            console.error(
                "Submission error:",
                error
            );


            toast.dismiss(
                "recordings-upload"
            );


            toast.error(
                error.response
                    ?.data
                    ?.message ||
                    error.message ||
                    t.submissionFailed
            );
        } finally {
            setLoading(false);
        }
    };


    /*
     * --------------------------------------------------
     * Change Language
     * --------------------------------------------------
     */

    const changeLanguage = (
        value
    ) => {
        const newLanguage =
            value === "Urdu"
                ? "ur"
                : "en";


        setLanguage(
            newLanguage
        );


        setValue(
            "language",
            value,
            {
                shouldDirty: false,
                shouldValidate: false,
            }
        );
    };


    return (
        <div
            dir={
                isUrdu
                    ? "rtl"
                    : "ltr"
            }
            lang={
                isUrdu
                    ? "ur"
                    : "en"
            }
            className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-20"
        >
            <div className="max-w-6xl mx-auto px-6">

                <FeedbackHeader />

                <ProgressBar
                    step={step}
                    completedSteps={
                        completedSteps
                    }
                    totalSteps={
                        totalSteps
                    }
                    onStepClick={async (
                        clickedStep
                    ) => {
                        if (
                            clickedStep ===
                            step
                        ) {
                            return;
                        }


                        if (
                            completedSteps.includes(
                                clickedStep
                            )
                        ) {
                            setStep(
                                clickedStep
                            );


                            window.scrollTo(
                                {
                                    top: 0,
                                    behavior:
                                        "smooth",
                                }
                            );


                            return;
                        }


                        for (
                            let i = 1;
                            i <
                            clickedStep;
                            i++
                        ) {
                            const valid =
                                await trigger(
                                    stepValidation[
                                        i
                                    ] || []
                                );


                            if (!valid) {
                                setStep(i);


                                window.scrollTo(
                                    {
                                        top: 0,
                                        behavior:
                                            "smooth",
                                    }
                                );


                                return;
                            }
                        }


                        setCompletedSteps(
                            (prev) => {
                                const arr =
                                    [
                                        ...prev,
                                    ];


                                for (
                                    let i = 1;
                                    i <=
                                    clickedStep;
                                    i++
                                ) {
                                    if (
                                        !arr.includes(
                                            i
                                        )
                                    ) {
                                        arr.push(
                                            i
                                        );
                                    }
                                }


                                return arr;
                            }
                        );


                        setStep(
                            clickedStep
                        );
                    }}
                />

                <FormProvider
                    {...methods}
                >
                    <form
                        onSubmit={handleSubmit(
                            submit
                        )}
                        className="space-y-8"
                    >

                        <SubmitModal
                            open={
                                showModal
                            }
                            loading={
                                loading
                            }
                            onCancel={() =>
                                setShowModal(
                                    false
                                )
                            }
                            onConfirm={() => {
                                setShowModal(
                                    false
                                );


                                handleSubmit(
                                    submit
                                )();
                            }}
                        />


                        {/* LANGUAGE SELECTOR */}

                        <div className="bg-white rounded-2xl shadow-lg p-6">

                            <label className="block font-semibold mb-2 text-gray-800">
                                {
                                    t.selectLanguage
                                }
                            </label>


                            <select
                                disabled
                                value={
                                    language ===
                                    "ur"
                                        ? "Urdu"
                                        : "English"
                                }
                                onChange={(
                                    e
                                ) =>
                                    changeLanguage(
                                        e
                                            .target
                                            .value
                                    )
                                }
                                className="w-30 rounded-xl px-4 py-3 border border-gray-300 bg-white text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600"
                            >
                                <option value="English">
                                    English
                                </option>

                                <option value="Urdu">
                                    اردو
                                </option>
                            </select>

                        </div>


                        {/* STEP 1 */}

                        {step === 1 && (
                            <PersonalInfo />
                        )}


                        {/* STEP 2 */}

                        {step === 2 && (
                            <Departure />
                        )}


                        {/* STEP 3 */}

                        {step === 3 && (
                            <Mina />
                        )}


                        {/* STEP 4 */}

                        {step === 4 && (
                            <Arafat />
                        )}


                        {/* STEP 5 */}

                        {step === 5 && (
                            <DhulHijjah />
                        )}


                        {/* STEP 6 */}

                        {step === 6 && (
                            <Madinah />
                        )}


                        {/* STEP 7 */}

                        {step === 7 && (
                            <ReturnJourney />
                        )}


                        {/* STEP 8 */}

                        {step === 8 && (
                            <Health />
                        )}


                        {/* STEP 9 */}

                        {step === 9 && (
                            <GeneralFeedback />
                        )}


                        <NavigationButtons
                            step={step}
                            totalSteps={
                                totalSteps
                            }

                            previous={() => {
                                if (
                                    step >
                                    1
                                ) {
                                    setStep(
                                        step -
                                            1
                                    );


                                    window.scrollTo(
                                        {
                                            top: 0,
                                            behavior:
                                                "smooth",
                                        }
                                    );
                                }
                            }}

                            next={async () => {
                                let fields =
                                    stepValidation[
                                        step
                                    ] || [];


                                if (
                                    step ===
                                    1
                                ) {
                                    const identifierType =
                                        watch(
                                            "identifierType"
                                        );


                                    if (
                                        identifierType ===
                                        "coverNumber"
                                    ) {
                                        fields =
                                            [
                                                "fullName",
                                                "identifierType",
                                                "coverNumber",
                                                "education",
                                                "gender",
                                            ];
                                    } else if (
                                        identifierType ===
                                        "travelAgency"
                                    ) {
                                        fields =
                                            [
                                                "fullName",
                                                "identifierType",
                                                "travelAgency",
                                                "education",
                                                "gender",
                                            ];
                                    } else {
                                        fields =
                                            [
                                                "fullName",
                                                "identifierType",
                                                "education",
                                                "gender",
                                            ];
                                    }
                                }


                                const valid =
                                    await trigger(
                                        fields,
                                        {
                                            shouldFocus:
                                                true,
                                        }
                                    );


                                if (
                                    !valid
                                ) {
                                    return;
                                }


                                if (
                                    step <
                                    totalSteps
                                ) {
                                    setCompletedSteps(
                                        (
                                            prev
                                        ) => {
                                            if (
                                                prev.includes(
                                                    step +
                                                        1
                                                )
                                            ) {
                                                return prev;
                                            }


                                            return [
                                                ...prev,
                                                step +
                                                    1,
                                            ];
                                        }
                                    );


                                    setStep(
                                        step +
                                            1
                                    );


                                    window.scrollTo(
                                        {
                                            top: 0,
                                            behavior:
                                                "smooth",
                                        }
                                    );
                                }
                            }}

                            onSubmit={() =>
                                setShowModal(
                                    true
                                )
                            }
                        />

                    </form>
                </FormProvider>

            </div>
        </div>
    );
}


export default function Feedback() {
    return (
        <LanguageProvider>
            <FeedbackContent />
        </LanguageProvider>
    );
}