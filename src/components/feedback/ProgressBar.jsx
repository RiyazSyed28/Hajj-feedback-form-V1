import { FaCheck } from "react-icons/fa";

export default function ProgressBar({
    step,
    totalSteps,
    completedSteps,
    onStepClick
}) {

    const steps = [
        "Personal",
        "Arrival",
        "Mina",
        "Arafat",
        "10th Dhul Hijjah",
        "Madinah",
        "Return",
        "Health",
        "Feedback"
    ];

    return (

        <div className="bg-white rounded-2xl shadow p-6 mb-10">

            <div className="flex justify-between overflow-x-auto">

                {steps.map((title, index) => {

                    const current = index + 1;

                    return (

                        <div
                            key={title}
                            onClick={() => {

                                if (
                                    completedSteps.includes(current) ||
                                    current === step
                                ) {
                                    onStepClick(current);
                                }

                            }}
                            className={`flex flex-col items-center flex-1 transition
        ${completedSteps.includes(current) || current === step
                                    ? "cursor-pointer"
                                    : "cursor-not-allowed opacity-60"
                                }`}
                        >

                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300

                                ${current < step
                                        ? "bg-green-700 text-white group-hover:bg-green-800"
                                        : current === step
                                            ? "bg-yellow-500 text-white ring-4 ring-yellow-200"
                                            : "bg-gray-200 text-gray-500 group-hover:bg-gray-300"
                                    }
                                `}
                            >

                                {current < step ? <FaCheck /> : current}

                            </div>

                            <p
                                className={`text-xs mt-2 text-center transition

                                ${current === step
                                        ? "font-semibold text-green-700"
                                        : "text-gray-600"
                                    }

                                `}
                            >
                                {title}
                            </p>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}