import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// =========================
// Attach JWT Token
// =========================

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

// =========================
// Admin Login
// =========================

export const loginAdmin = (data) =>
    api.post("/admin/login", data);

export const getProfile = () =>
    api.get("/admin/profile");

export const updateProfile = (data) =>
    api.put("/admin/profile", data);

// =========================
// Dashboard
// =========================

export const getDashboard = () =>
    api.get("/admin/dashboard");

export const changePassword = (data) =>
    api.put("/admin/change-password", data);

// =========================
// Feedback
// =========================

export const getAllFeedback = (params) =>
    api.get("/admin/feedback", { params });

export const getFeedbackDetails = (id) =>
    api.get(`/admin/feedback/${id}`);

export const deleteFeedback = (id) =>
    api.delete(`/admin/feedback/${id}`);

// =========================
// Analytics
// =========================

export const getAnalytics = () =>
    api.get("/admin/analytics");

// =========================
// Export
// =========================

export const exportExcel = (params) =>
    api.get("/admin/export/excel", {
        params,
        responseType: "blob"
    });

export const exportPDF = (params) =>
    api.get("/admin/export/pdf", {
        params,
        responseType: "blob"
    });

export default api;