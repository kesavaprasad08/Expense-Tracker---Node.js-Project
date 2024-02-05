const router = require("express").Router();

// const authentication = require("../middleware/authentication");
const userAuthentication = require('../middleware/auth');
// const premiumController = require("../controller/premium.controller");
const premiumController = require('../controllers/premiumController');

router.get(
  "/leaderBoard",
  userAuthentication.authenticate,
 premiumController.showLeaderBoard
);

module.exports = router;