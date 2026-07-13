# Backend Tasks

This file groups the backend work by problem area.

## 1. Authentication and session handling

- [ ] Keep JWT secrets only in environment variables.
- [x] Replace the in-memory refresh token map with a persistent database-backed store.
- [x] Add rate limiting to `/api/auth/login`.
- [x] Add rate limiting to `/api/auth/register`.
- [x] Make refresh token rotation survive server restarts.
- [ ] Keep auth error responses consistent across login, refresh, and logout.

## 2. Course and catalog behavior

- [x] Support `isFeatured` in public course filtering.
- [ ] Keep course publish/unpublish behavior consistent across routes.
- [ ] Review ownership checks on course update and delete paths.
- [ ] Review slug generation when a course title changes.

## 3. Coupon and checkout behavior

- [x] Return a computed discount result from coupon validation.
- [x] Increment coupon `redeemedCount` when an order uses a valid coupon.
- [x] Prevent invalid or expired coupons from being accepted.
- [ ] Make sure order responses contain everything the frontend needs.

## 4. Enrollment and progress

- [ ] Confirm enrollment creation is only allowed for students.
- [ ] Keep progress updates tied to valid enrollments and lessons.
- [ ] Verify progress percentages stay accurate when lessons are completed.
- [ ] Ensure lesson completion state and enrollment status stay in sync.

## 5. Reviews and wishlist

- [ ] Confirm review creation only happens for allowed users.
- [ ] Recalculate rating averages after review add, update, or delete.
- [ ] Keep wishlist add/remove operations idempotent.

## 6. Notification and dashboard data

- [ ] Keep notification read/unread endpoints consistent.
- [ ] Check instructor stats calculations for revenue and rating correctness.
- [ ] Check admin stats for totals and revenue.

## 7. File storage and uploads

- [ ] Add an image upload strategy, ideally Cloudinary.
- [ ] Add S3-based upload strategy for videos and PDFs.
- [ ] Add upload initiation and completion endpoints.
- [ ] Avoid storing binary files in MongoDB.
- [ ] Store only file URLs and metadata in the database.

## 8. Streaming pipeline

- [ ] Add video processing after upload.
- [ ] Convert long videos to HLS format.
- [ ] Add signed delivery URLs for protected lesson playback.
- [ ] Add CloudFront in front of video delivery.

## 9. Security and hardening

- [x] Add security headers middleware.
- [ ] Add request logging middleware.
- [ ] Review CORS configuration for production.
- [x] Remove any mass assignment from `req.body` spread usage.
- [x] Review all text-rendering paths for XSS safety.

## 10. Scalability and caching

- [ ] Add indexes where read performance matters.
- [ ] Move refresh token storage out of memory.
- [ ] Introduce caching for public course and category data.
- [ ] Add queue-based processing for heavy work.
- [ ] Plan read-replica support for future growth.

## 11. Suggested backend file hotspots

- [Backend/index.js](../Backend/index.js)
- [Backend/config.js](../Backend/config.js)
- [Backend/models/index.js](../Backend/models/index.js)
- [Backend/services/index.js](../Backend/services/index.js)
- [Backend/routes/courses.js](../Backend/routes/courses.js)
- [Backend/routes/orders.js](../Backend/routes/orders.js)
- [Backend/routes/auth.js](../Backend/routes/auth.js)
- [Backend/utils/tokenStore.js](../Backend/utils/tokenStore.js)
