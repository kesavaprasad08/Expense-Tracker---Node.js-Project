const router = require("express").Router();
const passwordController = require('../controllers/passwordController')

router.get('/',passwordController.getForgotPasswordPage);
router.post('/forgot-password',passwordController.forgotPassword);

module.exports=router;