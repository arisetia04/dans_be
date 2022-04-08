const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
var createError = require("http-errors");
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function checkToken(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        let token = req.headers["x-access-token"];

        if (!token) next(createError(403, "Forbidden"));

        let DetailToken = jwt.verify(
            token,
            process.env.JWT_SECRET,
            function (err, result) {
                if (err) {
                    return false;
                } else {
                    return result;
                }
            }
        );

        if (!DetailToken) next(createError(403, "invalid token"));

        console.log("token > ", DetailToken);

        // req.DetailToken = DetailToken;
        // next();
    }
}

module.exports = {
    checkToken
};
