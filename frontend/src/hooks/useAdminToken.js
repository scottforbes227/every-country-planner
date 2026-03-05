import { useCallback, useState } from "react";

const STORAGE_KEY = "ew_admin_token";

export default function useAdminToken() {
  const [token, setTokenState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  const setToken = useCallback((nextToken) => {
    setTokenState(nextToken);
    try {
      localStorage.setItem(STORAGE_KEY, nextToken);
    } catch {
      // Ignore storage failures in private browsing or restricted contexts.
    }
  }, []);

  const clearToken = useCallback(() => {
    setTokenState("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage failures in private browsing or restricted contexts.
    }
  }, []);

  return { token, setToken, clearToken };
}
