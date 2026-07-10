const { Router } = require("express");
const { enrollmentController } = require("../controllers");
const validate = require("../middlewares/validate");
const { requireAuth, requireRole } = require("../middlewares/auth");
const { enrollmentSchema, progressSchema } = require("../validators");

const router = Router();

router.post("/", requireAuth, requireRole("student"), validate(enrollmentSchema), enrollmentController.create);
router.get("/me", requireAuth, requireRole("student"), enrollmentController.me);
router.patch("/progress", requireAuth, requireRole("student"), validate(progressSchema), enrollmentController.progress);

module.exports = router;
