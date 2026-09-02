import { useEffect, useState } from "react";

import { getAnalytics } from "../../services/api";

import StatCard from "../../components/admin/StatCard";

import GenderChart from "../../components/admin/charts/GenderChart";
import AgeChart from "../../components/admin/charts/AgeChart";
import DailyChart from "../../components/admin/charts/DailyChart";
import RatingChart from "../../components/admin/charts/RatingChart";
import AgencyChart from "../../components/admin/charts/AgencyChart";

import {
    FaClipboardCheck,
    FaMale,
    FaFemale,
    FaBuilding
} from "react-icons/fa";

export default function Analytics() {

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAnalytics();

    }, []);

   async function loadAnalytics() {

    try {

        const { data } = await getAnalytics();

        console.log("Analytics Response:", data);

        setAnalytics(data);

    } catch (err) {

        console.error(err);

    } finally {

        setLoading(false);

    }

}

    if (loading) {

        return (

            <div className="flex justify-center items-center h-96">

                <h2 className="text-2xl font-bold">

                    Loading Analytics...

                </h2>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold">

                    Analytics Dashboard

                </h1>

                <p className="text-gray-500 mt-2">

                    Hajj Feedback Insights & Reports

                </p>

            </div>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                <StatCard
                    title="Total Feedback"
                    value={analytics.summary.totalFeedback}
                    icon={<FaClipboardCheck />}
                    color="bg-blue-600"
                />

                <StatCard
                    title="Male"
                    value={analytics.summary.male}
                    icon={<FaMale />}
                    color="bg-green-600"
                />

                <StatCard
                    title="Female"
                    value={analytics.summary.female}
                    icon={<FaFemale />}
                    color="bg-pink-600"
                />

                <StatCard
                    title="Travel Agencies"
                    value={analytics.summary.agencies}
                    icon={<FaBuilding />}
                    color="bg-orange-600"
                />

            </div>

            {/* Charts */}

            <div className="grid lg:grid-cols-2 gap-6">

                <GenderChart

                    data={analytics.gender}

                />

                <AgeChart

                    data={analytics.age}

                />

            </div>

            <DailyChart

                data={analytics.daily}

            />

            <RatingChart

                ratings={analytics.ratings}

            />

            <AgencyChart

                data={analytics.agency}

            />

        </div>

    );

}