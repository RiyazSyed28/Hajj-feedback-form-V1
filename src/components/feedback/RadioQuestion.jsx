import { useFormContext } from "react-hook-form";

export default function RadioQuestion({
    label,
    name,
    options,
    required = false,
}) {

    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();

    const selectedValue = watch(name);

    return (

        <div id={`field-${name}`}
            className="space-y-3">

            <label className="block font-semibold">

                {label}

                {required && (
                    <span className="text-red-500 ml-1">*</span>
                )}

            </label>

            <div className="grid md:grid-cols-2 gap-4">

                {options.map((option) => (

                    <label
                        key={option}
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200

                        ${selectedValue === option
                                ? "border-green-600 bg-green-50"
                                : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                            }`}
                    >

                        <input
                            type="radio"
                            value={option}
                            {...register(
                                name,
                                required
                                    ? {
                                        required: `${label} is required`,
                                    }
                                    : {}
                            )}
                            className="accent-green-600"
                        />

                        <span>{option}</span>

                    </label>

                ))}

            </div>

            {errors[name] && (

                <p className="text-red-500 text-sm">

                    {errors[name].message}

                </p>

            )}

        </div>

    );

}