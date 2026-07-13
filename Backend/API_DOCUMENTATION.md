# Coursify API Documentation

This document describes the current backend API for Coursify.

## Base URL

- Local: `http://localhost:3002`
- API prefix: `/api`

Example:

```text
http://localhost:3002/api/auth/login
```

## Conventions

### Authentication

Protected endpoints expect an access token in one of these headers:

- `Authorization: Bearer <access_token>`
- `token: <access_token>`
- `x-access-token: <access_token>`

### Roles

The system uses a single `User` collection with roles:

- `student`
- `instructor`
- `admin`

### Standard Success Response

```json
{
  "success": true,
  "data": {}
}
```

### Standard Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

### Pagination

List endpoints accept:

- `page` default `1`
- `limit` default `20`

Pagination response:

```json
{
  "success": true,
  "data": {
    "data": [],
    "pagination": {
      "total": 0,
      "page": 1,
      "limit": 20,
      "totalPages": 0
    }
  }
}
```

## Auth API

### POST `/api/auth/register`

Registers a new user.

Allowed public roles:

- `student`
- `instructor`

Business logic:

- validates the payload with Zod
- prevents duplicate email registration
- hashes password with bcrypt
- creates access and refresh tokens
- stores refresh token in MongoDB for persistent refresh sessions

Request body:

```json
{
  "name": "Aman Sharma",
  "email": "aman@example.com",
  "password": "StrongPassword123!",
  "role": "student",
  "avatar": "https://example.com/avatar.png",
  "bio": "Frontend developer"
}
```

### POST `/api/auth/login`

Logs in a user and returns tokens.

Business logic:

- validates credentials
- rejects blocked users
- issues new access and refresh tokens

Request body:

```json
{
  "email": "aman@example.com",
  "password": "StrongPassword123!"
}
```

### POST `/api/auth/forgot-password`

Starts the password recovery flow.

Business logic:

- looks up the user by email
- generates a one-time reset token
- stores only the token hash in MongoDB with a TTL
- in non-production, returns the raw reset token so the flow can be tested without email delivery

Request body:

```json
{
  "email": "aman@example.com"
}
```

### POST `/api/auth/reset-password`

Resets the password using a valid reset token.

Business logic:

- validates the reset token
- checks token expiry and reuse
- hashes the new password
- clears the user’s existing refresh tokens

Request body:

```json
{
  "token": "reset-token-from-email-or-dev-response",
  "password": "NewStrongPassword123!"
}
```

### POST `/api/auth/refresh`

Rotates the refresh token and returns a new token pair.

Business logic:

- verifies refresh token signature
- verifies refresh token exists in server token store
- invalidates the old refresh token
- issues a new access and refresh token pair

Request body:

```json
{
  "refreshToken": "eyJhbGciOi..."
}
```

### POST `/api/auth/logout`

Logs out the user.

Business logic:

- removes the refresh token from the token store

Request body:

```json
{
  "refreshToken": "eyJhbGciOi..."
}
```

## Users API

### GET `/api/users/me`

Returns the authenticated user profile.

Role:

- any authenticated user

### PUT `/api/users/me`

Updates the authenticated user profile.

Business logic:

- updates name, email, avatar, bio
- hashes password if updated

Request body:

```json
{
  "name": "Updated Name",
  "email": "newmail@example.com",
  "password": "NewStrongPassword123!",
  "avatar": "",
  "bio": "Updated bio"
}
```

### GET `/api/users`

Returns paginated users.

Role:

- `admin`

### GET `/api/users/:id`

Returns a single user by id.

Role:

- `admin`

### PATCH `/api/users/:id/status`

Blocks or unblocks a user.

Role:

- `admin`

Request body:

```json
{
  "status": "blocked"
}
```

## Uploads API

### POST `/api/uploads/image`

Uploads an image to Cloudinary and returns the hosted URL.

Role:

- any authenticated user

Business logic:

- accepts a base64 image data URL
- uploads the image to Cloudinary
- returns the hosted URL and metadata
- does not store binary file data in MongoDB

Request body:

```json
{
  "dataUrl": "data:image/png;base64,...",
  "folder": "avatars",
  "publicId": "avatar-123"
}
```

