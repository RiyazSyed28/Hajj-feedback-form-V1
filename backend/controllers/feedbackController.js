import pool from "../config/db.js";
import { appendFeedback } from "../utils/googleSheetSync.js";

import {

    insertPilgrim,
    insertDeparture,
    insertMina,
    insertArafat,
    insertDhulHijjah,
    insertMadinah,
    insertReturnJourney,
    insertHealthGeneral

} from "../models/feedbackModel.js";



export const submitFeedback = async (req, res) => {

    const data = req.body;

    let connection;

    try {

        connection = await pool.getConnection();

        await connection.beginTransaction();



        /* ============================
           1. Pilgrim Details
        ============================ */

        const submissionId = await insertPilgrim(

            connection,

            data

        );



        /* ============================
           2. Departure
        ============================ */

        await insertDeparture(

            connection,

            submissionId,

            data

        );



        /* ============================
           3. Mina
        ============================ */

        await insertMina(

            connection,

            submissionId,

            data

        );



        /* ============================
           4. Arafat
        ============================ */

        await insertArafat(

            connection,

            submissionId,

            data

        );



        /* ============================
           5. Dhul Hijjah
        ============================ */

        await insertDhulHijjah(

            connection,

            submissionId,

            data

        );



        /* ============================
           6. Madinah
        ============================ */

        await insertMadinah(

            connection,

            submissionId,

            data

        );



        /* ============================
           7. Return Journey
        ============================ */

        await insertReturnJourney(

            connection,

            submissionId,

            data

        );



        /* ============================
           8. Health + General
        ============================ */

        await insertHealthGeneral(

            connection,

            submissionId,

            data

        );



        /* ============================
           Commit Transaction
        ============================ */

        await connection.commit();
        

        await appendFeedback(data);




        res.status(201).json({

            success: true,

            message: "Feedback submitted successfully.",

            submissionId

        });

    }

    catch (error) {

        if (connection) {
            await connection.rollback();
        }

        console.error("========== DATABASE ERROR ==========");
        console.error(error);
        console.error("Message:", error.message);
        console.error("Code:", error.code);
        console.error("SQL:", error.sql);
        console.error("====================================");

        res.status(500).json({
            success: false,
            message: error.message
        });

    }



    finally {

        if (connection) {

            connection.release();

        }

    }



};