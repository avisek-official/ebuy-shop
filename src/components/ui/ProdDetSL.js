const ProdDetSL = () => {
  return (
    <>
      <div className="w-full md:w-[40%] flex flex-col justify-center items-center h-full p-5">
        <div className="w-[90%] md:w-[90%] h-56 md:h-80 my-2 bg-gray-300 animate-pulse"></div>
      </div>
      <div className="w-full md:w-[60%] h-full flex flex-col justify-start items-center md:items-start p-5">
        <div className="h-6 w-[90%] bg-gray-300 animate-pulse"></div>
        <div
          id="rating"
          className="flex justify-center items-center md:justify-start w-full my-2"
        >
          <span
            className={`py-0.5 px-2 h-7 w-[7%] bg-gray-300 animate-pulse my-4 flex`}
          ></span>
        </div>
        <div
          id="price"
          className="py-0.5 px-2 h-12 w-[18%] bg-gray-300 animate-pulse my-4 flex"
        ></div>
        <div
          id="addtocart"
          className="py-0.5 px-2 h-10 w-[24%] bg-gray-300 animate-pulse my-4 flex"
        ></div>
        <div
          id="description"
          className="py-0.5 px-2 h-36 w-[90%] bg-gray-300 animate-pulse my-4 flex"
        ></div>
      </div>
    </>
  );
};
export default ProdDetSL;
