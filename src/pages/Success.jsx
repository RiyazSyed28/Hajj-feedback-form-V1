import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function Success() {
    return (

        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-6">

            <div className="bg-white shadow-2xl rounded-3xl p-12 max-w-xl w-full text-center">

                <FaCheckCircle
                    className="text-green-600 text-7xl mx-auto mb-6"
                />

                <h1 className="text-4xl font-bold text-green-800 mb-4">
                    Feedback Submitted Successfully
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Thank you for sharing your valuable Hajj experience.
                    <br />
                    Your feedback will help improve future Hajj services.
                </p>

                <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">

                    <p className="text-green-800 font-medium italic">
                        "May Allah accept your Hajj and reward you abundantly."
                    </p>

                </div>

                <Link
                    to="/"
                    className="inline-block bg-green-700 hover:bg-green-800 transition text-white px-8 py-3 rounded-xl font-semibold"
                >
                    Return to Home
                </Link>

            </div>

        </div>

    );
}