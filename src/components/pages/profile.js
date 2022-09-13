import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useHistory } from "react-router-dom";
import {
  addAddress,
  deleteAddress,
  refreshUserAuth,
  updateUserInfo,
} from "../../redux/action";
import { getUserInfo, updatePassword } from "../../redux/action";

import { AddAddress } from "../ui/AddAddress";

import { AiFillDelete, AiOutlineLoading } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiPackage, BiRightArrow } from "react-icons/bi";
import { FcBusinessman } from "react-icons/fc";
import { FaAddressBook, FaCheck, FaEdit } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
//import Orders from "./orders";

export const Profile = () => {
  const [loginInfo, setLoginInfo] = useState(
    JSON.parse(localStorage.getItem("userAuth")) || null
  );
  const [section, setSection] = useState("profile");
  const [docTitle, setDocTitle] = useState("My Profile | eBuy Online Shopping");
  const [nameEdit, setNameEdit] = useState(false);
  const [pwdEdit, setPwdEdit] = useState(false);
  const [showPwdUpdt, setShowPwdUpdt] = useState(false);

  const [showAddAddress, setShowAddAddress] = useState(false);

  const nameUpdateRef = useRef();
  const pwdEditRef = useRef();

  document.title = docTitle;
  const refreshedLoginData = useSelector((state) => state.LoginReducer);
  let userInfo = useSelector((state) => state.UserDataReducer);

  const pwdUpdated = useSelector((state) => state.UpdatePasswordReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(
    () => {
      if (loginInfo !== null) {
        dispatch(refreshUserAuth({ idToken: loginInfo.idToken }));
        dispatch(getUserInfo());
      } else {
        history.push("/auth");
      }
    },
    // eslint-disable-next-line
    []
  );
  const loggedUser = [];
  const loggedUserAddresses = [];
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
          if (loggedUser[0].address !== "") {
            for (const addId in loggedUser[0].address) {
              let luAddDataVal = {
                ...loggedUser[0].address[addId],
                addId: addId,
              };
              loggedUserAddresses.push(luAddDataVal);
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    if (pwdUpdated !== "error" && pwdUpdated["data"] !== undefined) {
      localStorage.setItem("userAuth", JSON.stringify(pwdUpdated["data"]));
      setLoginInfo(pwdUpdated["data"]);
      setShowPwdUpdt(true);
      setPwdEdit(false);
      pwdUpdated["data"] = undefined;
    }
  }, [pwdUpdated]);

  const dispatchAddHandler = (address) => {
    dispatch(
      addAddress({
        userId: loggedUser[0].id,
        address: address,
      })
    );
    setShowAddAddress(false);
  };

  return (
    <div
      id="product-main-container"
      className={`w-[98%] md:w-4/5 ${
        (userInfo === "loading" && loggedUser[0] === undefined) ||
        pwdUpdated === "loading"
          ? "h-[70vh]"
          : "h-auto"
      } bg-white rounded-md shadow-md shadow-slate-400 flex flex-col items-center justify-center p-4 my-8`}
    >
      {/*Loader Start*/}
      <div
        className={`${
          userInfo === "loading" ||
          pwdUpdated === "loading" ||
          loggedUser[0] === undefined
            ? "flex"
            : "hidden"
        } justify-center items-center text-[80px] text-emerald-800`}
      >
        <AiOutlineLoading className="animate-spin" />
      </div>
      {/*Loader End*/}

      {userInfo !== "loading" &&
        pwdUpdated !== "loading" &&
        loggedUser[0] !== undefined && (
          <div
            className={`flex w-full flex-col md:flex-row min-h-[70vh] h-auto justify-center items-center md:items-start`}
          >
            <div
              className={`${showPwdUpdt ? "fixed" : "hidden"} ${
                showPwdUpdt
                  ? setTimeout(() => {
                      setShowPwdUpdt(false);
                    }, 3000)
                  : ""
              }} z-20 top-32  bg-emerald-800  text-white rounded-md shadow-md shadow-gray-400 p-4`}
            >
              <span className="flex w-full justify-center items-center">
                <BsCheckCircleFill size={20} />
                &nbsp; Password Updated !
              </span>
            </div>

            <div className="w-full md:w-[40%] flex-col h-full justify-center items-center  md:border-r-2 border-gray-400">
              <div className="flex justify-center md:justify-start items-center w-full md:w-[80%] my-4 border-b border-gray-400 md:mr-2">
                <div className="flex w-auto mx-2 items-center justify-center text-[40px]">
                  <FcBusinessman />
                </div>
                <div className="flex flex-col w-auto mx-2 items-start">
                  <span className="text-xs">Hello,</span>
                  <span className="text-lg font-bold">
                    {loggedUser[0].fullName}
                  </span>
                </div>
              </div>

              <div className="flex md:flex-col w-full justify-center md:items-start items-center">
                <div
                  onClick={() => {
                    setSection("profile");
                    setDocTitle("My Profile");
                  }}
                  className={`flex flex-col md:flex-row w-[80%] justify-center md:justify-between items-center text-[30px] md:text-lg text-gray-500 my-2 py-3 border-b border-gray-400 cursor-pointer hover:text-emerald-600 ${
                    section === "profile" && "font-bold text-emerald-600"
                  }`}
                >
                  <span className="flex w-[90%] justify-center md:justify-start items-center">
                    <CgProfile />
                    <span className="ml-3 hidden md:block">MY PROFILE</span>
                  </span>
                  {section === "profile" && (
                    <span className="hidden md:block">
                      <BiRightArrow />
                    </span>
                  )}
                </div>

                <div
                  onClick={() => {
                    setSection("address");
                    setDocTitle("My Addresses | eBuy Online Shopping");
                  }}
                  className={`flex flex-col md:flex-row w-[80%] justify-center md:justify-between items-center text-[30px] md:text-lg text-gray-500 my-2 py-3 border-b border-gray-400 cursor-pointer hover:text-emerald-600 ${
                    section === "address" && "font-bold text-emerald-600"
                  }`}
                >
                  <span className="flex w-[90%] justify-center md:justify-start items-center">
                    <FaAddressBook />
                    <span className="ml-3 hidden md:block">MY ADDRESSES</span>
                  </span>
                  {section === "address" && (
                    <span className="hidden md:block">
                      <BiRightArrow />
                    </span>
                  )}
                </div>

                <div
                  onClick={() => {
                    //setSection("orders");
                    //setDocTitle("My Orders");
                    history.push("/orders");
                  }}
                  className={`flex flex-col md:flex-row w-[80%] justify-center md:justify-between items-center text-[30px] md:text-lg text-gray-500 my-2 py-3 border-b border-gray-400 cursor-pointer hover:text-emerald-600 ${
                    section === "orders" && "font-bold text-emerald-600"
                  }`}
                >
                  <span className="flex w-[90%] justify-center md:justify-start items-center">
                    <BiPackage />
                    <span className="ml-3 hidden md:block">MY ORDERS</span>
                  </span>
                  {section === "orders" && (
                    <span className="hidden md:block">
                      <BiRightArrow />
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full md:w-[60%] flex md:flex-col justify-center items-center">
              {section === "profile" && (
                <div className="flex flex-col w-full justify-center items-center">
                  <span className="flex flex-col w-[80%] my-4">
                    <label className="">Full Name</label>
                    <span className="flex w-full items-center">
                      {nameEdit ? (
                        <input
                          type="text"
                          className="w-[75%] border-b border-emerald-800 my-2 py-3 outline-none"
                          disabled={!nameEdit}
                          ref={nameUpdateRef}
                        />
                      ) : (
                        <input
                          type="text"
                          className="w-[75%] border-b border-emerald-800 my-2 py-3 outline-none text-gray-500"
                          disabled={!nameEdit}
                          ref={nameUpdateRef}
                          value={loggedUser[0].fullName}
                        />
                      )}

                      <button
                        onClick={() => {
                          setNameEdit(true);
                        }}
                        className={`mx-3 ${
                          nameEdit ? "hidden" : "flex"
                        } justify-center items-center bg-emerald-800 text-white px-3 py-2 rounded-md active:scale-95 duration-150 hover:bg-emerald-600`}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          if (nameUpdateRef.current.value.trim().length > 0) {
                            setNameEdit(false);
                            window.scrollTo(0, 0);
                            loggedUser[0].fullName =
                              nameUpdateRef.current.value;
                            dispatch(updateUserInfo(loggedUser[0]));
                          }
                        }}
                        className={`mx-3 ${
                          nameEdit ? "flex" : "hidden"
                        } justify-center items-center bg-emerald-800 text-white px-3 py-2 rounded-md active:scale-95 duration-150 hover:bg-emerald-600`}
                      >
                        <FaCheck />
                      </button>
                    </span>
                  </span>
                  <span className="flex flex-col w-[80%] my-4">
                    <label className="">Registered Email</label>
                    <span className="flex w-full items-center">
                      <input
                        type="text"
                        className="w-[75%] text-gray-500 border-b border-emerald-800 my-2 py-3 outline-none"
                        value={loggedUser[0].email}
                        disabled={true}
                      />
                    </span>
                  </span>

                  <span className="flex flex-col w-[80%] my-2">
                    <span className="flex w-full items-center">
                      <input
                        type="password"
                        className={`w-[75%] text-gray-500 border-b border-emerald-800 my-2 py-3 outline-none ${
                          pwdEdit ? "block" : "hidden"
                        }`}
                        placeholder="Enter New Password"
                        ref={pwdEditRef}
                      />
                    </span>
                    <span className="flex w-full items-center">
                      <button
                        className={`mt-5 px-3 py-2 rounded-md shadow-md shadow-gray-400 bg-emerald-800 text-white font-bold hover:bg-emerald-600 hover:scale-105 duration-150 active:scale-95`}
                        onClick={() => {
                          if (pwdEdit) {
                            if (pwdEditRef.current.value.trim().length > 8) {
                              dispatch(
                                updatePassword({
                                  idToken: loginInfo.idToken,
                                  password: pwdEditRef.current.value,
                                })
                              );
                            }
                            window.scrollTo(0, 0);
                          } else {
                            setPwdEdit(true);
                          }
                        }}
                      >
                        Change Password
                      </button>
                    </span>
                  </span>
                </div>
              )}

              {/* {section === "orders" && history.push("/orders")} */}

              {section === "address" && (
                <div className="flex flex-col w-full justify-center items-center">
                  <AddAddress
                    class={`${showAddAddress ? "flex" : "hidden"}`}
                    setAddressData={dispatchAddHandler}
                  />
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
                  {loggedUserAddresses.length === 0 && (
                    <div className="flex justify-center items-center w-full text-center my-8 p-4">
                      No Address Found
                      <br />
                      Add a new address for your orders.
                    </div>
                  )}
                  {loggedUserAddresses.length > 0 &&
                    loggedUserAddresses.map((address) => {
                      return (
                        <div
                          id="address-items"
                          key={address.addId}
                          className="flex justify-between items-center w-[80%] border-b border-gray-500 p-4 my-3"
                        >
                          <span className="flex flex-col w-[80%] justify-center items-start flex-wrap">
                            <span className="font-bold my-2">
                              {address.fullname} | {address.mobno}
                            </span>
                            <span>
                              {`${address.address}, ${address.district} - ${address.pincode}`}
                            </span>
                          </span>
                          <span className="w-[20%] flex justify-end items-center">
                            <AiFillDelete
                              color="#065f46"
                              size={24}
                              title="Delete Address"
                              className="cursor-pointer"
                              onClick={() => {
                                dispatch(
                                  deleteAddress({
                                    userId: loggedUser[0].id,
                                    addId: address.addId,
                                  })
                                );
                              }}
                            />
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}

              {(section !== "profile" ||
                section !== "orders" ||
                section !== "address") && <div></div>}
            </div>
          </div>
        )}
    </div>
  );
};
