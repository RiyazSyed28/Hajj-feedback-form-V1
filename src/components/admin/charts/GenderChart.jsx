import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = ["#0F4C81", "#E91E63"];

export default function GenderChart({ data }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Gender Distribution

            </h2>

            <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="total"
                        nameKey="gender"
                        outerRadius={110}
                        label
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}