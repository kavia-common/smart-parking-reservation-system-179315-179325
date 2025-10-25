import api from '../api/client';

// PUBLIC_INTERFACE
export default function useApi() {
  /** Returns a configured axios client with token injection. */
  return api;
}
