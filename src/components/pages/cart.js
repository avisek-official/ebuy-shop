import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  refreshUserAuth,
  getUserInfo,
  getAllProducts,
  removeFromCart,
  updateCart,
  placeOrder,
} from "../../redux/action";

import {
  BsBoxSeam,
  BsCartX,
  BsCheckCircleFill,
  BsEmojiSmile,
  BsTrashFill,
} from "react-icons/bs";
import { GiArchiveResearch } from "react-icons/gi";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";

import PlaceOrder from "../ui/PlaceOrder";

const Cart = (props) => {
  document.title = "My Cart | eBuy Online Shopping";
  const [loginInfo, setLoginInfo] = useState(
    JSON.parse(localStorage.getItem("userAuth")) || null
  );
  const [header, setHeader] = useState("Things I am about to buy ");
  const [placeOrderToggle, setPlaceOrderToggle] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const refreshedLoginData = useSelector((state) => state.LoginReducer);
  const userInfo = useSelector((state) => state.UserDataReducer);

  const [localCart, setLocalCart] = useState(props.localCart);

  let cartTotal = 0;
  const [ct, setCT] = useState(cartTotal);

  useEffect(() => {
    //dispatch(getProdDetails(prod_id));
    dispatch(getAllProducts());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLocalCart(props.localCart);
  }, [props.localCart]);

  //const productDetails = useSelector((state) => [state.productDetailsReducer]);
  const allProducts = useSelector((state) => state.allProductReducer);

  useEffect(
    () => {
      if (loginInfo !== null) {
        dispatch(refreshUserAuth({ idToken: loginInfo.idToken }));
        dispatch(getUserInfo());
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
      //history.push("/auth");
    } else {
      for (const key in userInfo) {
        if (userInfo[key].email === loginInfo.email) {
          let userDataVal = { ...userInfo[key], id: key };
          loggedUser.push(userDataVal);
        }
      }
    }
  }

  //Set Cart Items
  let cartItems = [];
  if (loginInfo !== null) {
    if (loggedUser[0] !== undefined) {
      if (Object.keys(loggedUser[0].cartItems).length > 0) {
        for (const key in loggedUser[0].cartItems) {
          if (Object.keys(allProducts).length > 0) {
            for (const id in allProducts) {
              if (
                Number(allProducts[id].id) ===
                Number(loggedUser[0].cartItems[key].itemId)
              ) {
                cartItems.push({
                  ...allProducts[id],
                  quantity: loggedUser[0].cartItems[key].quantity,
                  cartKey: key,
                });
              }
            }
          }
        }
      }
    }
  } else {
    if (localCart !== undefined) {
      if (localCart.length > 0) {
        for (const key in localCart) {
          if (Object.keys(allProducts).length > 0) {
            for (const id in allProducts) {
              if (
                Number(allProducts[id].id) === Number(localCart[key].itemId)
              ) {
                cartItems.push({
                  ...allProducts[id],
                  quantity: localCart[key].quantity,
                });
              }
            }
          }
        }
      }
    }
  }

  const placeOrderHandler = (orderInfo) => {
    //alert(orderInfo+' '+cartItems+' '+ct);
    // console.log(orderInfo);
    // console.log(cartItems[0].cartKey);
    // console.log(ct);
    // console.log(loggedUser[0].id);
    dispatch(
      placeOrder({
        orderDetails: {
          orderInfo: orderInfo,
          orderItems: cartItems,
          totalAmount: ct,
          orderStatus: "Pending",
        },
        userId: loggedUser[0].id,
      })
    );
    cartItems.forEach((item) => {
      dispatch(
        removeFromCart({
          userId: loggedUser[0].id,
          cartItemKey: item.cartKey,
        })
      );
    });
    setOrderPlaced(true);
  };

  return (
    <div
      className={`w-[98%] md:w-4/5 min-h-[65vh] bg-white rounded-md shadow-md shadow-slate-400 flex flex-col items-center justify-start p-4 my-8`}
    >
      {orderPlaced && (
        <>
          {window.scrollTo(0, 0)}
          <span className="w-full h-[60vh] flex flex-col justify-center items-center">
            <BsCheckCircleFill
              size={90}
              className="text-emerald-800 animate-pulse my-4"
            />
            <p className="text-xl font-bold my-4">Order Placed</p>
            <Link
              to={"/orders"}
              className="bg-emerald-800 text-white font-bold text-lg px-5 py-2 rounded-md shadow-md shadow-slate-300 hover:bg-emerald-600 duration-150 active:scale-95 flex justify-center items-center my-4"
            >
              Track Orders <BsBoxSeam className="mx-2" size={20} />
            </Link>
          </span>
        </>
      )}
      {!orderPlaced && (
        <>
          <div className="text-lg font-bold mb-2 flex items-center">
            <span className="mx-3">{header}</span> <BsEmojiSmile />
          </div>
          <div className="h-[1px] bg-gray-500 w-full mb-3"></div>
          {cartItems.length === 0 && userInfo !== "loading" && (
            <>
              {/* Empty Cart */}
              <div className="w-full h-[55vh] flex flex-col justify-evenly items-center">
                <BsCartX size={90} />
                <div className="text-xl font-bold">Your cart is empty</div>
                <Link
                  to={"/"}
                  className="bg-emerald-800 text-white font-bold text-lg px-5 py-2 rounded-md shadow-md shadow-slate-300 hover:bg-emerald-600 hover:scale-105 duration-150 active:scale-95 flex justify-center items-center"
                >
                  Explore Products
                  <GiArchiveResearch className="mx-2" size={24} />
                </Link>
              </div>
              {/* Empty Cart */}
            </>
          )}
          {userInfo === "loading" && (
            <span className="flex w-full my-24 justify-center item-center">
              <AiOutlineLoading
                size={90}
                className="text-emerald-800 animate-spin"
              />
            </span>
          )}
          {cartItems.length > 0 && userInfo !== "loading" && !placeOrderToggle && (
            <div
              id="cartItems-container"
              className="w-full flex flex-col min-h-[65vh] justify-evenly items-center"
            >
              {cartItems.map((item) => {
                cartTotal += item.quantity * item.price;
                return (
                  <div
                    key={item.id}
                    id="cartItem"
                    className="w-[90%] flex flex-col md:flex-row p-4 rounded-md border-b border-gray-500 justify-between my-2"
                  >
                    <span className="flex w-full md:w-[60%] justify-center items-center">
                      <Link
                        to={`/${item.id}`}
                        className="flex w-full justify-evenly items-center"
                      >
                        <span className="w-[40%] flex justify-center items-center">
                          <img src={item.image} alt="item" width="50px" />
                        </span>
                        <span className="w-[60%] md:hidden flex justify-start items-center">
                          {item.title.length > 45
                            ? `${item.title.slice(0, 45)}...`
                            : item.title}
                        </span>
                        <span className="w-[50%] hidden md:flex justify-start items-center">
                          {item.title.length > 70
                            ? `${item.title.slice(0, 70)}...`
                            : item.title}
                        </span>
                      </Link>
                    </span>
                    <span className="flex w-full md:w-[40%] justify-evenly items-center my-2 md:my-0">
                      <span className="w-[45%] flex justify-evenly items-center">
                        <button
                          className={`${
                            item.quantity > 1
                              ? "bg-emerald-800 text-white"
                              : "bg-gray-300 text-black"
                          } text-lg rounded-full w-7 font-bold`}
                          disabled={item.quantity === 1}
                          onClick={() => {
                            if (loginInfo !== null) {
                              if (loggedUser[0] !== undefined) {
                                dispatch(
                                  updateCart({
                                    userId: loggedUser[0].id,
                                    cartItemKey: item.cartKey,
                                    cartItemData: {
                                      itemId: item.id.toString(),
                                      quantity: Number(item.quantity) - 1,
                                    },
                                  })
                                );
                              }
                            } else {
                              let newCart = localCart.map((i) => {
                                if (Number(i.itemId) === Number(item.id)) {
                                  i.quantity--;
                                }
                                return i;
                              });
                              setLocalCart(newCart);
                              props.onCartIncDec(newCart);
                            }
                          }}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className={`bg-emerald-800 text-white text-lg rounded-full w-7 font-bold`}
                          onClick={() => {
                            if (loginInfo !== null) {
                              if (loggedUser[0] !== undefined) {
                                dispatch(
                                  updateCart({
                                    userId: loggedUser[0].id,
                                    cartItemKey: item.cartKey,
                                    cartItemData: {
                                      itemId: item.id.toString(),
                                      quantity: Number(item.quantity) + 1,
                                    },
                                  })
                                );
                              }
                            } else {
                              let newCart = localCart.map((i) => {
                                if (Number(i.itemId) === Number(item.id)) {
                                  i.quantity++;
                                }
                                return i;
                              });
                              setLocalCart(newCart);
                              props.onCartIncDec(newCart);
                            }
                          }}
                        >
                          +
                        </button>
                      </span>
                      <span className="w-[45%] flex justify-center items-center text-emerald-800 font-bold">
                        $ {(item.price * item.quantity).toFixed(2)}
                      </span>
                      <span className="w-[10%] flex justify-center items-center">
                        <BsTrashFill
                          size={24}
                          className="cursor-pointer"
                          title={"Remove Item"}
                          onClick={() => {
                            if (loginInfo !== null) {
                              if (loggedUser[0] !== undefined) {
                                dispatch(
                                  removeFromCart({
                                    userId: loggedUser[0].id,
                                    cartItemKey: item.cartKey,
                                  })
                                );
                              }
                            } else {
                              props.onDeleteCartItem(item);
                              let newCart = localCart.filter(
                                (i) => Number(i.itemId) !== Number(item.id)
                              );
                              setLocalCart(newCart);
                            }
                          }}
                        />
                      </span>
                    </span>
                  </div>
                );
              })}
              <span className="w-[90%] flex justify-end">
                <div className="w-full md:w-[50%] p-2 flex justify-evenly items-center border-t-2 border-b-2 border-emerald-900 text-lg font-bold text-emerald-800">
                  <span className="text-sm text-black">Amount to Pay</span>${" "}
                  {cartTotal.toFixed(2)}
                </div>
              </span>
              <div
                id="actions"
                className="w-[90%] flex justify-end items-center my-4"
              >
                <button
                  className="bg-emerald-800 hover:bg-emerald-600 active:scale-95 duration-150 text-white font-bold rounded-md py-2 px-3 mx-2 shadow-sm shadow-gray-400"
                  onClick={() => {
                    if (loginInfo === null) {
                      history.push("/auth");
                    } else {
                      setCT(cartTotal);
                      setHeader("This is the last step ");
                      setPlaceOrderToggle(true);
                      window.scrollTo(0, 0);
                    }
                  }}
                >
                  Proceed to Order
                </button>
              </div>
            </div>
          )}
          {cartItems.length > 0 &&
            userInfo !== "loading" &&
            placeOrderToggle && (
              <PlaceOrder
                cartTotal={ct}
                loggedUserInfo={loggedUser[0]}
                onPlaceOrder={placeOrderHandler}
              />
            )}
        </>
      )}
    </div>
  );
};

export default Cart;
