import {

    ResponsiveContainer,

    LineChart,

    Line,

    XAxis,

    YAxis,

    Tooltip,

    CartesianGrid

} from "recharts";

export default function DailyChart({ data }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Daily Feedback Trend

            </h2>

            <ResponsiveContainer width="100%" height={350}>

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#0F4C81"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}