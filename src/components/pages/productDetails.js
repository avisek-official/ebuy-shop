import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/exports";
import {
  getProdDetails,
  getAllProducts,
  refreshUserAuth,
  getUserInfo,
  addToCart,
} from "../../redux/action";

import { Link } from "react-router-dom";

import { AiFillStar } from "react-icons/ai";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import ProdDetSL from "../ui/ProdDetSL";

const ProductDetails = (props) => {
  const { prod_id } = useParams();
  const dispatch = useDispatch();
  //const history = useHistory();
  const [loginInfo, setLoginInfo] = useState(
    JSON.parse(localStorage.getItem("userAuth")) || null
  );

  useEffect(() => {
    dispatch(getProdDetails(prod_id));
    dispatch(getAllProducts());
  }, [dispatch, prod_id]);

  const productDetails = useSelector((state) => [state.productDetailsReducer]);
  const allProducts = useSelector((state) => state.allProductReducer);
  const refreshedLoginData = useSelector((state) => state.LoginReducer);
  const userInfo = useSelector((state) => state.UserDataReducer);

  if (productDetails[0] !== null) {
    document.title = productDetails[0].title || "eBuy Online Shopping";
  }

  useEffect(
    () => {
      if (loginInfo !== null) {
        dispatch(refreshUserAuth({ idToken: loginInfo.idToken }));
        dispatch(getUserInfo());
      } else {
        //history.push("/auth");
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
  let localCart = props.localCart;
  //view cart button activate
  let alreadyInCart = false;
  if (loginInfo !== null) {
    if (loggedUser[0] !== undefined) {
      if (Object.keys(loggedUser[0].cartItems).length > 0) {
        for (const key in loggedUser[0].cartItems) {
          if (loggedUser[0].cartItems[key].itemId === prod_id) {
            alreadyInCart = true;
            break;
          } else {
            alreadyInCart = false;
          }
        }
      }
    }
  } else {
    if (localCart.length > 0) {
      if (localCart.filter((item) => item.itemId === prod_id).length > 0) {
        alreadyInCart = true;
      } else {
        alreadyInCart = false;
      }
    }
  }
  //console.log(alreadyInCart);
  // Add to cart Process

  const addToCartHandler = () => {
    const itemToAdd = { itemId: prod_id, quantity: 1 };
    if (loginInfo !== null) {
      if (loggedUser[0] !== undefined) {
        dispatch(addToCart({ userId: loggedUser[0].id, item: itemToAdd }));
      }
    } else {
      props.onCartUpdate(itemToAdd);
    }
  };

  return (
    <>
      {productDetails[0] !== null && (
        <>
          <div
            id="product-details-main-container"
            className="w-[98%] h-auto bg-white rounded-md shadow-md shadow-slate-400 flex flex-col items-start justify-start md:flex-row p-2 md:p-4 my-8"
          >
            {productDetails[0].length === 0 ||
              (productDetails[0] === "loading" && <ProdDetSL />)}

            {productDetails[0].length !== 0 && productDetails[0] !== "loading" && (
              <>
                <div className="w-full md:w-[40%] flex flex-col justify-start items-center h-full p-5">
                  <div className="w-2/5 h-3/5 md:w-3/5 md:h-4/5 flex hover:scale-110 duration-150 cursor-pointer items-start my-5">
                    <img src={productDetails[0].image} alt="product-img" />
                  </div>
                </div>
                <div className="w-full md:w-[60%] h-full flex flex-col justify-start items-center md:items-start p-5">
                  <h1 className="md:text-2xl font-bold tracking-wider text-center md:text-left">
                    {productDetails[0].title}
                  </h1>
                  <div
                    id="rating"
                    className="flex justify-center items-center md:justify-start w-full my-2"
                  >
                    <span
                      className={`${
                        productDetails[0].rating.rate <= 2 && "bg-red-700"
                      } ${
                        productDetails[0].rating.rate > 2 &&
                        productDetails[0].rating.rate <= 3.5 &&
                        "bg-yellow-600"
                      } ${
                        productDetails[0].rating.rate > 3.5 && "bg-green-700"
                      } 
                text-white font-bold py-0.5 px-2 rounded-lg shadow-md shadow-slate-400 mr-4 flex justify-center items-center`}
                    >
                      <h1 className="mx-1">{productDetails[0].rating.rate}</h1>
                      <AiFillStar />
                    </span>
                    <span className="font-bold text-gray-600">
                      {productDetails[0].rating.count} Ratings
                    </span>
                  </div>
                  <div
                    id="price"
                    className="text-3xl font-semibold text-emerald-800 my-4"
                  >
                    $ {productDetails[0].price}
                  </div>
                  <div id="addtocart" className="my-3">
                    {!alreadyInCart && (
                      <button
                        className="bg-emerald-800 text-white font-bold text-lg px-5 py-2 rounded-md shadow-md shadow-slate-300 hover:bg-emerald-600 hover:scale-105 duration-150 active:scale-95 flex justify-center items-center"
                        onClick={addToCartHandler}
                      >
                        <BsFillCartPlusFill />{" "}
                        <p className="mx-2">ADD TO CART</p>
                      </button>
                    )}
                    {alreadyInCart && (
                      <Link
                        to={"/cart"}
                        className="bg-emerald-800 text-white font-bold text-lg px-5 py-2 rounded-md shadow-md shadow-slate-300 hover:bg-emerald-600 hover:scale-105 duration-150 active:scale-95 flex justify-center items-center"
                      >
                        <BsFillCartCheckFill />{" "}
                        <p className="mx-2">VIEW CART</p>
                      </Link>
                    )}
                  </div>
                  <div
                    id="description"
                    className="text-justify tracking-wider my-3 p-1 md:p-0 leading-8"
                  >
                    <p className="text-center md:text-left">
                      <b>Product Description: </b>
                    </p>
                    <p className="whitespace-pre-line">
                      {productDetails[0].description}
                    </p>
                  </div>
                </div>
              </>
            )}
            {productDetails[0].length === 0 && productDetails[0] !== "loading" && (
              <div className="w-full h-[75vh] flex justify-center items-center">
                <img
                  src={require(`../ui/images/error-404.png`)}
                  alt="ERROR 404"
                />
              </div>
            )}
          </div>
          {allProducts.length !== 0 && productDetails[0].length !== 0 && (
            <div
              id="same-cat-product-container"
              className="w-[98%] p-4 flex flex-col items-center justify-center rounded-md my-2 bg-white shadow-md shadow-gray-400"
            >
              <div className="text-lg font-bold mb-2">
                You might be interested in
              </div>
              <div className="h-[1px] bg-gray-500 w-full mb-3"></div>
              <div className="w-full flex flex-col md:flex-row justify-evenly">
                {allProducts
                  .filter(
                    (item) =>
                      item.category === productDetails[0].category &&
                      item.id !== productDetails[0].id
                  )
                  .map((item) => {
                    return (
                      <Link
                        to={`/${item.id}`}
                        key={item.id}
                        className="w-full md:w-[18%] h-36 md:h-80 rounded-lg shadow-md shadow-slate-500 flex md:flex-col items-center justify-between p-2 cursor-pointer my-2 hover:text-blue-700 md:hover:scale-105 duration-150 z-10"
                      >
                        <div className="my-2 flex h-full items-center">
                          <img
                            src={item.image}
                            alt="product-img"
                            height="125px"
                            width="100px"
                          />
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                          <div className="w-[65%] md:w-[80%] my-1 text-center font-bold">
                            {`${item.title.slice(0, 25)}...`}
                          </div>
                          <div className="w-[60%] md:w-[70%] my-1 text-center font-bold text-emerald-800">{`$ ${item.price}`}</div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}
      {productDetails[0] === null && (
        <div
          id="product-details-main-container"
          className="w-[98%] h-auto bg-white rounded-md shadow-md shadow-slate-400 flex flex-col items-center justify-center md:flex-row p-4 my-8"
        >
          <div className="w-full h-[75vh] flex justify-center items-center">
            <img src={require(`../ui/images/error-404.png`)} alt="ERROR 404" />
          </div>
        </div>
      )}
    </>
  );
};
export default ProductDetails;
