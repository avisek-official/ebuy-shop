const SkeletonLoader = () => {
  return (
    <div
      id="skeleton-loader"
      className="w-full flex flex-col md:flex-row justify-between"
    >
      <div className="w-full md:w-[18%] h-24 md:h-48 rounded-lg shadow-md shadow-slate-500 flex md:flex-col items-center justify-center p-2">
        <div className="w-1/3 md:w-2/3 h-20 md:h-24 my-2 bg-gray-400 animate-pulse"></div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-[65%] md:w-[80%] h-4 my-1 bg-gray-400 animate-pulse"></div>
          <div className="w-[60%] md:w-[70%] h-4 my-1 bg-gray-400 animate-pulse"></div>
        </div>
      </div>
      <div className="w-full md:w-[18%] h-24 md:h-48 rounded-lg shadow-md shadow-slate-500 md:flex-col items-center justify-center p-2 flex">
        <div className="w-1/3 md:w-2/3 h-20 md:h-24 my-2 bg-gray-400 animate-pulse"></div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-[65%] md:w-[80%] h-4 my-1 bg-gray-400 animate-pulse"></div>
          <div className="w-[60%] md:w-[70%] h-4 my-1 bg-gray-400 animate-pulse"></div>
        </div>
      </div>
      <div className="w-full md:w-[18%] h-24 md:h-48 rounded-lg shadow-md shadow-slate-500 hidden md:flex md:flex-col items-center justify-center p-2">
        <div className="w-1/3 md:w-2/3 h-20 md:h-24 my-2 bg-gray-400 animate-pulse"></div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-[65%] md:w-[80%] h-4 my-1 bg-gray-400 animate-pulse"></div>
          <div className="w-[60%] md:w-[70%] h-4 my-1 bg-gray-400 animate-pulse"></div>
        </div>
      </div>
      <div className="w-full md:w-[18%] h-24 md:h-48 rounded-lg shadow-md shadow-slate-500 hidden md:flex md:flex-col items-center justify-center p-2">
        <div className="w-1/3 md:w-2/3 h-20 md:h-24 my-2 bg-gray-400 animate-pulse"></div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-[65%] md:w-[80%] h-4 my-1 bg-gray-400 animate-pulse"></div>
          <div className="w-[60%] md:w-[70%] h-4 my-1 bg-gray-400 animate-pulse"></div>
        </div>
      </div>
      <div className="w-full md:w-[18%] h-24 md:h-48 rounded-lg shadow-md shadow-slate-500 hidden md:flex md:flex-col items-center justify-center p-2">
        <div className="w-1/3 md:w-2/3 h-20 md:h-24 my-2 bg-gray-400 animate-pulse"></div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-[65%] md:w-[80%] h-4 my-1 bg-gray-400 animate-pulse"></div>
          <div className="w-[60%] md:w-[70%] h-4 my-1 bg-gray-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
export default SkeletonLoader;
