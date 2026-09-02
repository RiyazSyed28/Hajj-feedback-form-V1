import {

    ResponsiveContainer,

    BarChart,

    Bar,

    XAxis,

    YAxis,

    Tooltip,

    CartesianGrid

} from "recharts";

export default function AgeChart({ data }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Age Groups

            </h2>

            <ResponsiveContainer width="100%" height={320}>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="age_group" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="total"
                        fill="#0F4C81"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}