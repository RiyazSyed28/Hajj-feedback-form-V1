export default function TextQuestion({
    label,
    name,
    register,
    type = "text",
    placeholder = "",
}) {

    return (

        <div>

            <label className="block font-semibold mb-2">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-green-600"
            />

        </div>

    );

}