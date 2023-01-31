import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});
const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  let [cart, setCart] = useState(cartFromLocalStorage);

  if (!auth.user && localStorage.getItem("user")) {
    auth.user = localStorage.getItem("user");
    auth.token = localStorage.getItem("token");
    auth.refreshToken = localStorage.getItem("refreshToken");
    auth.fullName = localStorage.getItem("fullName");
    auth.avatar = localStorage.getItem("avatar");
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (!cart && localStorage.getItem("cart")) {
    cart = localStorage.getItem("cart");
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        cart,
        setCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
