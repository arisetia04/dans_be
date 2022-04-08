const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../../models");
const db = require("../../models/");

const User = db.user;

exports.userSignIn = async (req, res, next) => {
    try {
        console.log("my body ", req.body);
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });

        if (!user) next(createError(404, "User not found"));

        if (password != user.password)
            next(createError(404, "Invalid password"));

        let token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                time: new Date().toUTCString()
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.send({
            status: true,
            data: {
                id: user.id,
                username: user.username,
                token
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.userSignUp = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        console.log("my body ", req.body);

        const { name, username, password } = req.body;

        if (!name) throw new Error("name is required");
        if (!username) throw new Error("username is required");
        if (!password) throw new Error("password is required");

        const user = await User.create(
            { name, username, password },
            { transaction }
        );

        await transaction.commit();
        res.send({
            status: true,
            data: user
        });
    } catch (err) {
        if (transaction) await transaction.rollback();
        next(err);
    }
};

exports.users = async (req, res, next) => {
    try {
        const user = await User.findAll();

        res.send({
            status: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};
