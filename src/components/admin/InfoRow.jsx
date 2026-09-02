import RatingStars from "./RatingStars";

export default function InfoRow({

    label,
    value,
    rating=false

}){

    return(

        <div className="grid grid-cols-3 py-3 border-b">

            <div className="font-semibold text-gray-700">

                {label}

            </div>

            <div className="col-span-2">

                {

                    rating

                    ? <RatingStars rating={value}/>

                    : (value || "-")

                }

            </div>

        </div>

    );

}