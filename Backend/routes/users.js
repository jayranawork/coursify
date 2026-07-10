const { Router } = require("express");
const { userController } = require("../controllers");
const validate = require("../middlewares/validate");
const { requireAuth, requireRole } = require("../middlewares/auth");
const { userUpdateSchema, userStatusSchema } = require("../validators");

const router = Router();

router.get("/me", requireAuth, userController.me);
router.put("/me", requireAuth, validate(userUpdateSchema), userController.updateMe);
router.get("/", requireAuth, requireRole("admin"), userController.list);
router.get("/:id", requireAuth, requireRole("admin"), userController.getById);
router.patch("/:id/status", requireAuth, requireRole("admin"), validate(userStatusSchema), userController.updateStatus);

module.exports = router;
