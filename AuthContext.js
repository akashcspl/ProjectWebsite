import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Hook to use Auth anywhere
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // Initialize logged-in state based on whether a token exists
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  // Login handler
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
