// import { createContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = JSON.parse(atob(token.split('.')[1]));
//         console.log("dexod = ", token)
//         return { name: decoded.name, role: decoded.role };
//       } catch {
//         return null;
//       }
//     }
//     return null;
//   });

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


// src/context/AuthContext.js
import { createContext, useState, useEffect, useContext  } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On page load, check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({  _id: decoded._id, name: decoded.name, role: decoded.role });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);


  
  // ✅ Define login function
  function login(token){
    const cleanToken = token;
    console.log('clean token = ', cleanToken)
    try {
      localStorage.setItem("token", cleanToken);
      const decoded = JSON.parse(atob(cleanToken.split(".")[1]));
      setUser({ _id: decoded._id, name: decoded.name, role: decoded.role });
    } catch (err) {
      console.error("Invalid token payload", err);
      logout();
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;