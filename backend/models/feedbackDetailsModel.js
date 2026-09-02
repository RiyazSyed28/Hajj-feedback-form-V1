import pool from "../config/db.js";

export const getFeedbackDetails = async (id) => {

    const [rows] = await pool.query(

        `
        SELECT *

        FROM pilgrim_submissions p

        LEFT JOIN departure_feedback d
        ON p.id = d.submission_id

        LEFT JOIN mina_feedback m
        ON p.id = m.submission_id

        LEFT JOIN arafat_muzdalifah_feedback a
        ON p.id = a.submission_id

        LEFT JOIN dhul_hijjah_feedback h
        ON p.id = h.submission_id

        LEFT JOIN madinah_feedback md
        ON p.id = md.submission_id

        LEFT JOIN return_journey_feedback r
        ON p.id = r.submission_id

        LEFT JOIN health_general_feedback g
        ON p.id = g.submission_id

        WHERE p.id = ?

        `,
        [id]
    );

    return rows[0];

};