export default function AgencyChart({ data }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Top Travel Agencies

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-2">

                            Agency

                        </th>

                        <th className="text-right">

                            Feedback

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {data.map((item, index) => (

                        <tr
                            key={index}
                            className="border-b"
                        >

                            <td className="py-3">

                                {item.travel_agency}

                            </td>

                            <td className="text-right">

                                {item.total}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}