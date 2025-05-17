import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const getCredentials = async () => {
    const user = await localStorage.getItem("user");

    if (user) {
      const currentUser = JSON.parse(user);

      const path = location.pathname;

      if (currentUser.role === "admin") {
        if (
          path.includes("/user/") ||
          path === "/" ||
          path.includes("/register")
        ) {
          navigate("/admin/dashboard", { replace: true });
        }
      } else if (currentUser.role === "user") {
        if (
          path.includes("/admin/") ||
          path === "/" ||
          path.includes("/register")
        ) {
          navigate("/user/home", { replace: true });
        }
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getCredentials();
    //   onLogout();
  }, [location.pathname]);

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ onLogout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
