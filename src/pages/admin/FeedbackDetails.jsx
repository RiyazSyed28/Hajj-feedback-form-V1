import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FaPrint,
    FaFilePdf,
    FaArrowLeft,
    FaTrash
} from "react-icons/fa";

import {
    getFeedbackDetails,
    deleteFeedback
} from "../../services/api";

import DetailCard from "../../components/admin/DetailCard";
import InfoRow from "../../components/admin/InfoRow";

export default function FeedbackDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        load();

    }, [id]);

    async function load() {

        try {

            const res = await getFeedbackDetails(id);

            setData(res.data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    async function handleDelete() {

        if (!window.confirm("Delete this feedback?"))

            return;

        try {

            await deleteFeedback(id);

            navigate("/admin/feedback");

        }

        catch (err) {

            alert(err.response?.data?.message || "Delete Failed");

        }

    }

    if (loading)

        return (

            <div className="flex justify-center items-center h-96">

                Loading...

            </div>

        );

    if (!data)

        return (

            <div className="text-center py-20">

                Feedback Not Found

            </div>

        );

    return (

        <div className="max-w-7xl mx-auto space-y-6">

            {/* Header */}

            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

                <div>

                    <button

                        onClick={() => navigate(-1)}

                        className="flex items-center gap-2 text-[#0F4C81] font-semibold"

                    >

                        <FaArrowLeft />

                        Back

                    </button>

                    <h1 className="text-3xl font-bold mt-2">

                        Feedback Details

                    </h1>

                    <p className="text-gray-500">

                        Submission #{data.id}

                    </p>

                </div>

                <div className="flex gap-3 print:hidden">

                    <button

                        onClick={() => window.print()}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"

                    >

                        <FaPrint />

                        Print

                    </button>

                    <button

                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"

                    >

                        <FaFilePdf />

                        Export PDF

                    </button>

                    <button

                        onClick={handleDelete}

                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"

                    >

                        <FaTrash />

                        Delete

                    </button>

                </div>

            </div>

            {/* Summary */}

            <DetailCard title="Submission Summary">

                <div className="grid md:grid-cols-4 gap-6">

                    <div>

                        <h4 className="text-gray-500">

                            Pilgrim

                        </h4>

                        <p className="font-bold text-lg">

                            {data.full_name}

                        </p>

                    </div>

                    <div>

                        <h4 className="text-gray-500">

                            Cover Number

                        </h4>

                        <p className="font-bold">

                            {data.cover_number}

                        </p>

                    </div>

                    <div>

                        <h4 className="text-gray-500">

                            Gender

                        </h4>

                        <p className="font-bold">

                            {data.gender}

                        </p>

                    </div>

                    <div>

                        <h4 className="text-gray-500">

                            Submitted

                        </h4>

                        <p className="font-bold">

                            {new Date(data.created_at).toLocaleString()}

                        </p>

                    </div>

                </div>

            </DetailCard>

            {/* Personal */}

            <DetailCard title="Pilgrim Information">

                <InfoRow label="Full Name" value={data.full_name} />

                <InfoRow label="Cover Number" value={data.cover_number} />

                <InfoRow label="Travel Agency" value={data.travel_agency} />

                <InfoRow label="Gender" value={data.gender} />

                <InfoRow label="Age Group" value={data.age_group} />

                <InfoRow label="Education" value={data.education} />

                <InfoRow label="Occupation" value={data.occupation} />

            </DetailCard>

            {/* Departure */}

            <DetailCard title="Departure Feedback">

                <InfoRow
                    label="Haj Bhavan Rating"
                    value={data.haj_bhavan_rating}
                    rating
                />

                <InfoRow
                    label="Haj Bhavan Remarks"
                    value={data.haj_bhavan_remark}
                />

                <InfoRow
                    label="Flight Rating"
                    value={data.flight_rating}
                    rating
                />

                <InfoRow
                    label="Flight Delay"
                    value={data.flight_delay}
                />

                <InfoRow
                    label="Flight Remarks"
                    value={data.flight_remark}
                />

                <InfoRow
                    label="Baggage Rating"
                    value={data.baggage_rating}
                    rating
                />

                <InfoRow
                    label="Waiting Time"
                    value={data.baggage_waiting_time}
                />

                <InfoRow
                    label="Baggage Remarks"
                    value={data.baggage_remark}
                />

                <InfoRow
                    label="Room Rating"
                    value={data.room_rating}
                    rating
                />

                <InfoRow
                    label="Persons Per Room"
                    value={data.room_persons_count}
                />

                <InfoRow
                    label="Room Cleanliness"
                    value={data.room_cleanliness_rating}
                    rating
                />

                <InfoRow
                    label="Room Remarks"
                    value={data.room_remark}
                />

                <InfoRow
                    label="Umrah Rating"
                    value={data.umrah_rating}
                    rating
                />

                <InfoRow
                    label="Crowd Level"
                    value={data.umrah_crowd_level}
                />

                <InfoRow
                    label="Umrah Remarks"
                    value={data.umrah_remark}
                />

                <InfoRow
                    label="Gate 40 Wudu Used"
                    value={data.wudu_used}
                />

                <InfoRow
                    label="Wudu Rating"
                    value={data.wudu_rating}
                    rating
                />

                <InfoRow
                    label="Wudu Remarks"
                    value={data.wudu_remark}
                />

            </DetailCard>

            {/* Mina */}

            <DetailCard title="Mina">

                <InfoRow label="Journey Duration" value={data.mina_travel_duration} />

                <InfoRow label="Travel Mode" value={data.mina_travel_mode} />

                <InfoRow label="On Time" value={data.mina_on_time} />

                <InfoRow label="Journey Remarks" value={data.mina_journey_remark} />

                <InfoRow label="Tent Rating" value={data.mina_tent_rating} rating />

                <InfoRow label="Tent Remarks" value={data.mina_tent_remark} />

                <InfoRow label="Toilet Rating" value={data.mina_toilet_rating} rating />

                <InfoRow label="Guide" value={data.mina_guide} />

                <InfoRow label="Toilet Remarks" value={data.mina_toilet_remark} />

                <InfoRow label="Food Rating" value={data.food_access_rating} rating />

                <InfoRow label="Food Remarks" value={data.food_access_remark} />

                <InfoRow label="Behaviour Rating" value={data.mina_behaviour_rating} rating />

                <InfoRow label="Behaviour Remarks" value={data.mina_behaviour_remark} />

            </DetailCard>
                        {/* Arafat & Muzdalifah */}

            <DetailCard title="Arafat & Muzdalifah">

                <InfoRow
                    label="Arafat Transport"
                    value={data.arafat_mode}
                />

                <InfoRow
                    label="Crowd Level"
                    value={data.arafat_crowd}
                />

                <InfoRow
                    label="Travel Duration"
                    value={data.arafat_travel_duration}
                />

                <InfoRow
                    label="Guide Available"
                    value={data.arafat_guide}
                />

                <InfoRow
                    label="Remarks"
                    value={data.arafat_remark}
                />

                <InfoRow
                    label="Muzdalifah Transport"
                    value={data.muzdalifah_mode}
                />

                <InfoRow
                    label="Travel Duration"
                    value={data.muzdalifah_travel_duration}
                />

                <InfoRow
                    label="Arrival Time"
                    value={data.muzdalifah_reaching_time}
                />

                <InfoRow
                    label="Transport Used"
                    value={data.muzdalifah_transport}
                />

                <InfoRow
                    label="Space Availability"
                    value={data.muzdalifah_space}
                />

                <InfoRow
                    label="Remarks"
                    value={data.muzdalifah_space_remark}
                />

            </DetailCard>

            {/* 10th–13th Dhul Hijjah */}

            <DetailCard title="10th–13th Dhul Hijjah">

                <InfoRow
                    label="Jamarat Difficulty"
                    value={data.jumerat_difficulty}
                />

                <InfoRow
                    label="Jamarat Remarks"
                    value={data.jumerat_remark}
                />

                <InfoRow
                    label="Qurbani Completed"
                    value={data.qurbani_completed}
                />

                <InfoRow
                    label="Qurbani Remarks"
                    value={data.qurbani_remark}
                />

                <InfoRow
                    label="Halaq Waiting Time"
                    value={data.halaq_waiting_time}
                />

                <InfoRow
                    label="Halaq Remarks"
                    value={data.halaq_remark}
                />

                <InfoRow
                    label="Ziarah Transport"
                    value={data.ziarah_transport}
                />

                <InfoRow
                    label="Crowd"
                    value={data.ziarah_crowd}
                />

                <InfoRow
                    label="Ziarah Remarks"
                    value={data.ziarah_remark}
                />

            </DetailCard>

            {/* Madinah */}

            <DetailCard title="Madinah">

                <InfoRow
                    label="Overall Rating"
                    value={data.madinah_rating}
                    rating
                />

                <InfoRow
                    label="Riyazul Jannah"
                    value={data.riyazul_jannah}
                />

                <InfoRow
                    label="Nusuk App"
                    value={data.nusuk_app}
                />

                <InfoRow
                    label="Remarks"
                    value={data.madinah_remark}
                />

            </DetailCard>

            {/* Return Journey */}

            <DetailCard title="Return Journey">

                <InfoRow
                    label="Jeddah Airport Rating"
                    value={data.jeddah_airport_rating}
                    rating
                />

                <InfoRow
                    label="Jeddah Airport Remarks"
                    value={data.jeddah_airport_remark}
                />

                <InfoRow
                    label="India Immigration Rating"
                    value={data.india_immigration_rating}
                    rating
                />

                <InfoRow
                    label="Immigration Remarks"
                    value={data.india_immigration_remark}
                />

                <InfoRow
                    label="India Customs Rating"
                    value={data.india_customs_rating}
                    rating
                />

                <InfoRow
                    label="Customs Remarks"
                    value={data.india_customs_remark}
                />

            </DetailCard>

            {/* Health & General */}

            <DetailCard title="Health & General Feedback">

                <InfoRow
                    label="Walking Practice Helped"
                    value={data.walking_helped}
                />

                <InfoRow
                    label="Health Experience"
                    value={data.health_experience_rating}
                    rating
                />

                <InfoRow
                    label="Health Remarks"
                    value={data.health_experience_remark}
                />

                <InfoRow
                    label="Food Facility"
                    value={data.food_facility_rating}
                    rating
                />

                <InfoRow
                    label="Food Remarks"
                    value={data.food_facility_remark}
                />

                <InfoRow
                    label="Group Cooperation"
                    value={data.group_cooperation_rating}
                    rating
                />

                <InfoRow
                    label="Group Remarks"
                    value={data.group_cooperation_remark}
                />

                <InfoRow
                    label="Medical Facility"
                    value={data.medical_facility_rating}
                    rating
                />

                <InfoRow
                    label="Medical Remarks"
                    value={data.medical_facility_remark}
                />

                <div className="mt-8">

                    <h3 className="font-bold text-lg mb-2">

                        Other Observation

                    </h3>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 whitespace-pre-wrap">

                        {data.other_observation || "No observation provided."}

                    </div>

                </div>

                <div className="mt-6">

                    <h3 className="font-bold text-lg mb-2">

                        Message for Future Hajees

                    </h3>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 whitespace-pre-wrap">

                        {data.future_hajees_message || "No message provided."}

                    </div>

                </div>

            </DetailCard>

        </div>

    );

}