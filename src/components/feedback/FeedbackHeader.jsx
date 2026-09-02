// import logo from "../../assets/logo.webp";

export default function FeedbackHeader() {
    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

            <div className="flex flex-col md:flex-row items-center gap-6">

                {/* <img
                    src={logo}
                    alt="Karnataka State Haj Committee"
                    className="w-24 h-24 object-contain"
                /> */}

                <div>

                    <h1 className="text-4xl font-bold text-green-800">
                        Karnataka State Haj Committee
                    </h1>

                    <h2 className="text-2xl font-semibold mt-2">
                        Hajj Pilgrim Feedback Portal 2026
                    </h2>

                    <p className="text-gray-600 mt-3">
                        Your valuable feedback will help us improve future Hajj
                        arrangements and provide better services.
                    </p>

                </div>

            </div>

        </div>
    );
}