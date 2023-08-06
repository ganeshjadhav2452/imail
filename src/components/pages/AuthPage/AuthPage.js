import React, { useState, useRef,  useEffect } from "react";
import "./AuthPage.css";
import LoaderEl from "../../UI/Loader/Loader";

import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const confPassRef = useRef();
  const navigate = useNavigate()
  const [isPassSame, setIsPassSame] = useState(true);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const emailRef = useRef();
  const passRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsPassSame(true);
    setIsError(false);

    if (passRef.current.value !== confPassRef.current.value) {
      setIsPassSame(false);
      return;
    }
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (isLogin) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6rxed4e1QR4XGx7EdDcF0k6oEVGRBvUM`,
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsLoading(false);
        console.log(response)
        if (response.ok) {
          localStorage.setItem('token',response.idToken)
          navigate('/')
        
        }else{
          setIsError('sorry ! something went wrong')
        }
        const data = await response.json();

        localStorage.setItem("token", data.idToken);
        localStorage.setItem("email", data.email);
      } catch (err) {
        setIsLoading(false);
        setIsError(err);
      
       
      }
    } else {
      try {
        setIsLoading(true);
        console.log('email and password is ' ,email,password,)
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6rxed4e1QR4XGx7EdDcF0k6oEVGRBvUM`,
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsLoading(false);

        if (response.ok) {
          console.log("your authantication is successfull,", response);
        }
      } catch (err) {
        setIsLoading(false);
        setIsError(err);
        throw new Error("your authantication faied because, ", err);
      }
    }
  };

 

  return (
    <div>
      {isLoading && <LoaderEl />}
      <section className={"auth"}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={"control"}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" ref={emailRef} required />
          </div>
          <div className={"control"}>
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" ref={passRef} required />
          </div>
          <div className={"control"}>
            <label htmlFor="password">Confirm Password</label>
            <input type="confirmPassword" id="password" ref={confPassRef} required />
          </div>
          {!isPassSame && (
            <p className="text-danger">Sorry both Passwrods should same</p>
          )}
          {isError && <p className="text-danger">{isError}</p>}
          <div className={"actions"}>
            <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
            {/* <Link to='/resetpassword' className={"toggle mb-0"}>forgot password ?</Link> */}
            <button
              type="button"
              className={"toggle"}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AuthPage;
