import { useState } from "react";
import logo from "../../assets/logo.png";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import Register from "../register/Register";
import Login from "../login/Login";
import useAuth from "./../../hooks/useAuth";
import { faSignOut, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createApiEndpoint, ENDPOINTS } from "../../api";

let signUpHandler = () => {
  const signUp = document.querySelector(".sign-up-form");
  signUp.classList.toggle("show");
};

let signInHandler = () => {
  const signIn = document.querySelector(".sign-in-form");
  signIn.classList.toggle("show");
};

function Header() {
  const { auth, setAuth, cart } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    if (
      window.localStorage.getItem("user") ||
      window.localStorage.getItem("user") ||
      window.localStorage.getItem("refreshToken") ||
      window.localStorage.getItem("fullName") ||
      window.localStorage.getItem("avatar")
    ) {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("refreshToken");
      window.localStorage.removeItem("fullName");
      window.localStorage.removeItem("avatar");

      navigate("/");

      window.location.reload(false);
    } else {
      setAuth({});

      navigate("/");
    }
  };

  const changeAvatar = async () => {
    let avatarUrl = window.prompt("Change avatar:");

    if (avatarUrl) {
      const updateAvatar = {
        userName: auth.user,
        avatarUrl: avatarUrl,
      };

      createApiEndpoint(ENDPOINTS.UPDATE_AVATAR)
        .post(updateAvatar)
        .catch((err) => console.log(err));

      if (localStorage.getItem("avatar")) {
        localStorage.setItem("avatar", avatarUrl);
      }

      auth.avatar = avatarUrl;

      setUpdatedAvatar(
        <img
          className="avatar-img"
          src={auth.avatar}
          alt="Avatar"
          onClick={changeAvatar}
        />
      );

      alert("Avatar updated!");
    }
  };

  const getCartTotal = () => {
    return cart.reduce((sum, { quantity }) => sum + quantity, 0);
  };

  const [updatedAvatar, setUpdatedAvatar] = useState();

  return (
    <header>
      <div className="header-wrapper">
        <Link className="logoclass" to="/">
          <img className="logo-img" alt="" src={logo} />
        </Link>
        <nav>
          <ul>
            <Link to="/">
              <li>Games</li>
            </Link>
            <li>Community</li>
            <li>About</li>
            <li>Support</li>
          </ul>
        </nav>

        {!auth.user ? (
          <>
            <div className="sign-separator-div">
              <button className="sign-btn" onClick={signInHandler}>
                Sign in
              </button>
            </div>
            <div className="sign-div">
              <button className="sign-btn" onClick={signUpHandler}>
                Sign up
              </button>
            </div>
          </>
        ) : (
          <>
            {!updatedAvatar ? (
              <img
                className="avatar-img"
                src={auth.avatar}
                alt="Avatar"
                onClick={changeAvatar}
              />
            ) : (
              updatedAvatar
            )}
            <div className="sign-div">{auth.fullName}</div>
            <Link className="cartlink" to="/cart">
              <div className="cart-div">
                <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                {getCartTotal()}
              </div>
            </Link>
            <FontAwesomeIcon
              icon={faSignOut}
              className="sign-out-icon"
              onClick={signOut}
            />
          </>
        )}
      </div>
      <div className="sign-in-form">
        <div className="darkbackground">
          <Login />
        </div>
      </div>
      <div className="sign-up-form">
        <div className="darkbackground">
          <Register />
        </div>
      </div>
    </header>
  );
}

export default Header;
