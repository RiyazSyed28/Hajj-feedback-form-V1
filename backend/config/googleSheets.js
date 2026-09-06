
import { google } from "googleapis";

const credentialsString =
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

if (!credentialsString) {
    console.warn(
        "WARNING: GOOGLE_SERVICE_ACCOUNT_JSON is not configured."
    );
}

let credentials = null;

if (credentialsString) {
    try {
        credentials = JSON.parse(credentialsString);
    } catch (error) {
        console.error(
            "Invalid GOOGLE_SERVICE_ACCOUNT_JSON:",
            error.message
        );
    }
}

const auth = credentials
    ? new google.auth.GoogleAuth({
          credentials,
          scopes: [
              "https://www.googleapis.com/auth/spreadsheets",
          ],
      })
    : null;

export const sheets = auth
    ? google.sheets({
          version: "v4",
          auth,
      })
    : null;