Allowed folders:

- `avatars`
- `courseThumbnails`

## Courses API

### GET `/api/courses`

Returns public published courses.

Query params:

- `page`
- `limit`
- `categoryId`
- `level`
- `instructorId`
- `minPrice`
- `maxPrice`
- `search`
- `isFeatured`

Business logic:

- filters only published courses
- supports featured-course filtering
- supports pagination and search

### GET `/api/courses/:slug`

Returns public course detail by slug.

Business logic:

- fetches the course
- loads sections
- loads lessons

### POST `/api/courses`

Creates a new course.

Role:

- `instructor`
- `admin`

Business logic:

- generates a unique slug
- assigns instructor ownership
- saves course metadata

Request body:

```json
{
  "title": "React Mastery",
  "description": "Full React course",
  "shortDescription": "Learn React fast",
  "thumbnailUrl": "",
  "previewVideoUrl": "",
  "price": 4999,
  "discountPrice": 2999,
  "level": "beginner",
  "language": "en",
  "categoryId": "665f...",
  "tags": ["react", "frontend"],
  "isPublished": false,
  "isFeatured": true
}
```

### PUT `/api/courses/:id`

Updates a course.

Role:

- course owner instructor
- `admin`

Business logic:

- verifies ownership
- updates the course
- regenerates slug if title changes

### DELETE `/api/courses/:id`

Deletes a course.

Role:

- `admin`

Business logic:

- removes the course
- cascades related sections, lessons, enrollments, reviews, wishlist items, progress records, and order items

### PATCH `/api/courses/:id/publish`

Publishes or unpublishes a course.

Role:

- course owner instructor
- `admin`

Request body:

```json
{
  "isPublished": true
}
```

### GET `/api/courses/admin/all`

Returns all courses for admin review.

Role:

- `admin`

### GET `/api/courses/instructor/me`

Returns the authenticated instructor’s own courses.

Role:

- `instructor`
- `admin`

## Sections API

### POST `/api/courses/:id/sections`

Creates a section for a course.

Role:

- course owner instructor
- `admin`

Request body:

```json
{
  "title": "Introduction",
  "order": 1
}
```

### PUT `/api/courses/sections/:id`

Updates a section.

Role:

- course owner instructor
- `admin`

### DELETE `/api/courses/sections/:id`

Deletes a section.

Business logic:

- deletes lessons inside the section too

Role:

- course owner instructor
- `admin`

## Lessons API

### POST `/api/courses/sections/:id/lessons`

Creates a lesson inside a section.

Role:

- course owner instructor
- `admin`

Request body:

```json
{
  "title": "Welcome",
  "type": "video",
  "content": "",
  "videoUrl": "",
  "duration": 120,
  "isPreview": true,
  "order": 1
}
```

### PUT `/api/courses/lessons/:id`

Updates a lesson.

Role:

- course owner instructor
- `admin`

### DELETE `/api/courses/lessons/:id`

Deletes a lesson.

Business logic:

- also removes related progress records

Role:

- course owner instructor
- `admin`

## Enrollment API

### POST `/api/enrollments`

Enrols the student in a published course.

Role:

- `student`

Business logic:

- ensures the course exists and is published
- creates the enrollment if it does not already exist

Request body:

```json
{
  "courseId": "665f..."
}
```

### GET `/api/enrollments/me`

Returns the logged-in student’s enrollments.

Role:

- `student`

### PATCH `/api/enrollments/progress`

Updates progress for a lesson in a course.

Role:

- `student`

Business logic:

- updates watched seconds
- marks lesson complete if requested
- recalculates course progress percent
- marks enrollment completed at 100%

Request body:

```json
{
  "courseId": "665f...",
  "lessonId": "665f...",
  "watchedSeconds": 90,
  "isCompleted": true
}
```

### GET `/api/courses/:id/progress`

Returns progress records for the authenticated student in the given course.

Role:

- `student`

## Orders API

### POST `/api/orders`

Creates a new order in pending state.

Role:

- `student`

Business logic:

- validates the course list
- calculates subtotal using discount price if available
- validates the coupon if provided
- applies the computed coupon discount if valid
- increments coupon redemption count when a coupon is used
- creates order and order items
- leaves order in `pending` status

