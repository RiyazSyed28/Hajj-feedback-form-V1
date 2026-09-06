
import pool from "../config/db.js";

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

import {
    appendFeedback
} from "../utils/googleSheetSync.js";


export const submitFeedback = async (
    req,
    res
) => {

    const data = req.body;

    let connection = null;

    try {

        console.log(
            "===================================="
        );

        console.log(
            "New feedback submission received"
        );

        console.log(
            "===================================="
        );


        /*
        |--------------------------------------------------------------------------
        | Database connection
        |--------------------------------------------------------------------------
        */

        connection =
            await pool.getConnection();


        await connection.beginTransaction();


        /*
        |--------------------------------------------------------------------------
        | 1. Pilgrim
        |--------------------------------------------------------------------------
        */

        const submissionId =
            await insertPilgrim(
                connection,
                data
            );


        console.log(
            "Pilgrim inserted:",
            submissionId
        );


        /*
        |--------------------------------------------------------------------------
        | 2. Departure
        |--------------------------------------------------------------------------
        */

        await insertDeparture(
            connection,
            submissionId,
            data
        );


        /*
        |--------------------------------------------------------------------------
        | 3. Mina
        |--------------------------------------------------------------------------
        */

        await insertMina(
            connection,
            submissionId,
            data
        );


        /*
        |--------------------------------------------------------------------------
        | 4. Arafat
        |--------------------------------------------------------------------------
        */

        await insertArafat(
            connection,
            submissionId,
            data
        );


        /*
        |--------------------------------------------------------------------------
        | 5. Dhul Hijjah
        |--------------------------------------------------------------------------
        */

        await insertDhulHijjah(
            connection,
            submissionId,
            data
        );


        /*
        |--------------------------------------------------------------------------
        | 6. Madinah
        |--------------------------------------------------------------------------
        */

        await insertMadinah(
            connection,
            submissionId,
            data
        );


        /*
        |--------------------------------------------------------------------------
        | 7. Return Journey
        |--------------------------------------------------------------------------
        */

        await insertReturnJourney(
            connection,
            submissionId,
            data
        );


        /*
        |--------------------------------------------------------------------------
        | 8. Health + General
        |--------------------------------------------------------------------------
        */

        await insertHealthGeneral(
            connection,
            submissionId,
            data
        );


        /*
        |--------------------------------------------------------------------------
        | COMMIT DATABASE
        |--------------------------------------------------------------------------
        */

        await connection.commit();


        console.log(
            "Database transaction committed successfully."
        );

        console.log(
            "Submission ID:",
            submissionId
        );


        /*
        |--------------------------------------------------------------------------
        | Release database connection
        |--------------------------------------------------------------------------
        */

        connection.release();

        connection = null;


        /*
        |--------------------------------------------------------------------------
        | SEND SUCCESS RESPONSE
        |--------------------------------------------------------------------------
        |
        | IMPORTANT:
        |
        | The frontend receives 201 immediately.
        |
        | Google Sheets cannot change this response to 500.
        |
        */

        res.status(201).json({

            success: true,

            message:
                "Feedback submitted successfully.",

            submissionId

        });


        /*
        |--------------------------------------------------------------------------
        | GOOGLE SHEETS SYNC
        |--------------------------------------------------------------------------
        |
        | This happens AFTER the database submission succeeded.
        |
        */

        try {

            await appendFeedback(
                data
            );


            console.log(
                "Google Sheets sync completed successfully."
            );

        } catch (sheetError) {

            console.error(
                "===================================="
            );

            console.error(
                "GOOGLE SHEETS SYNC FAILED"
            );

            console.error(
                "Message:",
                sheetError.message
            );

            console.error(
                sheetError
            );

            console.error(
                "===================================="
            );

        }

    } catch (error) {

        /*
        |--------------------------------------------------------------------------
        | Rollback database
        |--------------------------------------------------------------------------
        */

        if (connection) {

            try {

                await connection.rollback();

            } catch (rollbackError) {

                console.error(
                    "Rollback failed:",
                    rollbackError
                );

            }

        }


        /*
        |--------------------------------------------------------------------------
        | Log actual database error
        |--------------------------------------------------------------------------
        */

        console.error(
            "===================================="
        );

        console.error(
            "DATABASE SUBMISSION FAILED"
        );

        console.error(
            "Message:",
            error.message
        );

        console.error(
            "Code:",
            error.code
        );

        console.error(
            "SQL:",
            error.sql
        );

        console.error(
            "Full Error:",
            error
        );

        console.error(
            "===================================="
        );


        /*
        |--------------------------------------------------------------------------
        | Return 500
        |--------------------------------------------------------------------------
        */

        if (!res.headersSent) {

            res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to submit feedback."

            });

        }

    } finally {

        if (connection) {

            connection.release();

        }

    }

};

