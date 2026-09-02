import { useFormContext } from "react-hook-form";

export default function SelectQuestion({
    label,
    name,
    options,
    required = false,
}) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="space-y-2">

            <label className="block font-semibold">
                {label}

                {required && (
                    <span className="text-red-500 ml-1">*</span>
                )}
            </label>

            <select
                {...register(
                    name,
                    required
                        ? {
                              required: `${label} is required`,
                          }
                        : {}
                )}
                className={`w-full rounded-xl border px-4 py-3 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-green-600
                    ${
                        errors[name]
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300"
                    }`}
            >
                <option value="">Select</option>

                {options.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            {errors[name] && (
                <p className="text-red-500 text-sm">
                    {errors[name].message}
                </p>
            )}

        </div>
    );
}