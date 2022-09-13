import { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

import { addAddress } from "../../redux/action";

import { AddAddress } from "./AddAddress";

const PlaceOrder = (props) => {
  document.title = "Place Order | eBuy Online Shopping";
  const dispatch = useDispatch();
  let addressArr = [];
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addSelected, setAddSelected] = useState(false);
  const [cardNo, setCardNo] = useState("");
  const [cvv, setCVV] = useState("");
  if (
    props.loggedUserInfo !== undefined &&
    Object.keys(props.loggedUserInfo.address).length > 0
  ) {
    for (const key in props.loggedUserInfo.address) {
      addressArr.push(props.loggedUserInfo.address[key]);
    }
  }
  const selectAddressHandler = (e) => {
    setSelectedAddress(e.target.value);
    setAddSelected(true);
    setAlertToast(false);
  };
  const payMethodHandler = (e) => {
    setSelectedPaymentMethod(e.target.value);
    setAlertToast(false);
  };

  //Date Formation
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  //Date Formation

  const dispatchAddHandler = (address) => {
    dispatch(
      addAddress({
        userId: props.loggedUserInfo.id,
        address: address,
      })
    );
    setShowAddAddress(false);
  };

  const [alertToast, setAlertToast] = useState(false);
  const [alertErrorMsg, setAlertErrorMsg] = useState("");

  return (
    <div className="w-full flex flex-col items-start justify-center">
      {/* Alert */}
      <span className="w-full flex justify-center">
        <div
          className={`${
            alertToast ? "fixed" : "hidden"
          } z-20 top-32 bg-red-200  text-red-900 w-[90%] md:w-auto rounded-md shadow-md shadow-gray-400 p-4`}
        >
          <span className="flex w-full justify-center items-center">
            <BsXCircleFill size={20} className="w-[15%]" />
            &nbsp; <p className="w-[85%]">{alertErrorMsg}</p>
          </span>
        </div>
      </span>
      <div className="flex flex-col md:flex-row w-full justify-center">
        <div className="w-full md:w-1/2 flex flex-col p-4 justify-center items-center md:justify-start border-b-2 md:border-b-0 md:border-r-2 border-emerald-800">
          <span className="font-bold tracking-wider">
            Select Delivery Address
          </span>
          <span
            className={`${
              addSelected ? "" : "hidden"
            } flex w-[95%] justify-between h-[30vh] items-center`}
          >
            <span className="w-[70%] flex flex-col">
              <b>{`${selectedAddress.toString().split(",").slice(0, 2)}`}</b>

              {`${selectedAddress
                .toString()
                .split(",")
                .slice(2, selectedAddress.length)}`}
            </span>
            <span className="w-[20%] flex justify-center p-3">
              <button
                className="bg-emerald-800 rounded-md shadow-md shadow-gray-400 px-4 py-1 text-white mx-2 active:scale-95 duration-150"
                onClick={() => {
                  setAddSelected(false);
                  setSelectedAddress([]);
                }}
              >
                Change
              </button>
            </span>
          </span>
          <span className={`${!addSelected ? "" : "hidden"}`}>
            {addressArr.length > 0 &&
              addressArr.map((address, index) => {
                return (
                  <span
                    key={index}
                    className="flex w-full justify-start items-center"
                  >
                    <input
                      className="w-[10%] h-5"
                      type="radio"
                      name="address"
                      value={`${address.fullname}, ${address.mobno}, ${address.address}, ${address.district} - ${address.pincode}`}
                      checked={
                        selectedAddress ===
                        `${address.fullname}, ${address.mobno}, ${address.address}, ${address.district} - ${address.pincode}`
                      }
                      onChange={selectAddressHandler}
                    />
                    <div
                      id="address-items"
                      className="flex justify-between items-center w-[80%] border-b border-gray-500 p-4 my-3"
                    >
                      <span className="flex flex-col w-[90%] justify-center items-start flex-wrap">
                        <span className="font-bold my-2">
                          {address.fullname} | {address.mobno}
                        </span>
                        <span>
                          {`${address.address}, ${address.district} - ${address.pincode}`}
                        </span>
                      </span>
                    </div>
                  </span>
                );
              })}

            <span className="w-full flex justify-center">
              <button
                className={`mt-5 px-3 py-2 rounded-md shadow-md shadow-gray-400 bg-emerald-800 text-white font-bold hover:bg-emerald-600 hover:scale-105 duration-150 active:scale-95 ${
                  showAddAddress && "hidden"
                }`}
                onClick={() => {
                  if (showAddAddress) {
                  } else {
                    setShowAddAddress(true);
                  }
                }}
              >
                + Add New Address
              </button>
              <AddAddress
                class={`${showAddAddress ? "flex" : "hidden"}`}
                setAddressData={dispatchAddHandler}
              />
            </span>
          </span>
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center md:justify-start">
          <span className="font-bold tracking-wider">
            Select Payment Method
          </span>
          <span className="tracking-wide w-[90%] md:w-auto flex justify-center items-center my-2 p-4 bg-gradient-to-tr from-emerald-200 to-emerald-50 rounded-md shadow-md shadow-gray-300">
            <p>Amount to Pay: &nbsp;</p>
            <p className="text-lg font-bold text-emerald-900">
              ${props.cartTotal.toFixed(2)}
            </p>
          </span>
          <span className="w-[90%] flex justify-start items-center my-5">
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery (COD)"
              checked={selectedPaymentMethod === "Cash on Delivery (COD)"}
              onChange={payMethodHandler}
              className="h-5 mx-2"
            />
            Cash on Delivery (COD)
          </span>

          <span className="w-[90%] flex justify-start items-center my-5">
            <input
              type="radio"
              name="paymentMethod"
              value="Paid using Card"
              checked={selectedPaymentMethod === "Paid using Card"}
              onChange={payMethodHandler}
              className="h-5 mx-2"
            />
            Pay using Card
          </span>
          {selectedPaymentMethod === "Paid using Card" && (
            <span className="w-[80%] flex flex-col justify-start items-start my-5">
              <input
                type="text"
                maxLength="19"
                value={cardNo}
                className="border w-full my-3 px-4 py-2 rounded-md shadow-sm shadow-gray-300 outline-emerald-500"
                placeholder="Enter Card No."
                onChange={(e) => {
                  setCardNo(e.target.value);
                }}
              />

              <input
                type="text"
                maxLength="3"
                value={cvv}
                className="border w-[40%] my-3 px-4 py-2 rounded-md shadow-sm shadow-gray-300 outline-emerald-500"
                placeholder="Enter CVV"
                onChange={(e) => {
                  setCVV(e.target.value);
                }}
              />
            </span>
          )}
        </div>
      </div>
      <span className="w-full flex justify-end">
        <button
          className="mt-5 px-3 py-2 rounded-md shadow-md shadow-gray-400 bg-emerald-800 text-white font-bold hover:bg-emerald-600 hover:scale-105 duration-150 active:scale-95"
          onClick={() => {
            if (selectedAddress.length > 0 && selectedPaymentMethod !== "") {
              if (selectedPaymentMethod === "Paid using Card") {
                if (
                  cardNo === "" ||
                  cardNo.trim().length < 13 ||
                  cvv === "" ||
                  cvv.trim().length < 3
                ) {
                  setAlertToast(true);
                  setAlertErrorMsg("Please Enter Proper Card Details");
                  setTimeout(() => {
                    setAlertToast(false);
                  }, 3000);
                } else {
                  props.onPlaceOrder({
                    address: selectedAddress,
                    payMethod: selectedPaymentMethod,
                    orderDate: formattedToday,
                  });
                }
              } else {
                props.onPlaceOrder({
                  address: selectedAddress,
                  payMethod: selectedPaymentMethod,
                  orderDate: formattedToday,
                });
              }
            } else {
              setAlertToast(true);
              if (selectedAddress.length <= 0 && selectedPaymentMethod !== "") {
                setAlertErrorMsg("Select A Delivery Address");
              }

              if (
                selectedAddress.length > 0 &&
                selectedPaymentMethod.length <= 0
              ) {
                setAlertErrorMsg("Select A Payment Method");
              }

              if (selectedAddress.length <= 0 && selectedPaymentMethod === "") {
                setAlertErrorMsg("Select A Delivery Address & Payment Method");
              }
              setTimeout(() => {
                setAlertToast(false);
              }, 3000);
            }
          }}
        >
          Place Order
        </button>
      </span>
    </div>
  );
};
export default PlaceOrder;
