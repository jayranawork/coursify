# Bugs To Fix

This file keeps only the issues that are actually broken, risky, or inconsistent.

## Backend bugs

- No major backend blockers remain in phase 1 or 2.

## Frontend bugs

- The bundle is larger than ideal because the course editor is heavy.
- Some console/debug statements remain in production code.

## Integration bugs

- Frontend auto-enrolls after order placement, but backend order creation does not.
- Auth and refresh behavior depends on token shapes staying stable.

## Product gaps

- No file upload endpoints yet.
- No HLS streaming pipeline yet.
- No order detail page in admin.
- No category delete or coupon edit/delete screens.
