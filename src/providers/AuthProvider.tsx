import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const getCredentials = async () => {
    const user = await localStorage.getItem("user");

    if (user) {
      const currentUser = JSON.parse(user);

      if (currentUser) {
        if (currentUser.role === "admin") {
          navigate("/admin/dashboard");
        } else if (currentUser.role === "user") {
          navigate("/user/home");
        }
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getCredentials();
    //   onLogout();
  }, []);

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ onLogout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
