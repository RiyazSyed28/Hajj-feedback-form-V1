import { sheets } from "../config/googleSheets.js";

const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const sheetName = "Sheet1";

export async function appendFeedback(data) {

    // --------------------------------------------------
    // 1. Read existing Google Sheet
    // --------------------------------------------------

    const response = await sheets.spreadsheets.values.get({

        spreadsheetId,

        range: `${sheetName}!A:ZZ`,

    });

    const rows = response.data.values || [];

    let headers = rows[0] || [];


    // --------------------------------------------------
    // 2. Create headers if sheet is empty
    // --------------------------------------------------

    if (headers.length === 0) {

        headers = Object.keys(data);

        await sheets.spreadsheets.values.update({

            spreadsheetId,

            range: `${sheetName}!1:1`,

            valueInputOption: "RAW",

            requestBody: {

                values: [headers],

            },

        });

    }


    // --------------------------------------------------
    // 3. Add new columns automatically
    // --------------------------------------------------

    const newFields = Object.keys(data).filter(

        (key) => !headers.includes(key)

    );


    if (newFields.length > 0) {

        headers = [...headers, ...newFields];

        await sheets.spreadsheets.values.update({

            spreadsheetId,

            range: `${sheetName}!1:1`,

            valueInputOption: "RAW",

            requestBody: {

                values: [headers],

            },

        });

    }


    // --------------------------------------------------
    // 4. Create row according to header order
    // --------------------------------------------------

    const newRow = headers.map(

        (header) => data[header] ?? ""

    );


    // --------------------------------------------------
    // 5. Find Cover Number column
    // --------------------------------------------------

    const coverIndex = headers.indexOf("coverNumber");

    let existingRowIndex = -1;


    // --------------------------------------------------
    // 6. ONLY Cover Number can trigger an update
    // --------------------------------------------------

    if (

        coverIndex !== -1 &&

        data.identifierType === "coverNumber" &&

        data.coverNumber

    ) {

        const submittedCoverNumber =

            String(data.coverNumber)

                .trim()

                .toLowerCase();


        for (let i = 1; i < rows.length; i++) {

            const existingCoverNumber =

                String(rows[i][coverIndex] || "")

                    .trim()

                    .toLowerCase();


            if (

                existingCoverNumber ===

                submittedCoverNumber

            ) {

                existingRowIndex = i + 1;

                break;

            }

        }

    }


    // --------------------------------------------------
    // 7. Update existing Cover Number entry
    // --------------------------------------------------

    if (existingRowIndex !== -1) {

        await sheets.spreadsheets.values.update({

            spreadsheetId,

            range:
                `${sheetName}!A${existingRowIndex}:ZZ${existingRowIndex}`,

            valueInputOption: "USER_ENTERED",

            requestBody: {

                values: [newRow],

            },

        });


        console.log(

            `Google Sheet row ${existingRowIndex} updated.`

        );


        return {

            updated: true,

            created: false,

            row: existingRowIndex,

        };

    }


    // --------------------------------------------------
    // 8. Travel Agency OR new Cover Number
    //    ALWAYS creates a new row
    // --------------------------------------------------

    await sheets.spreadsheets.values.append({

        spreadsheetId,

        range: `${sheetName}!A:ZZ`,

        valueInputOption: "USER_ENTERED",

        requestBody: {

            values: [newRow],

        },

    });


    console.log(

        "New Google Sheet row appended."

    );


    return {

        updated: false,

        created: true,

    };

}