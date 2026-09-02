import { getFeedbackDetails } from "../models/feedbackDetailsModel.js";

export const feedbackDetails = async (req, res) => {

    try {

        const data = await getFeedbackDetails(req.params.id);

        if (!data) {

            return res.status(404).json({

                message: "Feedback not found"

            });

        }

        res.json(data);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            message: err.message

        });

    }

};