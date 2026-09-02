import {
    dashboardStats
} from "../models/dashboardModel.js";

export const getDashboard = async (req, res) => {

    try {

        const stats = await dashboardStats();

        res.json(stats);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};