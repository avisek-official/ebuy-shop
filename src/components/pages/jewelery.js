import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import {
  getAllProducts,
  sortAllProductsLH,
  sortAllProductsHL,
} from "../../redux/action";
import SkeletonLoader from "../ui/SkeletonLoader";

export const Jewelery = () => {
  document.title = "Buy Jewelery online at eBuy";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const products = useSelector((state) => [state.allProductReducer]);
  const productItems = products[0];
  const jeweleryItems = productItems.filter(
    (item) => item.category === "jewelery"
  );

  const sortHandler = (e) => {
    if (e.target.value === "lh") {
      dispatch(sortAllProductsLH());
    } else if (e.target.value === "hl") {
      dispatch(sortAllProductsHL());
    }
  };

  return (
    <div
      id="product-main-container"
      className="w-[98%] h-auto bg-white rounded-md shadow-md shadow-slate-400 flex flex-col items-center justify-center p-4 my-8"
    >
      <div
        id="top-bar"
        className="w-full flex flex-col md:flex-row justify-between items-center mb-2"
      >
        <span>Total No. of items: {jeweleryItems.length}</span>
        <span className="flex justify-end items-center mt-3 md:mt-0">
          Sort by
          <select
            className="p-2 mx-2 border outline-none cursor-pointer"
            onChange={sortHandler}
          >
            <option value="">-- Select Option --</option>
            <option value="lh">Price Low - High</option>
            <option value="hl">Price High - Low</option>
          </select>
        </span>
      </div>
      <div className="h-[1px] bg-gray-500 w-full mb-3"></div>
      {jeweleryItems.length === 0 && <SkeletonLoader />}
      {jeweleryItems.length !== 0 && (
        <div
          id="product-container"
          className="w-full flex flex-col md:flex-row md:flex-wrap justify-between"
        >
          {jeweleryItems.map((product) => {
            return (
              <Link
                to={`/${product.id}`}
                key={product.id}
                className="w-full md:w-[18%] h-36 md:h-80 rounded-lg shadow-md shadow-slate-500 flex md:flex-col items-center justify-between p-2 cursor-pointer my-2 hover:text-blue-700 md:hover:scale-105 duration-150 z-10"
              >
                <div className="my-2 flex h-full items-center">
                  <img
                    src={product.image}
                    alt="product-img"
                    height="125px"
                    width="120px"
                  />
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                  <div className="w-[65%] md:w-[80%] my-1 text-center font-bold">
                    {`${product.title.slice(0, 25)}...`}
                  </div>
                  <div className="w-[60%] md:w-[70%] my-1 text-center font-bold text-emerald-800">{`$ ${product.price}`}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
