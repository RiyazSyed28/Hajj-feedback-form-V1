import pool from "../config/db.js";

export const getAnalytics = async () => {

    // Gender Distribution
    const [gender] = await pool.query(`
        SELECT
            gender,
            COUNT(*) AS total
        FROM pilgrim_submissions
        GROUP BY gender
    `);

    // Age Group Distribution
    const [age] = await pool.query(`
        SELECT
            age_group,
            COUNT(*) AS total
        FROM pilgrim_submissions
        GROUP BY age_group
        ORDER BY age_group
    `);

    // Education Distribution
    const [education] = await pool.query(`
        SELECT
            education,
            COUNT(*) AS total
        FROM pilgrim_submissions
        GROUP BY education
    `);

    // Top Travel Agencies
    const [agency] = await pool.query(`
        SELECT
            travel_agency,
            COUNT(*) AS total
        FROM pilgrim_submissions
        GROUP BY travel_agency
        ORDER BY total DESC
        LIMIT 10
    `);

    // Daily Feedback Trend
    const [daily] = await pool.query(`
        SELECT
            DATE(created_at) AS date,
            COUNT(*) AS total
        FROM pilgrim_submissions
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
    `);

    // Overall Dashboard Summary
    const [summary] = await pool.query(`
        SELECT
            COUNT(*) AS totalFeedback,
            SUM(gender='Male') AS male,
            SUM(gender='Female') AS female,
            COUNT(DISTINCT travel_agency) AS agencies
        FROM pilgrim_submissions
    `);

    // Average Ratings
    const [ratings] = await pool.query(`
        SELECT
            ROUND(AVG(haj_bhavan_rating),1) AS hajBhavan,
            ROUND(AVG(flight_rating),1) AS flight,
            ROUND(AVG(baggage_rating),1) AS baggage,
            ROUND(AVG(room_rating),1) AS room,
            ROUND(AVG(umrah_rating),1) AS umrah
        FROM departure_feedback
    `);

    return {

        summary: summary[0],

        ratings: ratings[0],

        gender,

        age,

        education,

        agency,

        daily

    };

};