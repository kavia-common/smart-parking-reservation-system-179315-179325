import { useAuthContext } from '../context/AuthContext';

// PUBLIC_INTERFACE
export function useAuth() {
  /** Returns user, loading, isAdmin and auth methods from context. */
  return useAuthContext();
}

export default useAuth;
