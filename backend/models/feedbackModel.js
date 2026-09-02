import pool from "../config/db.js";

const safe = (value) => value ?? null;
/* =====================================================
   1. PILGRIM SUBMISSION
===================================================== */

export const insertPilgrim = async (conn, data) => {

    // Automatically capture current month and year
    const monthYear = new Date().toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
    });

    const [result] = await conn.execute(
        `
        INSERT INTO pilgrim_submissions
        (
            full_name,
            cover_number,
            travel_agency,
            education,
            age_group,
            gender,
            occupation,
            month_year
        )
        VALUES
        (
            ?,?,?,?,?,?,?,?
        )
        `,
        [
            safe(data.fullName),
            safe(data.coverNumber),
            safe(data.travelAgency),
            safe(data.education),
            safe(data.ageGroup),
            safe(data.gender),
            safe(data.occupation),
            monthYear
        ]
    );

    return result.insertId;
};



/* =====================================================
   2. DEPARTURE FEEDBACK
===================================================== */

export const insertDeparture = async (
    conn,
    submissionId,
    data
) => {

    await conn.execute(

        `
        INSERT INTO departure_feedback
        (

            submission_id,

            haj_bhavan_rating,
            haj_bhavan_remark,

            flight_rating,
            flight_delay,
            flight_remark,

            baggage_rating,
            baggage_waiting_time,
            baggage_remark,

            room_rating,
            room_persons_count,
            room_cleanliness_rating,
            room_remark,

            umrah_rating,
            umrah_crowd_level,
            umrah_remark,

            wudu_used,
            wudu_rating,
            wudu_remark

        )

       VALUES
(
    ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
)
        `,

        [

            submissionId,

            safe(data.bhavanRating),
            safe(data.bhavanRemarks),

            safe(data.flightRating),
            safe(data.flightDelay),
            safe(data.flightRemarks),

            safe(data.baggageRating),
            safe(data.waitingTime),
            safe(data.baggageRemarks),

            safe(data.aziziyahAccommodation),
            safe(data.personsPerRoom),
            safe(data.roomCleanliness),
            safe(data.roomRemarks),

            safe(data.umrahRating),
            safe(data.crowdLevel),
            safe(data.umrahRemarks),

            safe(data.gate40Wudu),
            safe(data.wuduRating),
            safe(data.wuduRemarks)

        ]

    );

};

/* =====================================================
   3. MINA FEEDBACK
===================================================== */

export const insertMina = async (
    conn,
    submissionId,
    data
) => {

    await conn.execute(

        `
        INSERT INTO mina_feedback
        (

            submission_id,

            mina_travel_duration,
            mina_on_time,
            mina_travel_mode,
            mina_journey_remark,

            mina_tent_rating,
            mina_tent_remark,

            mina_toilet_rating,
            mina_guide,
            mina_toilet_remark,

            food_access_rating,
            food_waiting_time,
            food_access_remark,

            mina_behaviour_rating,
            mina_behaviour_remark

        )

        VALUES
        (
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
        )
        `,

        [

            submissionId,

            safe(data.minaJourneyDuration),

            safe(data.minaOnTime),

            safe(data.minaTravelMode),

            safe(data.minaJourneyRemarks),

            safe(data.minaTentAccommodation),

            safe(data.minaTentRemarks),

            safe(data.minaToiletRating),

            data.minaGuideAvailable
                ? (data.minaGuideAvailable === "Yes"
                    ? "Available"
                    : "Not Available")
                : null,

            safe(data.minaToiletRemarks),

            safe(data.minaFoodRating),

            safe(data.minaFoodWaiting),

            safe(data.minaFoodRemarks),

            safe(data.minaBehaviour),

            safe(data.minaBehaviourRemarks)

        ]

    );

};



/* =====================================================
   4. ARAFAT & MUZDALIFAH FEEDBACK
===================================================== */