Request body:

```json
{
  "courseIds": ["665f...", "665f..."],
  "currency": "INR",
  "paymentProvider": "manual",
  "paymentIntentId": "",
  "couponCode": "WELCOME10"
}
```

### GET `/api/orders/me`

Returns the authenticated student’s order history.

Role:

- `student`

### GET `/api/orders`

Returns paginated orders.

Role:

- `admin`

## Reviews API

### POST `/api/courses/:id/reviews`

Creates or updates a review for a course.

Role:

- `student`
- `instructor`
- `admin`

Business logic:

- stores rating and comment
- marks whether the user verified purchase/enrollment
- recalculates course rating average and count

Request body:

```json
{
  "rating": 5,
  "title": "Great course",
  "comment": "Very clear explanation"
}
```

### GET `/api/courses/:id/reviews`

Returns paginated reviews for a course.

Business logic:

- public read endpoint

### DELETE `/api/reviews/:id`

Deletes a review.

Business logic:

- owner can delete
- admin can delete

## Wishlist API

### POST `/api/wishlist/:courseId`

Adds a course to the student wishlist.

Role:

- `student`

### DELETE `/api/wishlist/:courseId`

Removes a course from the student wishlist.

Role:

- `student`

### GET `/api/wishlist`

Returns the student wishlist.

Role:

- `student`

## Categories API

### GET `/api/categories`

Returns active categories.

Business logic:

- public read

### POST `/api/categories`

Creates a category.

Role:

- `admin`

### PUT `/api/categories/:id`

Updates a category.

Role:

- `admin`

## Coupons API

### POST `/api/coupons`

Creates a coupon.

Role:

- `admin`

### GET `/api/coupons`

Lists coupons.

Role:

- `admin`

### POST `/api/coupons/validate`

Validates a coupon for a student.

Role:

- `student`

Business logic:

- checks coupon exists
- checks active flag
- checks expiry
- checks redemption limit
- returns the computed discount amount for the provided subtotal

Request body:

```json
{
  "code": "WELCOME10",
  "subtotal": 4999
}
```

Response:

```json
{
  "coupon": {
    "_id": "665f...",
    "code": "WELCOME10",
    "type": "percent",
    "value": 10
  },
  "subtotal": 4999,
  "discountAmount": 500,
  "total": 4499
}
```

## Notifications API

### GET `/api/notifications`

Returns notifications for the current user.

### PATCH `/api/notifications/:id/read`

Marks one notification as read.

### PATCH `/api/notifications/read-all`

Marks all user notifications as read.

## Instructor Dashboard API

### GET `/api/instructor/courses`

Returns the instructor’s own courses.

Role:

- `instructor`
- `admin`

### GET `/api/instructor/stats`

Returns instructor stats.

Business logic:

- total courses
- total students
- revenue
- rating average
- rating count

Role:

- `instructor`
- `admin`

## Admin Dashboard API

### GET `/api/admin/stats`

Returns platform-wide stats.

Business logic:

- total users
- total courses
- revenue

Role:

- `admin`

### GET `/api/admin/users`

Returns paginated users for admin management.

Role:

- `admin`

### GET `/api/admin/courses`

Returns paginated courses for admin management.

Role:

- `admin`

## Data Model Summary

The backend currently uses these collections:

- `users`
- `categories`
- `courses`
- `coursesections`
- `lessons`
- `enrollments`
- `orders`
- `orderitems`
- `reviews`
- `wishlists`
- `courseprogress`
- `coupons`
- `notifications`
- `refreshtokens`

## Environment Variables

Required:

```env
MONGODB_URL=mongodb://localhost:27017/coursify
JWT_ACCESS_SECRET=your-long-secret
JWT_REFRESH_SECRET=your-long-secret
PORT=3002
CORS_ORIGINS=http://localhost:5500,http://127.0.0.1:5500
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Notes

- Refresh tokens are stored in MongoDB and rotated on refresh.
- Image uploads now go through Cloudinary.
- The backend is designed to be extended into a more complete LMS with payments, media upload, and analytics later.
- Legacy MVP route files exist in `Backend/routers`, but they are not used by the current app bootstrap.
