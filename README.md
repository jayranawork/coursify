# Coursify

Coursify is a full-stack online learning platform built as a growing client-ready course website.

## Current Stack

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- Zod validation
- bcryptjs

### Frontend

- React
- Vite
- React Router
- React Hook Form
- Zod
- Zustand
- TanStack Query
- Axios
- Tailwind CSS

### Media and storage

- Cloudinary for images
- MongoDB for application data
- AWS S3 planned for PDFs and videos

## What Coursify Already Has

### Auth and account flow

- Register
- Login
- Logout
- Refresh token rotation
- Forgot password
- Reset password
- Role-based access for student, instructor, and admin

### Course platform

- Public course list
- Public course detail page
- Course creation and editing
- Sections and lessons
- Course publishing
- Instructor dashboard
- Student dashboard
- Admin dashboard
- Wishlist
- Reviews
- Notifications

### Payments and order flow

- Order creation
- Coupon validation and redemption tracking
- Checkout foundation
- Payment integration planned next

### File uploads

- Cloudinary image uploads for avatars
- Cloudinary image uploads for course thumbnails
- Public avatar upload flow for signup
- Authenticated upload flow for logged-in users
- File URLs are stored in MongoDB, not raw files

## Project Documentation

Use these files to understand the current codebase and roadmap:

- [document/2026-07-13/00-main-implementation.txt](./document/2026-07-13/00-main-implementation.txt)
- [document/2026-07-13/01-current-state.md](./document/2026-07-13/01-current-state.md)
- [document/2026-07-13/02-completed-today.md](./document/2026-07-13/02-completed-today.md)
- [document/2026-07-13/03-phases-and-roadmap.md](./document/2026-07-13/03-phases-and-roadmap.md)
- [document/2026-07-13/04-api-map.md](./document/2026-07-13/04-api-map.md)
- [document/2026-07-13/05-decisions-and-notes.md](./document/2026-07-13/05-decisions-and-notes.md)
- [document/2026-07-13/06-open-items.md](./document/2026-07-13/06-open-items.md)

## Main API Areas

- Auth
- Users
- Courses
- Sections
- Lessons
- Enrollments
- Orders
- Reviews
- Wishlist
- Categories
- Coupons
- Notifications
- Uploads
- Dashboards

## Current Direction

The next product phases are:

1. Finish file uploads for PDFs and videos
2. Add payment integration with Lemon Squeezy
3. Connect payment success to auto-enrollment
4. Add production email support for password reset
5. Improve media handling and streaming

## Development Notes

- The backend is the source of truth for important business logic.
- The frontend sends user intent and renders the UI.
- Uploaded files should be stored as URLs only.
- The project is being built in phases so each major system stays understandable and maintainable.

## Setup

Backend and frontend are separated into their own folders.

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

## Environment Variables

Backend environment variables include:

```env
MONGODB_URL=your_mongodb_url
PORT=3000
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CORS_ORIGINS=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Notes

- The old MVP documentation has been replaced by the new phase-based docs in `document/`.
- Password reset works in development without an email provider so testing is easy.
- The repository is now focused on becoming a larger course platform rather than a small demo.

