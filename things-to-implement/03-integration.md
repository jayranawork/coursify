# Integration Tasks

This file is for problems that touch both frontend and backend.

## 1. Auth contract

- [ ] Make sure login returns `user`, `accessToken`, and `refreshToken`.
- [ ] Keep the refresh token key consistent across frontend storage and backend input.
- [ ] Keep `Authorization: Bearer <token>` as the standard access-token header.
- [ ] Keep token refresh logic in sync between Axios and backend auth routes.

## 2. Checkout contract

- [ ] Make coupon validation return a backend shape the frontend can trust.
- [ ] Make sure checkout can compute a real discount for fixed and percent coupons.
- [ ] Decide whether auto-enrollment happens in backend, frontend, or both.
- [ ] Keep order response shape stable so the checkout page can redirect safely.

## 3. Course contract

- [ ] Keep public list pagination shape consistent.
- [ ] Keep course detail shape consistent with course, sections, and lessons.
- [ ] Keep review response shape consistent with the review UI.

## 4. Dashboard contract

- [ ] Keep instructor stats field names stable.
- [ ] Keep admin stats field names stable.
- [ ] Keep admin list endpoints paginated and predictable.

## 5. Security contract

- [ ] Align CORS origins with the frontend dev server.
- [ ] Sanitize any HTML sent to the browser.
- [ ] Keep upload URLs and signed URLs short-lived and server-controlled.

## 6. High-risk integration files

- [Backend/index.js](../Backend/index.js)
- [Backend/routes/auth.js](../Backend/routes/auth.js)
- [Backend/routes/courses.js](../Backend/routes/courses.js)
- [Backend/routes/orders.js](../Backend/routes/orders.js)
- [Frontend/src/services/api.js](../Frontend/src/services/api.js)
- [Frontend/src/hooks/useCheckout.js](../Frontend/src/hooks/useCheckout.js)
- [Frontend/src/pages/public/CourseDetail.jsx](../Frontend/src/pages/public/CourseDetail.jsx)
- [Frontend/src/pages/public/Checkout.jsx](../Frontend/src/pages/public/Checkout.jsx)
