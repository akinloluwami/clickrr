const auth = require("../controllers/auth");
const router = require("express").Router();

router.post("/signup", auth.signup);

module.exports = router;
