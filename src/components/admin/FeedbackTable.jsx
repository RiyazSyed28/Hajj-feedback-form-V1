import { Link } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";

export default function FeedbackTable({

    feedback = [],
    onDelete

}) {

    return (

        <div className="overflow-x-auto bg-white rounded-xl shadow">

            <table className="min-w-full">

                <thead className="bg-[#0F4C81] text-white">

                    <tr>

                        <th className="px-5 py-4 text-left">#</th>

                        <th className="px-5 py-4 text-left">Name</th>

                        <th className="px-5 py-4 text-left">Cover No</th>

                        <th className="px-5 py-4 text-left">Agency</th>

                        <th className="px-5 py-4 text-left">Gender</th>

                        <th className="px-5 py-4 text-left">Age</th>

                        <th className="px-5 py-4 text-left">Submitted</th>

                        <th className="px-5 py-4 text-center">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {feedback.length === 0 && (

                        <tr>

                            <td
                                colSpan="8"
                                className="text-center py-10 text-gray-500"
                            >

                                No Feedback Found

                            </td>

                        </tr>

                    )}

                    {feedback.map((item, index) => (

                        <tr
                            key={item.id}
                            className="border-b hover:bg-gray-50"
                        >

                            <td className="px-5 py-4">

                                {index + 1}

                            </td>

                            <td className="px-5 py-4">

                                {item.full_name}

                            </td>

                            <td className="px-5 py-4">

                                {item.cover_number || "-"}

                            </td>

                            <td className="px-5 py-4">

                                {item.travel_agency || "-"}

                            </td>

                            <td className="px-5 py-4">

                                {item.gender}

                            </td>

                            <td className="px-5 py-4">

                                {item.age_group}

                            </td>

                            <td className="px-5 py-4">

                                {new Date(item.created_at).toLocaleDateString("en-IN")}

                            </td>

                            <td className="px-5 py-4">

                                <div className="flex justify-center gap-3">

                                    <Link

                                        to={`/admin/feedback/${item.id}`}

                                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"

                                    >

                                        <FaEye />

                                    </Link>

                                    <button

                                        onClick={() => onDelete(item.id)}

                                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"

                                    >

                                        <FaTrash />

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}