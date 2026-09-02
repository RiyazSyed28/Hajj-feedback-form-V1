import {

    Chart as ChartJS,

    ArcElement,

    Tooltip,

    Legend

} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(

    ArcElement,

    Tooltip,

    Legend

);

export default function EducationChart({ data }) {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="font-bold text-lg mb-4">

                Education

            </h2>

            <Doughnut

                data={{

                    labels: data.map(i => i.education),

                    datasets: [

                        {

                            data: data.map(i => i.total)

                        }

                    ]

                }}

            />

        </div>

    );

}