import { FiLogIn } from "react-icons/fi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

import { firebaseErrors } from "../../redux/firebaseErrors";

import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { userLogin, userSignup, addToCart } from "../../redux/action";
import { useHistory } from "react-router-dom";

const LoginSignUp = (props) => {
  document.title = "eBuy | Login";

  const dispatch = useDispatch();
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [toggleLogin, setToggleLogin] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const loginData = useSelector((state) => state.LoginReducer);
  //const userData = useSelector((state) => state.UserDataReducer);
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const toggleLoginHandler = () => {
    setToggleLogin(!toggleLogin);
    setSignUpSuccess(false);
  };

  const loginHandler = () => {
    const enteredEmail = emailRef.current.value.toLowerCase();
    const enteredPassword = passwordRef.current.value;

    if (enteredEmail.trim().length === 0 || !enteredEmail.includes("@")) {
      setEmailError(true);
    } else if (enteredPassword.trim().length < 6) {
      setPasswordError(true);
    } else {
      setEmailError(false);
      setPasswordError(false);
      dispatch(
        userLogin({
          email: enteredEmail,
          password: enteredPassword,
        })
      );
    }
  };

  const signupHandler = () => {
    const enteredEmail = emailRef.current.value.toLowerCase();
    const enteredPassword = passwordRef.current.value;

    if (enteredEmail.trim().length === 0 || !enteredEmail.includes("@")) {
      setEmailError(true);
    } else if (enteredPassword.trim().length < 6) {
      setPasswordError(true);
    } else {
      setEmailError(false);
      setPasswordError(false);
      dispatch(
        userSignup({
          email: enteredEmail,
          password: enteredPassword,
        })
      );
      setSignUpClicked(true);
    }
  };

  useEffect(() => {
    if (
      loginData.length !== 0 &&
      loginData[0] !== "loading" &&
      loginData.cartData !== undefined
    ) {
      if (loginData.status === 200) {
        localStorage.setItem("userAuth", JSON.stringify(loginData.data));
        let newLocalCart = [];
        let LoggedUserCartItemIds = [];
        if (props.localCart.length > 0) {
          for (const key in loginData.cartData.cartItems) {
            if (key !== "0") {
              LoggedUserCartItemIds.push(
                loginData.cartData.cartItems[key].itemId
              );
            }
          }
          props.localCart.forEach((e) => {
            if (!LoggedUserCartItemIds.includes(e.itemId)) {
              newLocalCart.push({ itemId: e.itemId, quantity: e.quantity });
            }
          });
        }
        for (const item of newLocalCart) {
          dispatch(
            addToCart({
              item: item,
              userId: loginData.cartData.userId,
            })
          );
        }
        props.onCartUpdate("empty");
        history.push("/");
      }
    }
    // eslint-disable-next-line
  }, [loginData]);

  if (signUpClicked) {
    if (
      loginData.length !== 0 &&
      loginData[0] !== "loading" &&
      loginData.status === 200
    ) {
      setSignUpClicked(false);
      setSignUpSuccess(true);
      setToggleLogin(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setSignUpSuccess(false);
    }, 5000);
  }, [signUpSuccess]);

  return (
    <div
      id="product-details-main-container"
      className="w-[98%] sm:w-[75%] md:w-[40%] h-auto bg-white rounded-md shadow-md shadow-slate-400 flex flex-col items-center justify-center md:flex-row p-4 my-24"
    >
      <div className="w-full h-auto flex flex-col justify-center items-center">
        <img
          src={require("./images/login-logo.png")}
          alt="logo"
          width="150px"
          height="100px"
        />
        <span
          className={`w-[80%] p-3 bg-red-300 text-red-700 rounded-md border-red-700 text-center ${
            loginData.data === undefined && loginData.message !== undefined
              ? "block"
              : "hidden"
          }`}
        >
          {firebaseErrors[loginData.message]}
        </span>

        {signUpSuccess && (
          <>
            <span
              className={`w-[80%] p-3 bg-green-200 text-green-900 rounded-md border-green-900 text-center`}
            >
              Account Created Successfully, Please Login
            </span>
          </>
        )}

        <div className="my-3 w-full flex flex-col justify-center items-center">
          <input
            className={`p-2 w-[80%] outline-none border-b ${
              emailError ? "border-red-600" : "border-emerald-800"
            }`}
            type="text"
            placeholder="Enter Email"
            ref={emailRef}
            onChange={() => {
              setEmailError(false);
            }}
          />
          <span
            className={`${
              emailError ? "flex" : "hidden"
            } text-red-600 text-sm w-[80%] text-left py-2 items-center`}
          >
            <MdError />
            <p className="ml-2">Enter a valid email</p>
          </span>
        </div>
        <div className="my-3 w-full flex flex-col justify-center items-center">
          <input
            className={`p-2 w-[80%] outline-none border-b ${
              passwordError ? "border-red-600" : "border-emerald-800"
            }`}
            type="password"
            placeholder="Enter Password"
            ref={passwordRef}
            onChange={() => {
              setPasswordError(false);
            }}
          />
          <span
            className={`${
              passwordError ? "flex" : "hidden"
            } text-red-600 text-sm w-[80%] text-left py-2 items-center`}
          >
            <MdError />
            <p className="ml-2">Password must contain atleast 6 characters</p>
          </span>
        </div>
        <div className="my-6 w-full flex justify-center items-center">
          <button
            className={`px-4 py-2 bg-emerald-800 font-bold text-white rounded-md outline-none ${
              toggleLogin ? "flex" : "hidden"
            } items-center hover:bg-emerald-600 hover:scale-105 duration-150 active:scale-95 ${
              loginData[0] === "loading"
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={loginHandler}
          >
            Login
            <span className="mx-2 text-lg font-bold">
              <FiLogIn
                className={`${loginData[0] !== "loading" ? "block" : "hidden"}`}
              />
              <AiOutlineLoading
                className={`animate-spin ${
                  loginData[0] === "loading" ? "block" : "hidden"
                }`}
              />
            </span>
          </button>
          <button
            className={`px-4 py-2 bg-emerald-800 font-bold text-white rounded-md outline-none ${
              !toggleLogin ? "flex" : "hidden"
            } items-center hover:bg-emerald-600 hover:scale-105 duration-150 active:scale-95 ${
              loginData[0] === "loading"
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={signupHandler}
          >
            Create Account
            <span className="mx-2 text-lg font-bold">
              <BsFillPersonPlusFill
                className={`${loginData[0] !== "loading" ? "block" : "hidden"}`}
              />
              <AiOutlineLoading
                className={`animate-spin ${
                  loginData[0] === "loading" ? "block" : "hidden"
                }`}
              />
            </span>
          </button>
        </div>
        <span
          className={`text-emerald-900 font-semibold cursor-pointer hover:underline underline-offset-2 active:text-emerald-600 ${
            toggleLogin ? "block" : "hidden"
          }`}
          onClick={toggleLoginHandler}
        >
          New here ? Create an account
        </span>
        <span
          className={`text-emerald-900 font-semibold cursor-pointer hover:underline underline-offset-2 active:text-emerald-600 ${
            !toggleLogin ? "block" : "hidden"
          }`}
          onClick={toggleLoginHandler}
        >
          Already have an account ? Login
        </span>
      </div>
    </div>
  );
};
export default LoginSignUp;
