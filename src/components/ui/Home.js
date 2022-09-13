import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../redux/action";

import SkeletonLoader from "./SkeletonLoader";

const Home = () => {
  document.title = "eBuy Online Shopping";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const products = useSelector((state) => [state.allProductReducer]);
  const productItems = products[0];
  const topDeal = [
    productItems[2],
    productItems[6],
    productItems[14],
    productItems[16],
    productItems[19],
  ];

  const electronicItems = productItems.filter(
    (product) => product.category === "electronics"
  );
  return (
    <>
      <div
        id="top-deal"
        className="w-[98%] p-4 flex flex-col items-center justify-center my-2 bg-white shadow-md shadow-gray-400"
      >
        <div className="text-lg font-bold mb-2">Top Deals</div>
        <div className="h-[1px] bg-gray-500 w-full mb-3"></div>
        {productItems.length === 0 && <SkeletonLoader />}
        {productItems.length !== 0 && (
          <div
            id="product-container"
            className="w-full flex flex-col md:flex-row justify-between"
          >
            {topDeal.map((product) => {
              return (
                <Link
                  to={`/${product.id}`}
                  key={product.id}
                  className="w-full md:w-[18%] h-36 md:h-80 rounded-lg shadow-md shadow-slate-500 flex md:flex-col items-center justify-between p-2 cursor-pointer hover:text-blue-700 md:hover:scale-105 duration-150 z-10 my-2"
                >
                  <div className="my-2 flex h-full items-center">
                    <img
                      src={product.image}
                      alt="product-img"
                      height="125px"
                      width="130px"
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
      {productItems.length !== 0 && (
        <div
          id="best-electronics"
          className="w-[98%] p-4 flex flex-col items-center justify-center my-2 bg-white shadow-md shadow-gray-400"
        >
          <div className="text-lg font-bold mb-2">Best in Electronics</div>
          <div className="h-[1px] bg-gray-500 w-full mb-3"></div>
          <div
            id="product-container"
            className="w-full flex flex-col md:flex-row justify-between"
          >
            {electronicItems.slice(1, 6).map((product) => {
              return (
                <Link
                  to={`/${product.id}`}
                  key={product.id}
                  className="w-full md:w-[18%] h-36 md:h-80 rounded-lg shadow-md shadow-slate-500 flex md:flex-col items-center justify-between p-2 cursor-pointer hover:text-blue-700 md:hover:scale-105 duration-150 z-10 my-2"
                >
                  <div className="my-2 flex h-full items-center">
                    <img
                      src={product.image}
                      alt="product-img"
                      height="125px"
                      width="130px"
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
        </div>
      )}
    </>
  );
};
export default Home;
