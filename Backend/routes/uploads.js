const { Router, raw } = require("express");
const validate = require("../middlewares/validate");
const { requireAuth } = require("../middlewares/auth");
const { uploadController } = require("../controllers");
const { uploadImageSchema, uploadPublicImageSchema, uploadLessonFileSchema } = require("../validators");

const router = Router();

router.post("/image", requireAuth, validate(uploadImageSchema), uploadController.image);
router.post("/public-image", validate(uploadPublicImageSchema), uploadController.publicImage);
router.post("/lesson-file", requireAuth, validate(uploadLessonFileSchema), uploadController.lessonFile);
router.post("/local-video", requireAuth, uploadController.localVideoStart);
router.get("/local-video/:uploadId", requireAuth, uploadController.localVideoStatus);
router.patch("/local-video/:uploadId/chunk", requireAuth, raw({ type: "application/octet-stream", limit: "8mb" }), uploadController.localVideoChunk);
router.post("/local-video/:uploadId/complete", requireAuth, uploadController.localVideoComplete);
router.delete("/local-video/:uploadId", requireAuth, uploadController.localVideoCancel);

module.exports = router;
