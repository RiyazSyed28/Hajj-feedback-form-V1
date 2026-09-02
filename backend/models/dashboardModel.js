import pool from "../config/db.js";

export const dashboardStats = async () => {

    const [total] = await pool.query(
        "SELECT COUNT(*) AS total FROM pilgrim_submissions"
    );

    const [male] = await pool.query(
        "SELECT COUNT(*) AS total FROM pilgrim_submissions WHERE gender='Male'"
    );

    const [female] = await pool.query(
        "SELECT COUNT(*) AS total FROM pilgrim_submissions WHERE gender='Female'"
    );

    const [agency] = await pool.query(
        "SELECT COUNT(DISTINCT travel_agency) AS total FROM pilgrim_submissions"
    );

    const [today] = await pool.query(`
SELECT COUNT(*) AS total
FROM pilgrim_submissions
WHERE DATE(created_at) = CURDATE()
`);

    const [rating] = await pool.query(`
        SELECT
        ROUND(
            AVG(
                (
                    IFNULL(haj_bhavan_rating,0) +
                    IFNULL(flight_rating,0) +
                    IFNULL(baggage_rating,0) +
                    IFNULL(room_rating,0) +
                    IFNULL(umrah_rating,0)
                ) / 5
            ),
            1
        ) AS averageRating
        FROM departure_feedback
    `);

    return {

        total: total[0].total,
        male: male[0].total,
        female: female[0].total,
        agencies: agency[0].total,
        today: today[0].total,
        averageRating: rating[0].averageRating || 0

    };

};