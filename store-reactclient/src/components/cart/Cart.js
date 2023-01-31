import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./cart.css";
import useAuth from "./../../hooks/useAuth";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useAuth();

  const getTotalSum = () => {
    let total = cart.reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );

    return Math.round(total * 100) / 100;
  };

  const getItemSum = (product) => {
    return Math.round(product.quantity * product.price * 100) / 100;
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const increaseQuantity = (product) => {
    const newCart = [...cart];
    newCart.find((item) => item.name === product.name).quantity++;
    setCart(newCart);
  };

  const decreaseQuantity = (product) => {
    const newCart = [...cart];
    newCart.find((item) => item.name === product.name).quantity--;
    setCart(newCart);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="checkout">
          <h1>Your Cart</h1>
          <div className="checkout-div">
            <div className="cart-total">Total: ${getTotalSum()}</div>
            <Link to="/order">
              <button className="button" disabled={cart.length < 1}>
                Proceed
              </button>
            </Link>
          </div>
        </div>
        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image-div">
                  <img
                    className="item-image"
                    src={item.image}
                    alt="itemimage"
                  />
                </div>
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">${item.price}</div>
                </div>
                <div className="item-quantity">
                  <div className="item-quantity-wrapper">
                    <button
                      className="minus"
                      onClick={() => decreaseQuantity(item)}
                      disabled={item.quantity < 2}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <div className="quantity">{item.quantity}</div>
                    <button
                      className="plus"
                      onClick={() => increaseQuantity(item)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <duv className="item-total-div">
                  <div className="item-total">Total:</div>
                  <div className="item-price-sum">${getItemSum(item)}</div>
                </duv>
                <button
                  className="item-remove"
                  onClick={() => removeFromCart(item)}
                >
                  <FontAwesomeIcon
                    className="item-remove-icon"
                    icon={faXmark}
                  />
                </button>
              </div>
            ))
          ) : (
            <div className="cart-empty">Cart is empty.</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
