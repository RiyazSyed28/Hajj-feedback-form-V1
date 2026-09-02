import { FaStar } from "react-icons/fa";

function Rating({
    value = 0,
    onChange = () => {}
}) {

    return (

        <div
            className="flex items-center gap-2"
            role="radiogroup"
            aria-label="Rating"
        >

            {[1, 2, 3, 4, 5].map((star) => (

                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    aria-label={`${star} Star${star > 1 ? "s" : ""}`}
                    className="focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
                >

                    <FaStar
                        className={`text-4xl transition-all duration-200 ease-in-out
                        ${
                            star <= value
                                ? "text-yellow-400 scale-110"
                                : "text-gray-300 hover:text-yellow-300 hover:scale-105"
                        }`}
                    />

                </button>

            ))}

            <span className="ml-3 text-sm font-medium text-gray-600">

                {value > 0 ? `${value} / 5` : "Not Rated"}

            </span>

        </div>

    );

}

export default Rating;