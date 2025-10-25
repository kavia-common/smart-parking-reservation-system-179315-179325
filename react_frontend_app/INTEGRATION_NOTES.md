Frontend Integration Notes

Base URL
- All REST calls use REACT_APP_API_BASE (defaults to http://localhost:3001). Set it in .env.

Firebase
- The app expects REACT_APP_FIREBASE_* to be set. These are public config values from your Firebase project settings.
- Auth state is tracked in AuthContext; Axios requests automatically include Authorization: Bearer <idToken>.

Bookings flow
- Updated BookingModal calls POST /bookings/reserve with the backend’s required payload shape.
- On success, backend returns a booking with qrCode (token string). Component displays that as a QR.

Admin
- Placeholder isAdmin checks email domain. Replace with a secure server-driven check as needed (e.g., roles from /auth/me).

Troubleshooting
- CORS issues: ensure backend ALLOWED_ORIGIN=http://localhost:3000.
- 401: sign in, verify Firebase config, check Authorization header in requests.
- 403: requires admin role in Firestore (users/{uid}.roles contains 'admin').
