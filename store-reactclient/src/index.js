import "bootstrap/dist/css/bootstrap.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameDetail from "./components/gamedetail/GameDetail";
import AddGame from "./components/addgame/AddGame";
import EditGame from "./components/editgame/EditGame";
import { AuthProvider } from "./context/AuthProvider";
import Cart from "./components/cart/Cart";
import Order from "./components/order/Order";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/gamedetail/:id" element={<GameDetail />} />
          <Route path="/addgame" element={<AddGame />} />
          <Route path="/editgame/:id" element={<EditGame />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
