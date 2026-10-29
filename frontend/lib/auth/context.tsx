"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface CustomerAddress {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  address_1?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

export interface CustomerUser {
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  username: string;
  registered?: string;
  billing: CustomerAddress;
  shipping: CustomerAddress;
}

export interface CustomerOrderItem {
  name: string;
  quantity: number;
  total: number;
  image?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  statusLabel: string;
  total: number;
  currency: string;
  paymentMethod: string;
  itemsCount: number;
  items: CustomerOrderItem[];
}

interface AuthContextType {
  user: CustomerUser | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  orders: CustomerOrder[];
  isLoadingOrders: boolean;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { name: string; email: string; phone: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (identifier: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  resetPassword: (key: string, login: string, newPassword: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  updateProfile: (data: {
    name?: string;
    phone?: string;
    billing?: CustomerAddress;
    shipping?: CustomerAddress;
    new_password?: string;
    current_password?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshOrders: () => Promise<void>;
}

const LOCAL_STORAGE_AUTH_KEY = "abf_customer_auth_v1";

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: true,
  orders: [],
  isLoadingOrders: false,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  forgotPassword: async () => ({ success: false }),
  resetPassword: async () => ({ success: false }),
  updateProfile: async () => ({ success: false }),
  logout: () => {},
  refreshOrders: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(false);

  // Restore session from localStorage on client hydration
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.token && parsed.user) {
          setToken(parsed.token);
          setUser(parsed.user);
        }
      }
    } catch (e) {
      console.warn("Could not load stored auth session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch orders when logged in
  const fetchOrders = useCallback(async (authToken: string) => {
    if (!authToken) return;
    setIsLoadingOrders(true);
    try {
      const res = await fetch("/api/auth/orders", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.warn("Failed to fetch customer orders", e);
    } finally {
      setIsLoadingOrders(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchOrders(token);
    } else {
      setOrders([]);
    }
  }, [token, fetchOrders]);

  const saveAuthSession = (authToken: string, authUser: CustomerUser) => {
    setToken(authToken);
    setUser(authUser);
    try {
      localStorage.setItem(
        LOCAL_STORAGE_AUTH_KEY,
        JSON.stringify({ token: authToken, user: authUser })
      );
    } catch (e) {
      console.warn("Could not save auth session", e);
    }
  };

  const login = async (identifier: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Invalid email or password." };
      }

      saveAuthSession(data.token, data.user);
      return { success: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Network error. Please try again.";
      return { success: false, error: msg };
    }
  };

  const register = async (formData: { name: string; email: string; phone: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Could not create account." };
      }

      saveAuthSession(data.token, data.user);
      return { success: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Network error. Please try again.";
      return { success: false, error: msg };
    }
  };

  const forgotPassword = async (identifier: string) => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Unable to send reset email." };
      }

      return { success: true, message: data.message };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Network error. Please try again.";
      return { success: false, error: msg };
    }
  };

  const resetPassword = async (key: string, loginUsername: string, newPassword: string) => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, login: loginUsername, password: newPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Failed to reset password." };
      }

      return { success: true, message: data.message };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Network error. Please try again.";
      return { success: false, error: msg };
    }
  };

  const updateProfile = async (updateData: {
    name?: string;
    phone?: string;
    billing?: CustomerAddress;
    shipping?: CustomerAddress;
    new_password?: string;
    current_password?: string;
  }) => {
    if (!token) return { success: false, error: "Not authenticated" };
    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Failed to update profile." };
      }

      saveAuthSession(data.token, data.user);
      return { success: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Network error. Please try again.";
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setOrders([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    } catch (e) {
      console.warn("Could not remove auth session", e);
    }
  };

  const refreshOrders = async () => {
    if (token) {
      await fetchOrders(token);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user,
        isLoading,
        orders,
        isLoadingOrders,
        login,
        register,
        forgotPassword,
        resetPassword,
        updateProfile,
        logout,
        refreshOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
