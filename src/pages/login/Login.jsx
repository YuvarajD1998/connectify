import React, { useState, useRef,useContext} from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";


export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const {dispatch } = useContext(AuthContext);

  



  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await loginCall({ email, password }, dispatch);
    } catch (err) {
      setError(true)
    }
  };


  return (<>
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Connectify</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Connectify.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLogin}>
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              required
              ref={emailRef}
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              required
              minLength="6"
              ref={passwordRef}
            />
            {error && <p className="loginError">User not found</p>}
            <button className="loginButton" type="submit">
              Login
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              <Link to='/register' style={{ color: "white", textDecoration: "none" }}>
                Create a New Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
</>
  );
}
