# CarePoint Hospital Appointment Booking Demo

## Run locally
1. Extract the ZIP file.
2. Open `index.html` directly in Chrome, Edge, or Firefox. No Node.js, PHP, or server is required.
3. Internet access is used for Google Fonts and the remote doctor photos. The layout and functionality are local.

## Features
- Demo sign-up and sign-in UI with password show/hide and duplicate-email checks
- Responsive hospital landing page and CSS styling
- 9 demo doctor profiles with specialty filters and search
- Appointment booking form with basic validation
- Date/time selection, available-slot filtering, and alerts when a doctor has no available slots or a slot is already booked
- Appointments list, booking reference, cancellation, and toast confirmations
- Appointments saved in browser `localStorage`
- Mobile navigation and accessible modal close controls

## Deploy
- **GitHub Pages:** Upload `index.html`, `style.css`, and `script.js` to a repository, then enable Pages in repository Settings.
- **Firebase Hosting:** Run `firebase init hosting` in this folder (Firebase CLI required), choose this folder as the public directory, configure it as a single-page app if prompted, then run `firebase deploy`.

## Important limitations
This is a **static educational demo**. Bookings are saved only in the current browser/device and are not shared with hospital staff or other users. It has no secure server, real database, email/SMS notifications, real doctor availability, or protected patient records. Sign-up/sign-in is a browser-only demonstration using localStorage; passwords are not securely stored and this must not be used for real accounts. Do not enter real medical or sensitive personal information. A production hospital booking system requires a backend, database, authentication, server-side validation, privacy/security controls, and real appointment integration.
