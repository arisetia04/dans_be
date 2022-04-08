const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { getService } = require("../../middleware/axios");
const { sequelize } = require("../../models");
const db = require("../../models");

const User = db.user;

exports.jobs = async (req, res, next) => {
    try {
        const { description, location, full_time, page } = req.query;

        const jobs = await getService("/positions.json", {
            description,
            location,
            full_time,
            page
        });

        res.send({
            status: true,
            data: jobs
        });
    } catch (err) {
        next(err);
    }
};

exports.job = async (req, res, next) => {
    try {
        const { id } = req.params;

        const job = await getService(`/positions/${id}`);

        res.send({
            status: true,
            data: job
        });
    } catch (err) {
        next(err);
    }
};
