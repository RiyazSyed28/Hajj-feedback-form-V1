import {
    FaBell,
    FaUserCircle,
    FaSignOutAlt,
    FaBars
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    const admin = JSON.parse(localStorage.getItem("admin"));

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 17
            ? "Good Afternoon"
            : "Good Evening";

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        navigate("/admin/login");

    };

    return (

        <header className="bg-white shadow-sm border-b h-20 px-8 flex items-center justify-between">

            {/* Left */}

            <div className="flex items-center gap-4">

                <button className="lg:hidden text-2xl">

                    <FaBars />

                </button>

                <div>

                    <h1 className="text-2xl font-bold text-gray-800">

                        Hajj Feedback Dashboard

                    </h1>

                    <p className="text-sm text-gray-500">

                        {today}

                    </p>

                </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

                {/* Notification */}

                <button className="relative">

                    <FaBell
                        size={22}
                        className="text-gray-600 hover:text-blue-600 transition"
                    />

                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">

                        0

                    </span>

                </button>

                {/* Admin Info */}

                <div className="flex items-center gap-3">

                    <FaUserCircle
                        size={42}
                        className="text-[#0F4C81]"
                    />

                    <div>

                        <h3 className="font-semibold">

                            {admin?.username || "Administrator"}

                        </h3>

                        <p className="text-sm text-gray-500">

                            {greeting}

                        </p>

                    </div>

                </div>

                {/* Logout */}

                <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </header>

    );

}