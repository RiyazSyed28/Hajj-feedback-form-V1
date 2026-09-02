import { NavLink, useNavigate } from "react-router-dom";
import {
    FaChartPie,
    FaClipboardList,
    FaChartBar,
    FaFileExport,
    FaSignOutAlt,
    FaMosque
} from "react-icons/fa";

import { FaUserCircle } from "react-icons/fa";

export default function Sidebar() {

    const navigate = useNavigate();

    const menu = [

        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <FaChartPie />
        },

        {
            name: "All Feedback",
            path: "/admin/feedback",
            icon: <FaClipboardList />
        },

        {
            name: "Analytics",
            path: "/admin/analytics",
            icon: <FaChartBar />
        },

        {
            name: "Export",
            path: "/admin/export",
            icon: <FaFileExport />
        },

        {
            name: "Profile",
            path: "/admin/profile",
            icon: <FaUserCircle />
        }

    ];

    const handleLogout = () => {

        if (!window.confirm("Are you sure you want to logout?")) return;

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        navigate("/admin/login");

    };

    return (

        <aside className="w-72 bg-[#0F4C81] text-white flex flex-col shadow-xl">

            <div className="p-6 border-b border-blue-700">

                <div className="flex items-center gap-3">

                    <FaMosque size={28} />

                    <div>

                        <h1 className="text-xl font-bold">
                            Hajj Feedback
                        </h1>

                        <p className="text-sm text-blue-200">
                            Admin Panel
                        </p>

                    </div>

                </div>

            </div>

            <nav className="flex-1 py-6">

                {menu.map((item) => (

                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-6 py-4 transition-all ${isActive
                                ? "bg-white text-[#0F4C81] font-semibold"
                                : "hover:bg-blue-700"
                            }`
                        }
                    >

                        <span className="text-lg">
                            {item.icon}
                        </span>

                        {item.name}

                    </NavLink>

                ))}

            </nav>

            <div className="border-t border-blue-700 p-5">

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full rounded-lg px-4 py-3 hover:bg-red-600 transition"
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </aside>

    );

}