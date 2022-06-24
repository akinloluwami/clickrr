const auth = require("../controllers/auth");
const router = express.Router();

router.post("/signup", auth.signup);
