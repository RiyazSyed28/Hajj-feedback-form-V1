import bcrypt from "bcryptjs";
import pool from "../config/db.js";

import {
    findAdmin,
    getAdminById,
    updateAdminProfile,
    updateAdminPassword,
     
} from "../models/adminModel.js";
import { generateToken } from "../utils/generateToken.js";

// ======================================================
// Admin Login
// ======================================================

export const loginAdmin = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and Password are required."
            });
        }

        const admin = await findAdmin(username);

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password."
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password."
            });
        }

        const token = generateToken(admin.id);

        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ======================================================
// Admin profile setting
// ======================================================
export const getProfile = async (req, res) => {

    try {

        const admin = await getAdminById(req.admin.id);

        res.json(admin);

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

export const updateProfile = async (req, res) => {

    try {

        const { username, email } = req.body;

        await updateAdminProfile(
            req.admin.id,
            username,
            email
        );

        res.json({

            success: true,

            message: "Profile updated successfully."

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

export const changePassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;

        if (!currentPassword || !newPassword) {

            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });

        }

        const admin = await getAdminById(req.admin.id);

        const [rows] = await pool.query(
            "SELECT * FROM admins WHERE id = ?",
            [req.admin.id]
        );

        const user = rows[0];

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Current password is incorrect."
            });

        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        await updateAdminPassword(
            req.admin.id,
            hashedPassword
        );

        res.json({

            success: true,

            message: "Password changed successfully."

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};


// ======================================================
// Dashboard
// ======================================================

export const getDashboard = async (req, res) => {

    try {

        const [[total]] = await pool.query(
            "SELECT COUNT(*) total FROM pilgrim_submissions"
        );

        const [[male]] = await pool.query(
            "SELECT COUNT(*) total FROM pilgrim_submissions WHERE gender='Male'"
        );

        const [[female]] = await pool.query(
            "SELECT COUNT(*) total FROM pilgrim_submissions WHERE gender='Female'"
        );

        const [[agency]] = await pool.query(
            "SELECT COUNT(DISTINCT travel_agency) total FROM pilgrim_submissions"
        );

        const [[today]] = await pool.query(`
            SELECT COUNT(*) total
            FROM pilgrim_submissions
            WHERE DATE(created_at)=CURDATE()
        `);

        const [[rating]] = await pool.query(`
            SELECT ROUND(
                AVG(
                    (
                        IFNULL(haj_bhavan_rating,0)+
                        IFNULL(flight_rating,0)+
                        IFNULL(baggage_rating,0)+
                        IFNULL(room_rating,0)+
                        IFNULL(umrah_rating,0)
                    )/5
                ),
            1) averageRating
            FROM departure_feedback
        `);

        res.json({
            total: total.total,
            male: male.total,
            female: female.total,
            agencies: agency.total,
            today: today.total,
            averageRating: rating.averageRating || 0
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ======================================================
// Feedback List
// ======================================================

export const getAllFeedback = async (req, res) => {

    try {

        const {
            page = 1,
            limit = 10,
            search = "",
            gender = "",
            age = ""
        } = req.query;

        const offset = (page - 1) * limit;

        let sql = `
            SELECT
                id,
                full_name,
                cover_number,
                travel_agency,
                gender,
                age_group,
                created_at
            FROM pilgrim_submissions
            WHERE 1=1
        `;

        const params = [];

        if (search) {
            sql += `
                AND (
                    full_name LIKE ?
                    OR cover_number LIKE ?
                    OR travel_agency LIKE ?
                )
            `;

            params.push(
                `%${search}%`,
                `%${search}%`,
                `%${search}%`
            );
        }

        if (gender) {
            sql += " AND gender=?";
            params.push(gender);
        }

        if (age) {
            sql += " AND age_group=?";
            params.push(age);
        }

        sql += " ORDER BY created_at DESC";
        sql += " LIMIT ? OFFSET ?";

        params.push(Number(limit));
        params.push(Number(offset));

        const [rows] = await pool.query(sql, params);

        res.json(rows);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ======================================================
// Feedback Details
// ======================================================

export const getFeedbackDetails = async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] = await pool.query(

            `
            SELECT *

            FROM pilgrim_submissions p

            LEFT JOIN departure_feedback d
            ON p.id=d.submission_id

            LEFT JOIN mina_feedback m
            ON p.id=m.submission_id

            LEFT JOIN arafat_muzdalifah_feedback a
            ON p.id=a.submission_id

            LEFT JOIN dhul_hijjah_feedback h
            ON p.id=h.submission_id

            LEFT JOIN madinah_feedback md
            ON p.id=md.submission_id

            LEFT JOIN return_journey_feedback r
            ON p.id=r.submission_id

            LEFT JOIN health_general_feedback g
            ON p.id=g.submission_id

            WHERE p.id=?

            `,
            [id]

        );

        if (rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Feedback not found."
            });

        }

        res.json(rows[0]);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ======================================================
// Delete Feedback
// ======================================================

export const deleteFeedback = async (req, res) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const { id } = req.params;

        await connection.query("DELETE FROM departure_feedback WHERE submission_id=?", [id]);
        await connection.query("DELETE FROM mina_feedback WHERE submission_id=?", [id]);
        await connection.query("DELETE FROM arafat_muzdalifah_feedback WHERE submission_id=?", [id]);
        await connection.query("DELETE FROM dhul_hijjah_feedback WHERE submission_id=?", [id]);
        await connection.query("DELETE FROM madinah_feedback WHERE submission_id=?", [id]);
        await connection.query("DELETE FROM return_journey_feedback WHERE submission_id=?", [id]);
        await connection.query("DELETE FROM health_general_feedback WHERE submission_id=?", [id]);
        await connection.query("DELETE FROM pilgrim_submissions WHERE id=?", [id]);

        await connection.commit();

        res.json({
            success: true,
            message: "Feedback deleted successfully."
        });

    } catch (err) {

        await connection.rollback();

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    } finally {

        connection.release();

    }

};

// ======================================================
// Analytics
// ======================================================

export const getAnalytics = async (req, res) => {

    try {

        // Gender
        const [gender] = await pool.query(`
            SELECT
                gender,
                COUNT(*) AS total
            FROM pilgrim_submissions
            GROUP BY gender
        `);

        // Age
        const [age] = await pool.query(`
            SELECT
                age_group,
                COUNT(*) AS total
            FROM pilgrim_submissions
            GROUP BY age_group
            ORDER BY age_group
        `);

        // Education
        const [education] = await pool.query(`
            SELECT
                education,
                COUNT(*) AS total
            FROM pilgrim_submissions
            GROUP BY education
        `);

        // Top Agencies
        const [agency] = await pool.query(`
            SELECT
                travel_agency,
                COUNT(*) AS total
            FROM pilgrim_submissions
            GROUP BY travel_agency
            ORDER BY total DESC
            LIMIT 10
        `);

        // Daily Trend
        const [daily] = await pool.query(`
            SELECT
                DATE(created_at) AS date,
                COUNT(*) AS total
            FROM pilgrim_submissions
            GROUP BY DATE(created_at)
            ORDER BY DATE(created_at)
        `);

        // Summary
        const [[summary]] = await pool.query(`
            SELECT
                COUNT(*) AS totalFeedback,
                SUM(gender='Male') AS male,
                SUM(gender='Female') AS female,
                COUNT(DISTINCT travel_agency) AS agencies
            FROM pilgrim_submissions
        `);

        // Ratings
        const [[ratings]] = await pool.query(`
            SELECT
                ROUND(AVG(haj_bhavan_rating),1) AS hajBhavan,
                ROUND(AVG(flight_rating),1) AS flight,
                ROUND(AVG(baggage_rating),1) AS baggage,
                ROUND(AVG(room_rating),1) AS room,
                ROUND(AVG(umrah_rating),1) AS umrah
            FROM departure_feedback
        `);

        res.json({

            summary,

            ratings,

            gender,

            age,

            education,

            agency,

            daily

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};