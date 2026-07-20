# Coursify Current State

This file records what the project already does today and what is still incomplete.

## Working now

- REST API is implemented across auth, courses, enrollments, orders, reviews, wishlist, categories, coupons, notifications, and dashboards.
- JWT access and refresh token auth is implemented.
- Public frontend pages exist for home, course list, course detail, login, register, and checkout.
- Student pages exist for dashboard, courses, lesson player, orders, wishlist, and profile.
- Instructor pages exist for dashboard, course list, course editor, and stats.
- Admin pages exist for dashboard, users, courses, categories, coupons, and orders.
- Checkout flow exists on the frontend and redirects to Lemon Squeezy.
- Successful Lemon Squeezy `order_created` webhooks mark orders paid and auto-enroll students.
- Loading states, error states, and empty states are implemented across most screens.

## Partially working

- Pending orders do not enroll students until payment is confirmed by the backend webhook.
- Coupon slots are reserved for pending orders and redeemed only after payment confirmation.
- Admin management pages are more list-and-action screens than full CRUD screens.
- Some pages are still basic list/detail layouts instead of full management tools.

## Missing or weak areas

- Finalized media access strategy for HLS video delivery and long-term PDF delivery.
- Chunked upload for large files.
- HLS video processing and signed playback URLs.
- Better caching and scale strategy for larger traffic.

## Added in this phase

- Cloudinary image uploads for avatars and course thumbnails.
- Backend upload endpoint that stores only file URLs in MongoDB.
- Frontend upload controls for profile avatars and course thumbnails.
- Presigned S3 uploads for lesson PDFs and videos.
- Frontend lesson upload controls for videos and PDFs.

## Important risk notes

- Coupon reservations use lazy expiry cleanup; a background cleanup worker is still a future scale improvement.
- The frontend bundle is larger than ideal because the course editor and public features are loaded together.
- The current setup is functional for demo and development, but not yet production-hard.
