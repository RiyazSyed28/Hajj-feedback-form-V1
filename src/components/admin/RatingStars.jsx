import { FaStar } from "react-icons/fa";

export default function RatingStars({ rating }) {

    const value = Number(rating || 0);

    return (

        <div className="flex gap-1">

            {[1,2,3,4,5].map((star)=>(

                <FaStar
                    key={star}
                    className={
                        star<=value
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                />

            ))}

            <span className="ml-2 font-semibold">

                {rating || "-"}

            </span>

        </div>

    );

}