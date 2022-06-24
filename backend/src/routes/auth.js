const auth = require("../controllers/auth");
const router = require("express").Router();

router.post("/signup", auth.signup);
router.post("/verifyotp", auth.verifyOTP);
module.exports = router;
