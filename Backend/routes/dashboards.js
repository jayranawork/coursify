const { Router } = require("express");
const { instructorController, adminController } = require("../controllers");
const { requireAuth, requireRole } = require("../middlewares/auth");

const router = Router();

router.get("/instructor/courses", requireAuth, requireRole("instructor", "admin"), instructorController.courses);
router.get("/instructor/stats", requireAuth, requireRole("instructor", "admin"), instructorController.stats);

router.get("/admin/stats", requireAuth, requireRole("admin"), adminController.stats);
router.get("/admin/users", requireAuth, requireRole("admin"), adminController.users);
router.get("/admin/courses", requireAuth, requireRole("admin"), adminController.courses);

module.exports = router;
