import React, { useState, createContext } from "react";

export const AuthContext = createContext(null);

export default function Context({ children }) {
  const [userdata, setUserdata] = useState();
  return (
    <AuthContext.Provider value={{ userdata, setUserdata }}>
      {children}
    </AuthContext.Provider>
  );
}
