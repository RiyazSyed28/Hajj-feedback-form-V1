import pool from "../config/db.js";

export const findAdmin = async (username) => {
    const [rows] = await pool.query(
        "SELECT * FROM admins WHERE username = ?",
        [username]
    );
    return rows[0];
};

export const getAdminById = async (id) => {
    const [rows] = await pool.query(
        `
        SELECT
            id,
            username,
            email,
            role,
            created_at
        FROM admins
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};

export const updateAdminProfile = async (
    id,
    username,
    email
) => {

    await pool.query(
        `
        UPDATE admins
        SET
            username = ?,
            email = ?
        WHERE id = ?
        `,
        [username, email, id]
    );

};

export const updateAdminPassword = async (id, password) => {

    await pool.query(
        `
        UPDATE admins
        SET password = ?
        WHERE id = ?
        `,
        [password, id]
    );

};