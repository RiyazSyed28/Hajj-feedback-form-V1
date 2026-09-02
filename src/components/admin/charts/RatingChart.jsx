import {

    ResponsiveContainer,

    BarChart,

    XAxis,

    YAxis,

    Tooltip,

    Bar

} from "recharts";

export default function RatingChart({ ratings }) {

    const data = [

        {

            category: "Haj Bhavan",

            rating: ratings.hajBhavan

        },

        {

            category: "Flight",

            rating: ratings.flight

        },

        {

            category: "Baggage",

            rating: ratings.baggage

        },

        {

            category: "Room",

            rating: ratings.room

        },

        {

            category: "Umrah",

            rating: ratings.umrah

        }

    ];

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Average Ratings

            </h2>

            <ResponsiveContainer width="100%" height={320}>

                <BarChart data={data}>

                    <XAxis dataKey="category" />

                    <YAxis domain={[0, 5]} />

                    <Tooltip />

                    <Bar
                        dataKey="rating"
                        fill="#FFC107"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}