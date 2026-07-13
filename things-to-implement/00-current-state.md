# Coursify Current State

This file records what the project already does today and what is still incomplete.

## Working now

- REST API is implemented across auth, courses, enrollments, orders, reviews, wishlist, categories, coupons, notifications, and dashboards.
- JWT access and refresh token auth is implemented.
- Public frontend pages exist for home, course list, course detail, login, register, and checkout.
- Student pages exist for dashboard, courses, lesson player, orders, wishlist, and profile.
- Instructor pages exist for dashboard, course list, course editor, and stats.
- Admin pages exist for dashboard, users, courses, categories, coupons, and orders.
- Checkout flow exists on the frontend and auto-enrolls after order placement.
- Loading states, error states, and empty states are implemented across most screens.

## Partially working

- Backend order creation does not auto-enroll the student.
- Admin management pages are more list-and-action screens than full CRUD screens.
- Some pages are still basic list/detail layouts instead of full management tools.

## Missing or weak areas

- File upload flow for videos and PDFs.
- Chunked upload for large files.
- HLS video processing and signed playback URLs.
- Better caching and scale strategy for larger traffic.

## Added in this phase

- Cloudinary image uploads for avatars and course thumbnails.
- Backend upload endpoint that stores only file URLs in MongoDB.
- Frontend upload controls for profile avatars and course thumbnails.

## Important risk notes

- Refresh tokens are stored in memory, so they disappear on server restart.
- Some user-generated content is rendered with `dangerouslySetInnerHTML`.
- The frontend bundle is larger than ideal because the course editor is heavy.
- The current setup is functional for demo and development, but not yet production-hard.
