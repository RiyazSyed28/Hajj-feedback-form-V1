import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import Home from "../pages/Home/Home";
import Purpose from "../pages/Purpose/Purpose";
import Training from "../pages/Training/Training";
import Locations from "../pages/Locations/Locations";
import Feedback from "../pages/Feedback/Feedback";
import Success from "../pages/Success";

// Admin Pages
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import FeedbackList from "../pages/admin/FeedbackList";
import FeedbackDetails from "../pages/admin/FeedbackDetails";
import Analytics from "../pages/admin/Analytics";
import Export from "../pages/admin/Export";
import Profile from "../pages/admin/Profile";
import ChangePassword from "../pages/admin/ChangePassword"

// Protected Route
import ProtectedRoute from "../components/admin/ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>

            {/* ==========================
                Public Website
            ========================== */}

            <Route element={<MainLayout />}>

                <Route path="/" element={<Home />} />

                <Route path="/purpose" element={<Purpose />} />

                <Route path="/training" element={<Training />} />

                <Route path="/locations" element={<Locations />} />

                <Route path="/feedback" element={<Feedback />} />

                <Route path="/success" element={<Success />} />

            </Route>

            {/* ==========================
                Admin Login
            ========================== */}

            <Route
                path="/admin/login"
                element={<Login />}
            />

            {/* ==========================
                Protected Admin Routes
            ========================== */}

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="profile"
                    element={<Profile />}
                />
                <Route path="export" element={<Export />} />
                {/* Redirect /admin → /admin/dashboard */}

                <Route
                    index
                    element={<Navigate to="dashboard" replace />}
                />

                <Route
                    path="dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="feedback"
                    element={<FeedbackList />}
                />

                <Route
                    path="feedback/:id"
                    element={<FeedbackDetails />}
                />

                <Route
                    path="analytics"
                    element={<Analytics />}
                />

            </Route>
            <Route
                path="admin/change-password"
                element={<ChangePassword />}
            />

            {/* ==========================
                404 Page
            ========================== */}

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
}

export default AppRoutes;