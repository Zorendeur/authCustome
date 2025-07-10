const express = require("express");
const router = express.Router();
const auth = require("./auth.route");
const allan = require("./allan.route");
const articles = require("./articles.route");
const middleware = require("../middleware");

router.use("/auth", auth);
router.use("/allan", middleware.one, middleware.three, allan);
router.use("/articles", middleware.protect, articles)

module.exports = router;
