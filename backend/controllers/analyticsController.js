import { getAnalytics as analyticsModel } from "../models/analyticsModel.js";

export const analytics = async (req, res) => {

    try {

        const data = await analyticsModel();

        res.json(data);

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};