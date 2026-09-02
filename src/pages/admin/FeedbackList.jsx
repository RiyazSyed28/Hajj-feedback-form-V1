import { useEffect, useState } from "react";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
    getAllFeedback,
    deleteFeedback
} from "../../services/api";

export default function FeedbackList() {

    const [feedbacks, setFeedbacks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [gender, setGender] = useState("");

    const [age, setAge] = useState("");

    const [page, setPage] = useState(1);

    const limit = 10;

    useEffect(() => {

        loadFeedback();

    }, [page, search, gender, age]);

    async function loadFeedback() {

        try {

            setLoading(true);

            const { data } = await getAllFeedback({

                page,
                limit,
                search,
                gender,
                age

            });

            setFeedbacks(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    async function handleDelete(id) {

        if (!window.confirm("Delete this feedback?")) return;

        try {

            await deleteFeedback(id);

            loadFeedback();

        }

        catch (err) {

            alert(err.response?.data?.message || "Delete failed");

        }

    }

    return (

        <div className="space-y-6">

            <div className="flex flex-col lg:flex-row gap-4 justify-between">

                <div className="relative w-full lg:w-96">

                    <FaSearch className="absolute left-4 top-4 text-gray-400" />

                    <input

                        type="text"

                        placeholder="Search Name / Cover No."

                        value={search}

                        onChange={(e) => {

                            setSearch(e.target.value);

                            setPage(1);

                        }}

                        className="w-full pl-11 pr-4 py-3 rounded-lg border"

                    />

                </div>

                <div className="flex gap-3">

                    <select

                        value={gender}

                        onChange={(e) => {

                            setGender(e.target.value);

                            setPage(1);

                        }}

                        className="border rounded-lg px-4"

                    >

                        <option value="">All Gender</option>

                        <option>Male</option>

                        <option>Female</option>

                    </select>

                    <select

                        value={age}

                        onChange={(e) => {

                            setAge(e.target.value);

                            setPage(1);

                        }}

                        className="border rounded-lg px-4"

                    >

                        <option value="">All Age</option>

                        <option>18-30</option>

                        <option>31-45</option>

                        <option>46-60</option>

                        <option>60+</option>

                    </select>

                </div>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">Name</th>

                            <th>Cover</th>

                            <th>Agency</th>

                            <th>Gender</th>

                            <th>Age</th>

                            <th>Date</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center py-10"
                                >

                                    Loading...

                                </td>

                            </tr>

                        ) : feedbacks.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center py-10"
                                >

                                    No Feedback Found

                                </td>

                            </tr>

                        ) : (

                            feedbacks.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-4">

                                        {item.full_name}

                                    </td>

                                    <td>{item.cover_number}</td>

                                    <td>{item.travel_agency}</td>

                                    <td>{item.gender}</td>

                                    <td>{item.age_group}</td>

                                    <td>

                                        {new Date(item.created_at).toLocaleDateString()}

                                    </td>

                                    <td>

                                        <div className="flex gap-3 justify-center">

                                            <Link

                                                to={`/admin/feedback/${item.id}`}

                                                className="text-blue-600"

                                            >

                                                <FaEye />

                                            </Link>

                                            <button

                                                onClick={() => handleDelete(item.id)}

                                                className="text-red-600"

                                            >

                                                <FaTrash />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            <div className="flex justify-end gap-3">

                <button

                    disabled={page === 1}

                    onClick={() => setPage(page - 1)}

                    className="px-5 py-2 rounded bg-gray-200"

                >

                    Previous

                </button>

                <button

                    onClick={() => setPage(page + 1)}

                    className="px-5 py-2 rounded bg-[#0F4C81] text-white"

                >

                    Next

                </button>

            </div>

        </div>

    );

}