import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    FaClipboardCheck,
    FaMale,
    FaFemale,
    FaBuilding,
    FaStar,
    FaCalendarDay,
    FaArrowRight,
    FaChartBar,
    FaUsers
} from "react-icons/fa";

import { getDashboard } from "../../services/api";

import StatCard from "../../components/admin/StatCard";

export default function Dashboard() {

    const [stats, setStats] = useState({
        total: 0,
        male: 0,
        female: 0,
        agencies: 0,
        averageRating: 0,
        today: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {

        try {

            const { data } = await getDashboard();

            setStats(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="flex items-center justify-center h-[70vh]">

                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Welcome */}

            <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl p-8 text-white shadow">

                <h1 className="text-3xl font-bold">

                    Welcome Administrator 👋

                </h1>

                <p className="mt-2 opacity-90">

                    Karnataka State Hajj Committee Feedback Management Portal

                </p>

            </div>

            {/* Statistics */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <StatCard
                    title="Total Feedback"
                    value={stats.total}
                    icon={<FaClipboardCheck />}
                    color="bg-blue-600"
                />

                <StatCard
                    title="Male Pilgrims"
                    value={stats.male}
                    icon={<FaMale />}
                    color="bg-green-600"
                />

                <StatCard
                    title="Female Pilgrims"
                    value={stats.female}
                    icon={<FaFemale />}
                    color="bg-pink-600"
                />

                <StatCard
                    title="Travel Agencies"
                    value={stats.agencies}
                    icon={<FaBuilding />}
                    color="bg-orange-500"
                />

                <StatCard
                    title="Average Rating"
                    value={stats.averageRating}
                    icon={<FaStar />}
                    color="bg-yellow-500"
                />

                <StatCard
                    title="Today's Feedback"
                    value={stats.today}
                    icon={<FaCalendarDay />}
                    color="bg-purple-600"
                />

            </div>

            {/* Quick Actions */}

            <div className="grid md:grid-cols-3 gap-6">

                <Link
                    to="/admin/feedback"
                    className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
                >

                    <FaUsers className="text-4xl text-blue-600 mb-4" />

                    <h3 className="font-bold text-lg">

                        View Feedback

                    </h3>

                    <p className="text-gray-500 mt-2">

                        Browse all submitted feedback.

                    </p>

                    <div className="mt-4 flex items-center text-blue-600">

                        Open

                        <FaArrowRight className="ml-2" />

                    </div>

                </Link>

                <Link
                    to="/admin/analytics"
                    className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
                >

                    <FaChartBar className="text-4xl text-green-600 mb-4" />

                    <h3 className="font-bold text-lg">

                        Analytics

                    </h3>

                    <p className="text-gray-500 mt-2">

                        View reports and charts.

                    </p>

                    <div className="mt-4 flex items-center text-green-600">

                        Open

                        <FaArrowRight className="ml-2" />

                    </div>

                </Link>

                <div className="bg-white shadow rounded-xl p-6">

                    <h3 className="font-bold text-lg">

                        System Status

                    </h3>

                    <div className="mt-5 space-y-3">

                        <div className="flex justify-between">

                            <span>Backend</span>

                            <span className="text-green-600 font-semibold">

                                Online

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Database</span>

                            <span className="text-green-600 font-semibold">

                                Connected

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Admin Login</span>

                            <span className="text-green-600 font-semibold">

                                Active

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Charts */}

            <div className="bg-white rounded-xl shadow p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Analytics Overview

                </h2>

                <div className="h-80 flex items-center justify-center text-gray-400">

                    Recharts will be added here

                </div>

            </div>

            {/* Recent Feedback */}

            <div className="bg-white rounded-xl shadow p-8">

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-2xl font-bold">

                        Recent Feedback

                    </h2>

                    <Link
                        to="/admin/feedback"
                        className="text-blue-600 font-semibold"
                    >

                        View All

                    </Link>

                </div>

                <div className="text-center py-12 text-gray-400">

                    Recent feedback table will be displayed here.

                </div>

            </div>

        </div>

    );

}