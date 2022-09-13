import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Search = (props) => {
  const products = useSelector((state) => [state.allProductReducer]);
  return (
    <div className="w-[98%] min-h-[80vh] p-4 flex flex-col items-start justify-start my-4 bg-white shadow-md shadow-gray-400">
      <span className="font-bold tracking-widest flex">
        <p>Showing results for </p>&nbsp; "{props.searchQuery}"
      </span>
      <div
        id="search-results"
        className="w-full p-1 md:p-4 flex justify-start flex-wrap"
      >
        {products[0]
          .filter(
            (item) =>
              item.category.includes(props.searchQuery) ||
              item.title.includes(props.searchQuery) ||
              item.description.includes(props.searchQuery)
          )
          .map((product) => {
            return (
              <Link
                to={`/${product.id}`}
                key={product.id}
                className="w-full md:w-56 h-36 md:h-80 rounded-lg shadow-md shadow-slate-500 flex md:flex-col items-center justify-between p-2 cursor-pointer hover:text-blue-700 md:hover:scale-105 duration-150 z-10 my-3 mx-1 md:mx-3 flex-shrink-0"
              >
                <div className="my-2 flex h-full items-center">
                  <img
                    src={product.image}
                    alt="product-img"
                    height="125px"
                    width="100px"
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
  );
};
export default Search;
