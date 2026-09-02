import pool from "../config/db.js";

export const getAllFeedback = async () => {

    const [rows] = await pool.query(`
        SELECT
            id,
            full_name,
            cover_number,
            travel_agency,
            gender,
            age_group,
            education,
            occupation,
            created_at
        FROM pilgrim_submissions
        ORDER BY created_at DESC
    `);

    return rows;
};