const express = require("express");
const router = express.Router();
const job = require("./controller.job");

router.get("/:id", job.job);
router.get("/", job.jobs);

module.exports = router
