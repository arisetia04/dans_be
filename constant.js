const dotenv = require("dotenv");

dotenv.config();

// ENV
if (!process.env.ENV) process.exit();
const ENV = process.env.ENV;

// PORT
const PORT = process.env.PORT;

exports = {
    ENV,
    PORT
};
