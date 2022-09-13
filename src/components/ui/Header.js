import { useState, useEffect } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useHistory, useLocation } from "react-router-dom";
import { refreshUserAuth, getUserInfo } from "../../redux/action";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [loginInfo, setLoginInfo] = useState(
    JSON.parse(localStorage.getItem("userAuth")) || null
  );
  let localCart = props.localCart;
  const refreshedLoginData = useSelector((state) => state.LoginReducer);
  let userInfo = useSelector((state) => state.UserDataReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [prevPath, setPrevPath] = useState("");
  const [curPath, setCurPath] = useState(location.pathname);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(
    () => {
      if (loginInfo !== null) {
        dispatch(refreshUserAuth({ idToken: loginInfo.idToken }));
        dispatch(getUserInfo());
      } else {
        history.push("/");
      }
    },
    // eslint-disable-next-line
    []
  );

  const loggedUser = [];
  if (loginInfo !== null) {
    if (refreshedLoginData === "error") {
      setLoginInfo(null);
      localStorage.removeItem("userAuth");
      history.push("/");
    } else {
      for (const key in userInfo) {
        if (userInfo[key].email === loginInfo.email) {
          let userDataVal = { ...userInfo[key], id: key };
          loggedUser.push(userDataVal);
        }
      }
    }
  }
  useEffect(() => {
    setPrevPath(curPath);
    setCurPath(location.pathname);
    // eslint-disable-next-line
  }, [location.pathname]);

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      history.push(prevPath);
    } else {
      if (location.pathname !== "/search") {
        history.push("/search");
      }
      props.onSearch(e.target.value);
    }
  };

  return (
    <div className="w-full h-auto py-2 px-5 bg-emerald-800 flex flex-col items-center sticky top-0 z-20">
      <div id="top-row" className="flex w-full justify-between items-center">
        <div
          id="logo left"
          className="lg:w-[20%] text-white text-2xl font-extrabold"
        >
          <Link to={`/`}>
            <img
              alt="logo"
              src={require(`./images/barlogo.png`)}
              height="50px"
              width="100px"
            />
          </Link>
        </div>
        <div
          id="search middle"
          className="w-[50%] justify-center items-center hidden lg:flex"
        >
          <input
            className="w-full mx-2 p-2 rounded-md outline-none focus:shadow-lg focus:scale-105 duration-100"
            placeholder="Search products"
            onChange={searchHandler}
            value={searchQuery}
          />
        </div>
        <div id="right" className="flex items-center lg:w-[30%]">
          <div>
            <div
              id="account"
              className={`md:mx-4 mx-2 text-white font-bold ${
                loginInfo !== null ? "flex" : "hidden"
              } items-center cursor-pointer peer`}
            >
              <FaUserAlt className="mx-2" />
              <span className="hidden md:block">Account</span>
            </div>
            <div className="hidden peer-hover:flex hover:flex w-auto sm:w-[150px] flex-col bg-white shadow-lg shadow-slate-400 absolute z-30">
              <Link to={`/profile`} className="px-5 py-3 hover:bg-gray-200">
                Profile
              </Link>
              <Link to={`/orders`} className="px-5 py-3 hover:bg-gray-200">
                Orders
              </Link>
              <Link to={`/logout`} className="px-5 py-3 hover:bg-gray-200">
                Logout
              </Link>
            </div>
          </div>
          <Link
            id="login-button"
            to={"/auth"}
            className={`md:mx-4 mx-2 px-4 py-2 ${
              loginInfo !== null ? "hidden" : "flex"
            } items-center bg-white text-emerald-800 font-bold rounded-md`}
          >
            <span className="mx-2 hidden md:block">Login</span>
            <span className="py-0.5 md:py-0">
              <FiLogIn />
            </span>
          </Link>
          <Link
            id="cart"
            to={"/cart"}
            className="md:mx-4 mx-2 text-white font-bold flex items-center cursor-pointer bg-emerald-600 rounded-md p-2"
          >
            <span className="mx-2 py-0.5 md:py-0">
              <FaShoppingCart />
            </span>
            <span className="hidden mx-2 md:block">Cart</span>

            {loginInfo === null &&
              localCart !== null &&
              localCart.length > 0 && (
                <span className={`mx-2 bg-red-600 rounded-full px-2`}>
                  {localCart.length}
                </span>
              )}

            {loginInfo !== null &&
              loggedUser[0] !== undefined &&
              Object.keys(loggedUser[0].cartItems).length > 1 && (
                <span className={`mx-2 bg-red-600 rounded-full px-2`}>
                  {Object.keys(loggedUser[0].cartItems).length - 1}
                </span>
              )}
          </Link>
        </div>
      </div>
      <div
        id="bottom-row"
        className="lg:hidden w-full flex justify-center items-center"
      >
        <div className="w-[95%] mt-2">
          <input
            className="w-full p-2 rounded-md outline-none focus:shadow-lg focus:scale-105 duration-100"
            placeholder="Search products"
            onChange={searchHandler}
            value={searchQuery}
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
