import { Link } from "react-router-dom";
const Categories = (props) => {
  return (
    <div
      id="categories"
      className="w-full bg-white shadow-md shadow-slate-400 flex flex-wrap p-4 justify-evenly"
    >
      {props.categories.map((item) => {
        return (
          <div
            key={item}
            className="capitalize w-[50%] md:w-[25%] text-center flex flex-col justify-center items-center my-4 md:my-1"
          >
            <Link
              to={`/${item.slice(0, 3)}`}
              className="cursor-pointer flex flex-col justify-center items-center text-sm hover:scale-105 duration-150 hover:text-blue-600"
            >
              <img
                alt="category-pic"
                src={`./categories/${item}.png`}
                width="40px"
                height="40px"
                className="my-1"
              />
              {item === "jewelery" ? "Jewellery" : item}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Categories;