export const insertArafat = async (
    conn,
    submissionId,
    data
) => {

    await conn.execute(
        `
        INSERT INTO arafat_muzdalifah_feedback
        (
            submission_id,

            arafat_transport,
            arafat_crowd,
            arafat_duration,
            arafat_guide,
            arafat_remark,

            arafat_stay_transport,
            arafat_stay_duration,
            arafat_stay_remarks,

            muzdalifah_transport,
            muzdalifah_duration,
            muzdalifah_journey_remark,

            arrival_time,
            stay_transport,
            space_availability,
            stay_remark
        )

        VALUES
        (
            ?,?,?,?,?,?,
            ?,?,?,
            ?,?,
            ?,
            ?,?,?,
            ?
        )
        `,

        [
            submissionId,

            // Journey to Arafat
            safe(data.arafatTransport),
            safe(data.arafatCrowd),
            safe(data.arafatDuration),
            safe(data.arafatGuide),
            safe(data.arafatRemarks),

            // Stay at Arafat
            safe(data.arafatStayTransport),
            safe(data.arafatStayDuration),
            safe(data.arafatStayRemarks),

            // Arafat to Muzdalifah
            safe(data.muzdalifahTransport),
            safe(data.muzdalifahDuration),
            safe(data.muzdalifahJourneyRemarks),

            // Stay at Muzdalifah
            safe(data.arrivalTime),
            safe(data.stayTransport),
            safe(data.spaceAvailability),
            safe(data.stayRemarks)
        ]
    );
};

/* =====================================================
   5. DHUL HIJJAH FEEDBACK
===================================================== */

export const insertDhulHijjah = async (
    conn,
    submissionId,
    data
) => {

    await conn.execute(

        `
        INSERT INTO dhul_hijjah_feedback
        (

            submission_id,

            tawaf_rating,
            tawaf_crowd,
            tawaf_remark,

            halaq_rating,
            halaq_duration,
            halaq_remark,

            jamarat_rating,
            jamarat_crowd,
            jamarat_remark,

            qurbani_rating,
            qurbani_completed,
            qurbani_remark

        )

        VALUES
        (
            ?,?,?,?,?,?,?,?,?,?,?,?,?
        )
        `,

        [

            submissionId,

            safe(data.tawafRating),
            safe(data.tawafCrowd),
            safe(data.tawafRemarks),

            safe(data.HalaqRating),
            safe(data.HalaqDuration),
            safe(data.HalaqRemarks),

            safe(data.jamaratRating),
            safe(data.JamaratCrowd),
            safe(data.jamaratRemarks),

            safe(data.qurbaniRating),
            safe(data.qurbaniCompleted),
            safe(data.qurbaniRemarks)

        ]

    );

};



/* =====================================================
   6. MADINAH FEEDBACK
===================================================== */

export const insertMadinah = async (
    conn,
    submissionId,
    data
) => {

    await conn.execute(

        `
        INSERT INTO madinah_feedback
        (

            submission_id,

            madinah_rating,

            riyazul_jannah,

            nusuk_app,

            madinah_remark

        )

        VALUES
        (
            ?,?,?,?,?
        )
        `,

        [

            submissionId,

            safe(data.madinahRating),

            safe(data.riyazulJannah),

            safe(data.nusukApp),

            safe(data.madinahRemarks)

        ]

    );

};

/* =====================================================
   7. RETURN JOURNEY FEEDBACK
===================================================== */

export const insertReturnJourney = async (
    conn,
    submissionId,
    data
) => {

    await conn.execute(

        `
        INSERT INTO return_journey_feedback
        (

            submission_id,

            jeddah_airport_rating,
            jeddah_airport_remark,

            immigration_rating,
            immigration_remark,

            customs_rating,
            customs_remark

        )

        VALUES
        (
            ?,?,?,?,?,?,?
        )
        `,

        [

            submissionId,

            safe(data.jeddahAirport),
            null,

            safe(data.immigration),
            null,

            safe(data.customs),
            null

        ]

    );

};


/* =====================================================
   8. HEALTH + GENERAL FEEDBACK
===================================================== */

export const insertHealthGeneral = async (
    conn,
    submissionId,
    data
) => {

    await conn.execute(
        `
        INSERT INTO health_general_feedback
        (
            submission_id,

            walking_practice,

            health_rating,
            health_remark,

            food_rating,
            food_remark,

            group_cooperation_rating,
            group_cooperation_remark,

            medical_rating,
            medical_remark,

            other_observation,
            future_message
        )

        VALUES
        (
            ?,?,?,?,?,?,?,?,?,?,?,?
        )
        `,
        [
            submissionId,

            safe(data.walkingPractice),

            safe(data.healthExperience),
            safe(data.healthRemarks),

            safe(data.foodFacility),
            safe(data.foodRemarks),

            safe(data.groupCooperation),
            safe(data.groupRemarks),

            safe(data.medicalFacility),
            safe(data.medicalRemarks),

            safe(data.otherObservation),
            safe(data.futureMessage)
        ]
    );
};