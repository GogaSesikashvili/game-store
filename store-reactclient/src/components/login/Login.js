import { useRef, useState, useEffect } from "react";
import { BASE_URL, ENDPOINTS } from "../../api";
import axios from "axios";
import "./login.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = BASE_URL + ENDPOINTS.LOGIN;

const Login = () => {
  const { setAuth } = useAuth();
  const { persist, setPersist } = useAuth();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ userName: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const token = response?.data?.token;
      const refreshToken = response?.data?.refreshToken;
      const fullName = response?.data?.fullName;
      const avatar = response?.data?.avatar;

      if (persist === true) {
        window.localStorage.setItem("user", user);
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("refreshToken", refreshToken);
        window.localStorage.setItem("fullName", fullName);
        window.localStorage.setItem("avatar", avatar);

        alert("Logged in!");
        navigate("/");

        window.location.reload(false);
      } else {
        setAuth({
          user,
          token,
          refreshToken,
          fullName,
          avatar,
        });

        setUser("");
        setPwd("");
        alert("Logged in!");

        const signIn = document.querySelector(".sign-in-form");
        signIn.classList.toggle("show");

        navigate("/");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErrMsg("Incorrect credentials");
      } else {
        setErrMsg("Login failed.");
      }

      errRef.current.focus();
    }
  };

  let signInCloseHandler = () => {
    const signIn = document.querySelector(".sign-in-form");
    signIn.classList.toggle("show");
  };

  const togglePresist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <section className="auth">
        <button className="signInCloseBtn" onClick={signInCloseHandler}>
          x
        </button>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="usr">Username:</label>
          <input
            type="text"
            id="usr"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <label htmlFor="pwd">Pasword:</label>
          <input
            type="password"
            id="pwd"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button>Sign in</button>
          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePresist}
              checked={persist}
            />
            <label htmlFor="persist">Remember me</label>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
