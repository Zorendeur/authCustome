const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const middleware = require("../middleware");

router.get('/getToken', controller.getToken);
router.post("/login",  controller.login);
router.post('/register', controller.register);
router.delete('/deleteAccount', controller.deleteAccount);
router.post('/logout', controller.logout);

module.exports = router;
