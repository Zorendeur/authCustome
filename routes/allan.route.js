const express = require("express");
const router = express.Router();
const controller = require("../controllers/allan.controller");
const middleware = require("../middleware");

router.get("/bonjour", middleware.two, controller.bonjour);
router.get("/aurevoir", controller.aurevoir);

module.exports = router;
