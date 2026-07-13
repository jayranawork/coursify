const { z } = require("zod");

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id");
const pagination = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

const authRegisterSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  role: z.enum(["student", "instructor"]).optional(),
  avatar: z.string().url().optional().or(z.literal("")),
  bio: z.string().max(500).optional(),
});

const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(128),
});

const authRefreshSchema = z.object({
  refreshToken: z.string().min(1),
});

const userUpdateSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  email: z.string().email().optional(),
  password: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().min(8).max(128).optional()
  ),
  avatar: z.string().url().optional().or(z.literal("")),
  bio: z.string().max(500).optional(),
});

const userStatusSchema = z.object({
  status: z.enum(["active", "blocked"]),
});

const courseSchema = z.object({
  title: z.string().min(2).max(180),
  description: z.string().min(10),
  shortDescription: z.string().max(280).optional(),
  thumbnailUrl: z.string().url().optional().or(z.literal("")),
  previewVideoUrl: z.string().url().optional().or(z.literal("")),
  price: z.coerce.number().min(0),
  discountPrice: z.coerce.number().min(0).optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  language: z.string().max(40).optional(),
  categoryId: objectId.optional().nullable(),
  instructorId: objectId.optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

const courseUpdateSchema = courseSchema.partial();

const publishSchema = z.object({
  isPublished: z.boolean(),
});

const sectionSchema = z.object({
  title: z.string().min(2).max(180),
  order: z.coerce.number().int().min(1).optional(),
});

const lessonSchema = z.object({
  title: z.string().min(2).max(180),
  type: z.enum(["video", "text", "pdf", "quiz"]),
  content: z.string().optional(),
  videoUrl: z.string().url().optional().or(z.literal("")),
  duration: z.coerce.number().min(0).optional(),
  isPreview: z.boolean().optional(),
  order: z.coerce.number().int().min(1).optional(),
});

const enrollmentSchema = z.object({
  courseId: objectId,
});

const progressSchema = z.object({
  courseId: objectId,
  lessonId: objectId,
  watchedSeconds: z.coerce.number().min(0).optional(),
  isCompleted: z.boolean().optional(),
});

const orderSchema = z.object({
  courseIds: z.array(objectId).min(1),
  currency: z.string().min(3).max(10).optional(),
  paymentProvider: z.string().max(50).optional(),
  paymentIntentId: z.string().max(120).optional(),
  couponCode: z.string().max(40).optional(),
});

const reviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  title: z.string().max(180).optional(),
  comment: z.string().max(2000).optional(),
});

const categorySchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(140).optional(),
  parentId: objectId.optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

const couponSchema = z.object({
  code: z.string().min(2).max(40),
  type: z.enum(["percent", "fixed"]),
  value: z.coerce.number().min(0),
  maxRedemptions: z.coerce.number().int().min(1).optional(),
  redeemedCount: z.coerce.number().int().min(0).optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional(),
});

const couponValidateSchema = z.object({
  code: z.string().min(2).max(40),
  subtotal: z.coerce.number().min(0).optional(),
});

const uploadImageSchema = z.object({
  dataUrl: z.string().min(1),
  folder: z.enum(["avatars", "courseThumbnails"]).optional(),
  publicId: z.string().min(1).max(120).optional(),
});

const uploadPublicImageSchema = z.object({
  dataUrl: z.string().min(1),
  publicId: z.string().min(1).max(120).optional(),
});

module.exports = {
  objectId,
  pagination,
  authRegisterSchema,
  authLoginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  authRefreshSchema,
  userUpdateSchema,
  userStatusSchema,
  courseSchema,
  courseUpdateSchema,
  publishSchema,
  sectionSchema,
  lessonSchema,
  enrollmentSchema,
  progressSchema,
  orderSchema,
  reviewSchema,
  categorySchema,
  couponSchema,
  couponValidateSchema,
  uploadImageSchema,
  uploadPublicImageSchema,
};
