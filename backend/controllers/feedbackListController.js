import { getAllFeedback } from "../models/feedbackListModel.js";

export const fetchFeedback = async (req, res) => {

    try {

        const feedback = await getAllFeedback();

        res.json(feedback);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};