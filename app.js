const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const packageJson = require("./package.json");
// const sequelize = require("./config/sequelize");
const app = express();
dotenv.config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token"
    );
    next();
});

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Test Dans API by Ari Setiawan",
        version: packageJson.version,
        running: process.env.PORT
    });
});

// router handle
const authRoutes = require("./app/auth/router.user");
const jobRoutes = require("./app/job/router.job");
const db = require("./models");

app.use("/auth", authRoutes);
app.use("/job", jobRoutes);

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send({
        code: err.code,
        errors: [{ message: err.message }]
    });
});

// console.log("sequelize > ", sequelize);
const server = async () => {
    await db.sequelize.authenticate();

    http.createServer(app);

    app.listen(process.env.PORT, () =>
        console.log(`good job work in port ${process.env.PORT}`)
    );
};

server();
