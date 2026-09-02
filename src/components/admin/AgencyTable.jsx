export default function AgencyTable({ data }) {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="font-bold text-lg mb-5">

                Top Travel Agencies

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-3">

                            Agency

                        </th>

                        <th className="text-right py-3">

                            Pilgrims

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {data.map((agency, index) => (

                        <tr
                            key={index}
                            className="border-b"
                        >

                            <td className="py-3">

                                {agency.travel_agency || "-"}

                            </td>

                            <td className="text-right">

                                {agency.total}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}