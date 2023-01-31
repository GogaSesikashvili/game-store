import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./register.css";
import { BASE_URL, ENDPOINTS } from "../../api";
import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [userName, setUserName] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [emailAddress, setEmailAddress] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(userName);
    setValidName(result);
  }, [userName]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(emailAddress);
    setValidEmail(result);
  }, [emailAddress]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);

    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, userName, emailAddress, password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        BASE_URL + ENDPOINTS.REGISTRATION,
        JSON.stringify({
          firstName,
          lastName,
          emailAddress,
          userName,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      alert("Registered!");
      const signUp = document.querySelector(".sign-up-form");
      signUp.classList.toggle("show");
      const signIn = document.querySelector(".sign-in-form");
      signIn.classList.toggle("show");
    } catch (error) {
      setErrMsg("Registration failed");

      errRef.current.focus();
    }
  };

  let signCloseHandler = () => {
    const signUp = document.querySelector(".sign-up-form");
    signUp.classList.toggle("show");
  };

  return (
    <>
      <section className="auth">
        <button className="signUpCloseBtn" onClick={signCloseHandler}>
          x
        </button>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">First name:</label>
          <input
            ref={userRef}
            type="text"
            id="firstname"
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastname">Last name:</label>
          <input
            type="text"
            id="lastname"
            autoComplete="off"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="username">
            Username:
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              color=""
              icon={faTimes}
              className={validName || !userName ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && userName && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
          <label htmlFor="email">
            Email:
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !emailAddress ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmailAddress(e.target.value)}
            required
            aria-invalid={validEmail ? "false" : "true"}
          />
          <label htmlFor="password">
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !password ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, <br /> a number and a
            special character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
          <label htmlFor="confirm_pwd">
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>

          <button
            disabled={
              !validName || !validEmail || !validPwd || !validMatch
                ? true
                : false
            }
          >
            Sign Up
          </button>
        </form>
      </section>
    </>
  );
};

export default Register;
