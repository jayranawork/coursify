const ApiError = require("../utils/apiError");
const { recordAudit } = require("../utils/audit");
const { uploadImage: cloudinaryUploadImage } = require("../utils/cloudinary");
const {
  buildObjectKey,
  createPresignedPutUrl,
  validateFileUpload,
} = require("../utils/s3");
const localVideoUpload = require("../utils/localVideoUpload");

const ALLOWED_FOLDERS = {
  avatars: ["student", "instructor", "admin"],
  courseThumbnails: ["instructor", "admin"],
  lessonVideos: ["instructor", "admin"],
  lessonPdfs: ["instructor", "admin"],
  notes: ["instructor", "admin"],
};

const normalizeFolder = (folder) => {
  if (!folder) return "avatars";
  const value = String(folder).trim();
  if (!Object.prototype.hasOwnProperty.call(ALLOWED_FOLDERS, value)) {
    throw new ApiError(400, "Invalid upload folder");
  }
  return value;
};

const assertFolderPermission = (actor, folder) => {
  const allowedRoles = ALLOWED_FOLDERS[folder] || [];
  if (!allowedRoles.includes(actor?.role)) {
    throw new ApiError(403, "You do not have permission to upload to this folder");
  }
};

const uploadService = {
  async uploadImage(actor, payload, request) {
    const folder = normalizeFolder(payload.folder);
    assertFolderPermission(actor, folder);

    const result = await cloudinaryUploadImage({
      dataUrl: payload.dataUrl,
      folder,
      publicId: payload.publicId || undefined,
    });

    await recordAudit({
      actor,
      action: "upload.image_completed",
      resourceType: "upload",
      resourceId: result.publicId || result.url,
      metadata: { folder, provider: "cloudinary" },
      request,
    });

    return {
      folder,
      ...result,
    };
  },

  async uploadPublicAvatar(payload) {
    const result = await cloudinaryUploadImage({
      dataUrl: payload.dataUrl,
      folder: "avatars",
      publicId: payload.publicId || undefined,
    });

    return {
      folder: "avatars",
      ...result,
    };
  },

  async requestLessonFileUpload(actor, payload, request) {
    const folder = validateFileUpload({
      folder: payload.folder,
      contentType: payload.contentType,
    });
    assertFolderPermission(actor, folder);

    const key = buildObjectKey(folder, payload.fileName);
    const presigned = createPresignedPutUrl({ key });

    await recordAudit({
      actor,
      action: "upload.file_presigned",
      resourceType: "upload",
      resourceId: key,
      metadata: { folder, contentType: payload.contentType, fileName: payload.fileName },
      request,
    });

    return {
      provider: "s3",
      folder,
      fileKey: key,
      ...presigned,
    };
  },

  async startLocalVideoUpload(actor, payload, request) {
    const upload = await localVideoUpload.startUpload(actor, payload);
    await recordAudit({ actor, action: "upload.local_video_started", resourceType: "upload", resourceId: upload.uploadId, metadata: { fileName: upload.fileName, contentType: upload.contentType, size: upload.size }, request });
    return upload;
  },
  async localVideoUploadStatus(actor, uploadId) {
    return localVideoUpload.getStatus(actor, uploadId);
  },
  async writeLocalVideoChunk(actor, uploadId, offset, chunk) {
    return localVideoUpload.writeChunk(actor, uploadId, offset, chunk);
  },
  async completeLocalVideoUpload(actor, uploadId, request) {
    const result = await localVideoUpload.completeUpload(actor, uploadId);
    await recordAudit({ actor, action: "upload.local_video_completed", resourceType: "upload", resourceId: uploadId, metadata: { fileKey: result.fileKey, fileName: result.fileName, size: result.size }, request });
    return result;
  },
  async cancelLocalVideoUpload(actor, uploadId, request) {
    const result = await localVideoUpload.cancelUpload(actor, uploadId);
    await recordAudit({ actor, action: "upload.local_video_cancelled", resourceType: "upload", resourceId: uploadId, request });
    return result;
  },
};

module.exports = uploadService;
