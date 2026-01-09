import React, { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const loading = useAuthStore((state) => state.loading);
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading && !user) {
    return null;
  }

  return children;
};

export default AuthProvider;
