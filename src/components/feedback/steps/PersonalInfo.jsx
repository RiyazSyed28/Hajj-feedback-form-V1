import { useFormContext } from "react-hook-form";
import { useLanguage } from "../../../context/LanguageContext";
import { feedbackTranslations } from "../../../translations/feedback";

export default function PersonalInfo() {
    const { language, isUrdu } = useLanguage();

    const t = feedbackTranslations[language];

    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const identifierType = watch("identifierType");

    const inputClass = (field) => `
        w-full rounded-xl px-4 py-3 border transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-green-600
        ${errors[field]
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300"
        }
    `;


    // --------------------------------------------------
    // Identifier selection
    // --------------------------------------------------

    const handleIdentifierChange = (type) => {

        setValue("identifierType", type, {
            shouldValidate: true,
            shouldDirty: true,
        });

        // Clear both values when changing selection
        setValue("coverNumber", "", {
            shouldValidate: false,
            shouldDirty: true,
        });

        setValue("travelAgency", "", {
            shouldValidate: false,
            shouldDirty: true,
        });
    };


    // --------------------------------------------------
    // Travel Agency input
    // --------------------------------------------------

    const handleTravelAgencyChange = (e) => {

        const value = e.target.value;

        setValue("travelAgency", value, {
            shouldValidate: true,
            shouldDirty: true,
        });

        // IMPORTANT:
        // Travel Agency must NOT be copied into Cover Number.
        setValue("coverNumber", "", {
            shouldValidate: false,
            shouldDirty: true,
        });
    };


    // --------------------------------------------------
    // Cover Number input
    // --------------------------------------------------

    const handleCoverNumberChange = (e) => {

        const value = e.target.value;

        setValue("coverNumber", value, {
            shouldValidate: true,
            shouldDirty: true,
        });

        // Travel Agency must remain empty
        setValue("travelAgency", "", {
            shouldValidate: false,
            shouldDirty: true,
        });
    };

    const currentMonthYear = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="border-b pb-5">

                <h2 className="text-3xl font-bold text-green-800">

                    Personal Information

                </h2>

                <p className="text-gray-600 mt-2">

                    Please provide your basic information before continuing
                    with the feedback form.

                </p>

            </div>


            {/* Card */}

            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">


                {/* Full Name */}

                <div>

                    <label className="block font-semibold mb-2">
                        {t.fullName}{" "}
                        <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        placeholder={t.enterFullName}
                        className={inputClass("fullName")}
                        {...register("fullName", {
                            required: t.required,
                            minLength: {
                                value: 3,
                                message:
                                    language === "ur"
                                        ? "کم از کم 3 حروف درج کریں"
                                        : "Minimum 3 characters",
                            },
                        })}
                    />

                    {errors.fullName && (

                        <p className="text-red-500 text-sm mt-1">

                            {errors.fullName.message}

                        </p>

                    )}

                </div>


                {/* Identifier Type */}

                <div>

                    <label className="block font-semibold mb-3">
                        {t.identificationType}{" "}
                        <span className="text-red-500">*</span>
                    </label>


                    <div className="grid md:grid-cols-2 gap-4">


                        {/* Cover Number */}

                        <label
                            className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${identifierType === "coverNumber"
                                ? "border-green-600 bg-green-50"
                                : "border-gray-300"
                                }`}
                        >

                            <input
                                type="radio"
                                value="coverNumber"
                                checked={
                                    identifierType === "coverNumber"
                                }
                                onChange={() =>
                                    handleIdentifierChange(
                                        "coverNumber"
                                    )
                                }
                                className="w-5 h-5 accent-green-700"
                            />

                            <span className="font-medium">
                                {t.coverNumber}
                            </span>

                        </label>


                        {/* Travel Agency */}

                        <label
                            className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${identifierType === "travelAgency"
                                ? "border-green-600 bg-green-50"
                                : "border-gray-300"
                                }`}
                        >

                            <input
                                type="radio"
                                value="travelAgency"
                                checked={
                                    identifierType === "travelAgency"
                                }
                                onChange={() =>
                                    handleIdentifierChange(
                                        "travelAgency"
                                    )
                                }
                                className="w-5 h-5 accent-green-700"
                            />

                            <span className="font-medium">
                                {t.travelAgency}
                            </span>

                        </label>

                    </div>


                    {/* Validation */}

                    {errors.identifierType && (

                        <p className="text-red-500 text-sm mt-1">

                            {errors.identifierType.message}

                        </p>

                    )}


                    {/* Hidden registered field */}

                    <input
                        type="hidden"
                        {...register("identifierType", {

                            required:
                                "Please select Cover Number or Travel Agency",

                        })}
                    />

                </div>


                {/* Cover Number */}

                {identifierType === "coverNumber" && (

                    <div>

                        <label className="block font-semibold mb-2">
                            {t.coverNumber}{" "}
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            placeholder={t.enterCoverNumber}
                            className={inputClass("coverNumber")}
                            value={watch("coverNumber") || ""}
                            onChange={handleCoverNumberChange}
                        />


                        {errors.coverNumber && (

                            <p className="text-red-500 text-sm mt-1">

                                {errors.coverNumber.message}

                            </p>

                        )}

                    </div>

                )}


                {/* Travel Agency */}

                {identifierType === "travelAgency" && (

                    <div>

                        <label className="block font-semibold mb-2">
                            {t.travelAgency}{" "}
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            placeholder={t.enterTravelAgency}
                            className={inputClass("travelAgency")}
                            value={watch("travelAgency") || ""}
                            onChange={handleTravelAgencyChange}
                        />


                        {errors.travelAgency && (

                            <p className="text-red-500 text-sm mt-1">

                                {errors.travelAgency.message}

                            </p>

                        )}

                    </div>

                )}


                {/* Gender & Age */}

                <div className="grid md:grid-cols-2 gap-6">


                    {/* Gender */}

                    <div>

                        <label className="block font-semibold mb-2">
                            {t.gender}{" "}
                            <span className="text-red-500">*</span>
                        </label>

                        <select
                            className={inputClass("gender")}
                            {...register("gender", {
                                required: t.genderRequired,
                            })}
                        >

                            <option value="">
                                {t.selectGender}
                            </option>

                            <option value="Male">
                                {t.male}
                            </option>

                            <option value="Female">
                                {t.female}
                            </option>

                        </select>

                        {errors.gender && (

                            <p className="text-red-500 text-sm mt-1">

                                {errors.gender.message}

                            </p>

                        )}

                    </div>


                    {/* Age */}

                    <div>

                        <label className="block font-semibold mb-2">
                            {t.ageGroup}{" "}
                            <span className="text-red-500">*</span>
                        </label>

                        <select
                            className={inputClass("ageGroup")}
                            {...register("ageGroup", {
                                required: t.ageRequired,
                            })}
                        >

                            <option value="">
                                {t.selectAgeGroup}
                            </option>

                            <option value="18-30">
                                {t.age18_30}
                            </option>

                            <option value="31-45">
                                {t.age31_45}
                            </option>

                            <option value="46-60">
                                {t.age46_60}
                            </option>

                            <option value="Above 60">
                                {t.above60}
                            </option>

                        </select>


                        {errors.ageGroup && (

                            <p className="text-red-500 text-sm mt-1">

                                {errors.ageGroup.message}

                            </p>

                        )}

                    </div>

                </div>


                {/* Education */}

                <div>

                    <label className="block font-semibold mb-2">

                        Education{" "}

                        <span className="text-red-500">*</span>

                    </label>


                    <select
                        className={inputClass("education")}
                        {...register("education", {

                            required:
                                "Please select Education",

                        })}
                    >

                        <option value="">

                            Select Education

                        </option>

                        <option value="No Formal Education">

                            No Formal Education

                        </option>

                        <option value="Primary">

                            Primary

                        </option>

                        <option value="Secondary">

                            Secondary

                        </option>

                        <option value="PUC">

                            PUC

                        </option>

                        <option value="Degree">

                            Degree

                        </option>

                        <option value="Post Graduation">

                            Post Graduation

                        </option>

                        <option value="Other">

                            Other

                        </option>

                    </select>


                    {errors.education && (

                        <p className="text-red-500 text-sm mt-1">

                            {errors.education.message}

                        </p>

                    )}

                </div>


                {/* Occupation */}

                <div>

                    <label className="block font-semibold mb-2">

                        Occupation

                    </label>


                    <input
                        type="text"
                        placeholder="Enter Occupation"
                        className={inputClass("occupation")}
                        {...register("occupation")}
                    />

                </div>
                <input
                    type="text"
                    value={currentMonthYear}
                    disabled
                    className="w-full rounded-xl px-4 py-3 border border-gray-300
               bg-gray-100 text-gray-600 cursor-not-allowed"
                />

                <input
                    type="hidden"
                    {...register("monthYear")}
                    value={currentMonthYear}
                />

            </div>

        </div>

    );
}