import ExcelJS from "exceljs";
import pool from "../config/db.js";
import PDFDocument from "pdfkit";

export const exportExcel = async (req, res) => {

    try {

        const [rows] = await pool.query(`
            SELECT

                p.id                     AS pilgrim_id,
                p.full_name,
                p.cover_number,
                p.travel_agency,
                p.education,
                p.age_group,
                p.gender,
                p.occupation,
                p.created_at             AS submitted_at,

                d.*,

                m.*,

                a.*,

                h.*,

                md.*,

                r.*,

                g.*

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

            ORDER BY p.created_at DESC
        `);

        const workbook = new ExcelJS.Workbook();

        workbook.creator = "Karnataka State Haj Committee";
        workbook.created = new Date();

        const sheet = workbook.addWorksheet("Hajj Feedback");

        if (rows.length === 0) {

            sheet.addRow(["No data available"]);

        } else {

            const headers = Object.keys(rows[0]);

            sheet.columns = headers.map(key => ({

                header: key
                    .replaceAll("_", " ")
                    .replace(/\b\w/g, c => c.toUpperCase()),

                key,

                width: 22

            }));

            rows.forEach(row => {

                const formatted = {};

                headers.forEach(key => {

                    formatted[key] =
                        row[key] === null ||
                        row[key] === undefined ||
                        row[key] === ""
                            ? "-"
                            : row[key];

                });

                sheet.addRow(formatted);

            });

            const header = sheet.getRow(1);

            header.font = {

                bold: true,
                color: { argb: "FFFFFFFF" },
                size: 12

            };

            header.fill = {

                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "0F4C81" }

            };

            header.alignment = {

                vertical: "middle",
                horizontal: "center"

            };

            header.height = 28;

            sheet.autoFilter = {
                from: "A1",
                to: `${sheet.getColumn(sheet.columnCount).letter}1`
            };

            sheet.views = [
                {
                    state: "frozen",
                    ySplit: 1
                }
            ];

            sheet.columns.forEach(column => {

                let max = column.header.length;

                column.eachCell(cell => {

                    const len = cell.value
                        ? cell.value.toString().length
                        : 0;

                    if (len > max)
                        max = len;

                });

                column.width = Math.min(max + 4, 40);

            });

        }

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=Hajj_Feedback_Report.xlsx"
        );

        await workbook.xlsx.write(res);

        res.end();

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

const EXPORT_SQL = `

SELECT

p.id                           AS pilgrim_id,
p.full_name,
p.cover_number,
p.travel_agency,
p.gender,
p.age_group,
p.education,
p.occupation,
p.created_at                   AS submitted_at,

d.haj_bhavan_rating,
d.flight_rating,
d.baggage_rating,
d.room_rating,
d.room_cleanliness_rating,
d.room_persons_count,
d.umrah_rating,
d.wudu_rating,

m.mina_travel_duration,
m.mina_travel_mode,
m.mina_on_time,
m.mina_tent_rating,
m.mina_toilet_rating,
m.food_access_rating,
m.mina_behaviour_rating,

a.arafat_transport,
a.arafat_crowd,
a.arafat_duration,
a.arafat_guide,
a.muzdalifah_transport,
a.muzdalifah_duration,

h.jamarat_crowd,
h.qurbani_completed,
h.halaq_duration,
h.ziarah_crowd,

md.madinah_rating,
md.riyazul_jannah,
md.nusuk_app,

r.jeddah_airport_rating,
r.india_immigration_rating,
r.india_customs_rating,

g.walking_helped,
g.health_experience_rating,
g.food_facility_rating,
g.group_cooperation_rating,
g.medical_facility_rating,
g.other_observation,
g.future_hajees_message

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

ORDER BY p.created_at DESC

`;


// ======================================================
// PDF EXPORT
// ======================================================

export const exportPDF = async (req, res) => {

    try {

        const [rows] = await pool.query(EXPORT_SQL);

        const doc = new PDFDocument({

            size: "A4",

            margin: 40,

            bufferPages: true

        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=Hajj_Feedback_Report.pdf"
        );

        doc.pipe(res);

        rows.forEach((row, index) => {

            // ======================
            // Header
            // ======================

            doc
                .fillColor("#0F4C81")
                .font("Helvetica-Bold")
                .fontSize(22)
                .text("KARNATAKA STATE HAJ COMMITTEE", {
                    align: "center"
                });

            doc.moveDown(0.3);

            doc
                .fontSize(16)
                .fillColor("black")
                .text("HAJJ FEEDBACK REPORT", {
                    align: "center"
                });

            doc.moveDown();

            doc
                .fontSize(12)
                .font("Helvetica-Bold")
                .text(`Pilgrim ${index + 1}`, {
                    underline: true
                });

            doc.moveDown();

            // ======================
            // Dynamic Fields
            // ======================

            Object.entries(row).forEach(([key, value]) => {

                if (
                    key === "submission_id" ||
                    key === "id"
                )
                    return;

                const title = labels[key] || key;

                doc
                    .font("Helvetica-Bold")
                    .fontSize(10)
                    .fillColor("#0F4C81")
                    .text(title + " :", {
                        continued: true,
                        width: 220
                    });

                doc
                    .font("Helvetica")
                    .fillColor("black")
                    .text(
                        value === null ||
                        value === undefined ||
                        value === ""
                            ? "-"
                            : value.toString()
                    );

            });

            // ======================
            // Footer
            // ======================

            doc.moveDown();

            doc
                .fontSize(9)
                .fillColor("gray")
                .text(

                    `Generated on ${new Date().toLocaleString()}`,

                    {

                        align: "right"

                    }

                );

            // ======================
            // Next Page
            // ======================

            if (index !== rows.length - 1) {

                doc.addPage();

            }

        });

        // ======================
        // Page Numbers
        // ======================

        const pages = doc.bufferedPageRange();

        for (let i = 0; i < pages.count; i++) {

            doc.switchToPage(i);

            doc.fontSize(9);

            doc.fillColor("gray");

            doc.text(

                `Page ${i + 1} of ${pages.count}`,

                0,

                doc.page.height - 40,

                {

                    align: "center"

                }

            );

        }

        doc.end();

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};