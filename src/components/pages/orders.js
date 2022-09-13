import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { refreshUserAuth, getUserInfo, cancelOrder } from "../../redux/action";

import { AiOutlineArrowLeft, AiOutlineLoading } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

const Orders = () => {
  document.title = "My Orders| eBuy Online Shopping";
  const [loginInfo, setLoginInfo] = useState(
    JSON.parse(localStorage.getItem("userAuth")) || null
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const refreshedLoginData = useSelector((state) => state.LoginReducer);
  const userInfo = useSelector((state) => state.UserDataReducer);

  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showOrderId, setShowOrderId] = useState("");
  const [header, setHeader] = useState("All Orders");
  //Login Check --->
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
  useEffect(() => {
    if (showOrderDetails) {
      setHeader("Order Details");
    } else {
      setHeader("All Orders");
    }
  }, [showOrderDetails]);

  const loggedUser = [];
  if (loginInfo !== null) {
    if (refreshedLoginData === "error") {
      setLoginInfo(null);
      localStorage.removeItem("userAuth");
      history.push("/auth");
    } else {
      for (const key in userInfo) {
        if (userInfo[key].email === loginInfo.email) {
          let userDataVal = { ...userInfo[key], id: key };
          loggedUser.push(userDataVal);
        }
      }
    }
  }
  //<--- Login Check
  let orderItemsArr = [];
  let orderDetails = [];
  if (
    loggedUser[0] !== undefined &&
    loggedUser[0].orderHistory !== null &&
    Object.keys(loggedUser[0].orderHistory)
  ) {
    for (const key in loggedUser[0].orderHistory) {
      orderItemsArr.push({ ...loggedUser[0].orderHistory[key], orderId: key });
    }
  }
  if (showOrderId.length > 0) {
    orderDetails = orderItemsArr.filter((item) => item.orderId === showOrderId);
  }
  return (
    <div className="w-[98%] md:w-4/5 min-h-[65vh] bg-white rounded-md shadow-md shadow-slate-400 flex flex-col items-center justify-start p-4 my-8">
      <div className="text-lg font-bold mb-2 flex items-center">
        <span className="mx-3">{header}</span>
      </div>
      <div className="h-[1px] bg-gray-500 w-full mb-3"></div>

      {userInfo === "loading" && (
        <span className="flex w-full my-24 justify-center item-center">
          <AiOutlineLoading
            size={90}
            className="text-emerald-800 animate-spin"
          />
        </span>
      )}

      {loggedUser[0] !== undefined && userInfo !== "error" && (
        <>
          {userInfo !== "loading" &&
            loggedUser[0].orderHistory !== null &&
            Object.keys(loggedUser[0].orderHistory).length === 0 && (
              <span className="w-full h-[65vh] flex flex-col justify-center items-center">
                <span>
                  <img
                    src={require("../ui/images/hg.gif")}
                    alt="waiting"
                    height="250px"
                    width="180px"
                  />
                </span>
                <p className="text-lg font-bold my-4">
                  We are waiting for your first order
                </p>
              </span>
            )}

          {/* Order Details */}
          {userInfo !== "loading" &&
            showOrderDetails &&
            showOrderId.length > 0 &&
            loggedUser[0].orderHistory !== null &&
            Object.keys(loggedUser[0].orderHistory).length > 0 &&
            orderDetails.length === 1 && (
              <>
                <div className="w-full flex flex-col justify-center items-center">
                  <table id="items" className="w-[95%]">
                    <thead>
                      <tr>
                        <th colSpan="5">Items in this order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails[0].orderItems.map((item, index) => {
                        return (
                          <tr className="border-y-2" key={index}>
                            <td className="w-[20%]">
                              <img
                                src={item.image}
                                alt="item"
                                width="50px"
                                height="50px"
                                className="cursor-pointer"
                                onClick={() => {
                                  history.push(`/${item.id}`);
                                }}
                              />
                            </td>
                            <td
                              className="w-[40%] cursor-pointer"
                              onClick={() => {
                                history.push(`/${item.id}`);
                              }}
                            >
                              <p className="my-5">
                                {item.title.length > 50
                                  ? `${item.title.slice(0, 50)}...`
                                  : item.title}
                              </p>
                            </td>
                            <td className="w-[10%] text-center">
                              x{item.quantity}
                            </td>

                            <td className="w-[30%] text-center">
                              <span className="w-full text-center flex flex-col item-end justify-center text-xs">
                                <details>
                                  <summary className="text-emerald-800 font-bold cursor-pointer">
                                    Price Breakup
                                  </summary>
                                  <p>
                                    <p className="my-2">
                                      <b>Item Price:</b> $
                                      {item.price.toFixed(2)}
                                    </p>
                                    <p className="my-2">
                                      <b>Total Amount: </b>$
                                      {(item.price * item.quantity).toFixed(2)}
                                    </p>
                                  </p>
                                </details>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <span className="w-full flex flex-col md:flex-row justify-center md:justify-between text-center my-5">
                    <span id="address" className="w-full md:w-[33%] my-2">
                      <p className="font-bold">Delivery Address</p>
                      <br />
                      <b>
                        {`${orderDetails[0].orderInfo.address
                          .split(",")
                          .slice(0, 2)}`}
                      </b>
                      <br />
                      {`${orderDetails[0].orderInfo.address
                        .split(",")
                        .slice(2, orderDetails[0].orderInfo.address.length)}`}
                    </span>

                    <span id="payment" className="w-full md:w-[33%] my-2">
                      <p className="font-bold">Total Order Amount</p>
                      <p className="text-emerald-800 font-bold">
                        ${orderDetails[0].totalAmount.toFixed(2)}
                      </p>

                      <br />
                      <p className="font-bold">Payment Method</p>
                      {orderDetails[0].orderInfo.payMethod}
                    </span>

                    <span id="other" className="w-full md:w-[33%] my-2">
                      <p className="font-bold">Order placed on</p>
                      <p>{orderDetails[0].orderInfo.orderDate}</p>
                      <br />
                      <p className="font-bold">Delivery Status</p>
                      <p
                        className={`${
                          orderDetails[0].orderStatus === "Cancelled"
                            ? "text-red-800"
                            : "text-blue-800"
                        } font-semibold`}
                      >
                        {orderDetails[0].orderStatus}
                      </p>
                    </span>
                  </span>
                  <span className="w-full flex justify-center md:justify-between my-5">
                    <button
                      className="flex items-center justify-center px-3 text-emerald-800 font-bold"
                      onClick={() => {
                        setShowOrderDetails(false);
                        setShowOrderId("");
                      }}
                    >
                      <AiOutlineArrowLeft />
                      &nbsp;All Orders
                    </button>
                    {orderDetails[0].orderStatus !== "Cancelled" && (
                      <button
                        className="flex items-center justify-center px-3 py-2 bg-red-400 font-bold rounded-md shadow-md shadow-gray-300 hover:bg-red-300 active:scale-95 duration-150"
                        onClick={() => {
                          dispatch(
                            cancelOrder({
                              userId: loggedUser[0].id,
                              orderId: orderDetails[0].orderId,
                              updatedOrderDetails: {
                                orderInfo: orderDetails[0].orderInfo,
                                orderItems: orderDetails[0].orderItems,
                                orderStatus: "Cancelled",
                                totalAmount: orderDetails[0].totalAmount,
                              },
                            })
                          );
                        }}
                      >
                        <ImCancelCircle /> &nbsp;Cancel Order
                      </button>
                    )}
                  </span>
                </div>
              </>
            )}

          {/* All Orders */}
          {userInfo !== "loading" &&
            !showOrderDetails &&
            loggedUser[0].orderHistory !== null &&
            Object.keys(loggedUser[0].orderHistory).length > 0 &&
            orderItemsArr.reverse().map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-[95%] flex p-4 justify-between rounded-md shadow-md shadow-gray-300 my-2 cursor-pointer"
                  onClick={() => {
                    setShowOrderId(item.orderId);
                    setShowOrderDetails(true);
                  }}
                >
                  <span className="w-[35%] md:w-[15%] flex justify-center items-center p-2 mx-1">
                    <img
                      src={item.orderItems[0].image}
                      width="80px"
                      alt="product"
                    />
                  </span>
                  <span className="w-[65%] flex flex-col justify-center mx-2">
                    <span>
                      {item.orderItems.length > 1 && (
                        <p>{`${item.orderItems[0].title.slice(0, 50)}${
                          item.orderItems[0].title.length > 50 ? "..." : ""
                        } & ${item.orderItems.length - 1} other item${
                          item.orderItems.length > 2 ? "s" : ""
                        }`}</p>
                      )}
                      {item.orderItems.length === 1 && (
                        <p>{`${item.orderItems[0].title.slice(0, 50)}${
                          item.orderItems[0].title.length > 50 ? "..." : ""
                        }`}</p>
                      )}
                    </span>
                    <span
                      className={`text-sm italic ${
                        item.orderStatus !== "Cancelled" ? "" : "text-red-800"
                      }`}
                    >
                      {item.orderStatus !== "Cancelled"
                        ? `Order Placed on ${item.orderInfo.orderDate}`
                        : "Order Cancelled"}
                    </span>
                  </span>
                  <span className="w-[15%] hidden md:flex flex-col justify-center items-end text-center">
                    <p className="text-xs italic font-bold my-2">Total</p>
                    <p className="text-emerald-800 font-bold text-lg">
                      ${item.totalAmount.toFixed(2)}
                    </p>
                  </span>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};
export default Orders;
