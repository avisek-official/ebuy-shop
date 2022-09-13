import { useRef, useState } from "react";

import { AiOutlineLoading } from "react-icons/ai";

export const AddAddress = (props) => {
  const nameRef = useRef();
  const mobileRef = useRef();
  const addressRef = useRef();
  const pincodeRef = useRef();
  const cityRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const [pinError, setPinError] = useState(false);
  const [mobError, setMobError] = useState(false);
  const [fNameErr, setfNameErr] = useState(false);
  const [addressErr, setaddressErr] = useState(false);

  const validatePinPhn = (value) => {
    if (
      Number.isInteger(Number(value)) &&
      Number(value) >= 0 &&
      !value.includes(["+", "-"])
    ) {
      return true;
    } else {
      return false;
    }
  };

  const pincodeHandler = async (e) => {
    setPinError(false);
    if (e.target.value.length === 6) {
      const pincode = e.target.value;
      if (validatePinPhn(pincode)) {
        setIsLoading(true);
        try {
          let cityData = await fetch(
            `https://api.postalpincode.in/pincode/${pincode}`
          );
          cityData = await cityData.json();
          if (cityData[0].Status === "Success") {
            const district = await cityData[0].PostOffice[0].District;
            cityRef.current.value = district;
          } else {
            setPinError(true);
            cityRef.current.value = "";
          }
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
      } else {
        setPinError(true);
      }
    }
  };

  const phnHandler = (e) => {
    setMobError(false);
    if (e.target.value.length === 10) {
      const mobNo = e.target.value;
      if (!validatePinPhn(mobNo)) {
        setMobError(true);
        console.log('here');
      } else {
        setMobError(false);
      }
    }
  };

  const submitAddress = () => {
    if (nameRef.current.value.trim().length <= 0) {
      setfNameErr(true);
    } else if (mobileRef.current.value.trim().length < 10 && !mobError) {
      setMobError(true);
      console.log(mobileRef.current.value.trim().length);
    } else if (addressRef.current.value.trim().length <= 0) {
      setaddressErr(true);
    } else if (pincodeRef.current.value.trim().length < 6 && !pinError) {
      setPinError(true);
    } else if (!fNameErr && !addressErr && !mobError && !pinError) {
      let addressData = {
        fullname: nameRef.current.value,
        mobno: mobileRef.current.value,
        address: addressRef.current.value,
        district: cityRef.current.value,
        pincode: pincodeRef.current.value,
      }
      props.setAddressData(addressData);
    }
  };

  return (
    <div className={`${props.class} flex-col w-[90%]`}>
      <span className="w-full md:flex-wrap  flex flex-col md:flex-row justify-between">
        <input
          type="text"
          className={`w-full md:w-[46%] border-b ${
            fNameErr ? "border-red-600" : "border-emerald-800"
          } my-2 md:mx-2 py-2 outline-none`}
          placeholder="Enter Name"
          ref={nameRef}
          onChange={() => {
            setfNameErr(false);
          }}
        />
        <input
          type="text"
          maxLength={10}
          className={`w-full md:w-[46%] border-b ${
            mobError ? "border-red-600" : "border-emerald-800"
          } my-2 py-2 md:mx-2 outline-none`}
          placeholder="Enter Mobile No."
          ref={mobileRef}
          onChange={phnHandler}
        />
      </span>

      <input
        type="text"
        className={`border-b ${
          addressErr ? "border-red-600" : "border-emerald-800"
        } my-2 py-2 md:mx-2 outline-none`}
        placeholder="Enter Address"
        ref={addressRef}
        onChange={() => {
          setaddressErr(false);
        }}
      />
      <span className="w-full md:flex-wrap  flex flex-col md:flex-row justify-between">
        <input
          type="text"
          maxLength="6"
          className={`w-full md:w-[46%] border-b ${
            pinError ? "border-red-600" : "border-emerald-800"
          } my-2 py-2 md:mx-2 outline-none`}
          placeholder="Enter PIN Code"
          ref={pincodeRef}
          onChange={pincodeHandler}
        />
        {isLoading && (
          <span className="flex w-[2%] justify-center items-center">
            <AiOutlineLoading className="animate-spin" />
          </span>
        )}
        <input
          type="text"
          className="w-full md:w-[46%] border-b border-emerald-800 my-2 py-2 md:mx-2 outline-none"
          placeholder="City / District"
          readOnly
          ref={cityRef}
        />
      </span>
      <span className="w-full flex justify-center items-center">
        <button
          className={`mt-5 px-3 py-2 rounded-md shadow-md shadow-gray-400 bg-emerald-800 text-white font-bold hover:bg-emerald-600 hover:scale-105 duration-150 active:scale-95`}
          onClick={submitAddress}
          disabled={isLoading}
        >
          + Add New Address
        </button>
      </span>
    </div>
  );
};
