const { Router } = require("express");
const validate = require("../middlewares/validate");
const { authController } = require("../controllers");
const { authRegisterSchema, authLoginSchema, authRefreshSchema } = require("../validators");

const router = Router();

router.post("/register", validate(authRegisterSchema), authController.register);
router.post("/login", validate(authLoginSchema), authController.login);
router.post("/refresh", validate(authRefreshSchema), authController.refresh);
router.post("/logout", validate(authRefreshSchema), authController.logout);

module.exports = router;
