const router = require("express").Router();

const auth = require("../controller/auth-controller");

router.post("/signup", auth.signup);
router.post("/login", auth.login);

module.exports = router;
