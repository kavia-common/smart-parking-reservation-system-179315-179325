import axios from 'axios';
import { auth } from '../firebase';

/**
 * Axios instance used to communicate with backend APIs.
 * Injects Firebase ID token into Authorization header when available.
 */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:3001',
  timeout: 15000,
});

// Attach Authorization: Bearer <idToken> if user is logged in
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const token = await user.getIdToken();
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    } catch {
      // Ignore token errors; request proceeds unauthenticated
    }
  }
  return config;
});

export default api;
