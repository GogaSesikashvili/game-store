import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useState } from "react";
import "./order.css";
import useAuth from "./../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AddGame() {
  const { setCart } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const isValid = Boolean(
    formData.firstname &&
      formData.lastname &&
      formData.email &&
      formData.phone &&
      formData.payment &&
      (formData.comment?.length < 600 || !formData.comment)
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      if (window.localStorage.getItem("cart")) {
        window.localStorage.removeItem("cart");

        setCart([]);
      } else {
        setCart([]);
      }

      alert("Order placed successfully!");

      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <div className="add-game-form-wrapper">
        <form className="form">
          <h1>Completing your order</h1>
          <label className="label">First Name</label>
          <input
            className="form-control"
            onChange={handleChange}
            name="firstname"
            type="text"
            autoComplete="off"
          />
          <label className="label">Last Name</label>
          <input
            className="form-control"
            onChange={handleChange}
            name="lastname"
            type="text"
            autoComplete="off"
          />
          <label className="label">Email</label>
          <input
            className="form-control"
            onChange={handleChange}
            name="email"
            type="text"
            autoComplete="off"
          />
          <label className="label">Phone</label>
          <input
            className="form-control"
            onChange={handleChange}
            name="phone"
            type="text"
            autoComplete="off"
          />

          <label className="label">Payment type</label>
          <select
            onChange={handleChange}
            className="form-control"
            name="payment"
            defaultValue="DEFAULT"
          >
            <option value="DEFAULT" disabled>
              -- select an option --
            </option>
            <option value="card">Card</option>
            <option value="cash">Cash</option>
          </select>

          <label className="label">Comments (Optional)</label>
          <textarea
            cols="40"
            rows="5"
            className="form-control"
            onChange={handleChange}
            name="comment"
            type="multitext"
            autoComplete="off"
          />
          <div className="submit-button">
            <button
              className="button"
              disabled={!isValid}
              onClick={handleSubmit}
              title={
                isValid
                  ? "Confirm order."
                  : "Please fill all fields and keep comment under 600 characters."
              }
            >
              Order
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
