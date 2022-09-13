import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./redux/action";
import { Switch, Route, useLocation } from "react-router-dom";

import Container from "./components/ui/Container";
import Header from "./components/ui/Header";
import Categories from "./components/ui/Categories";
import Home from "./components/ui/Home";
import { Electronics } from "./components/pages/electronics";
import { Jewelery } from "./components/pages/jewelery";
import { MenCloth } from "./components/pages/mencloth";
import { WomenCloth } from "./components/pages/womencloth";
import Footer from "./components/ui/Footer";
import ProductDetails from "./components/pages/productDetails";
import LoginSignUp from "./components/ui/LoginSignUp";
import Logout from "./components/pages/logout";
import { Profile } from "./components/pages/profile";
import Cart from "./components/pages/cart";
import Orders from "./components/pages/orders";
import Search from "./components/pages/search";

function App() {
  const [localCart, setLocalCart] = useState(
    JSON.parse(localStorage.getItem("localCart")) || []
  );
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.productReducer);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const routPath = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [routPath]);
  const updateLocalCart = (cartData) => {
    if (cartData === "empty") {
      setLocalCart([]);
      localStorage.removeItem("localCart");
    } else {
      setLocalCart([...localCart, cartData]);
      localStorage.setItem(
        "localCart",
        JSON.stringify([...localCart, cartData])
      );
    }
  };
  const cartIncDecHandler = (newCart) => {
    setLocalCart(newCart);
    localStorage.setItem("localCart", JSON.stringify(newCart));
  };
  const deleteCartItemHandler = (item) => {
    let newCart = localCart.filter((i) => Number(i.itemId) !== Number(item.id));
    setLocalCart(newCart);
    localStorage.setItem("localCart", JSON.stringify(localCart));
  };

  const searchHandler = (query) => {
    setSearchQuery(query);
  };

  return (
    <Container>
      <Switch>
        <Route path={`/`} exact>
          <Header
            localCart={localCart}
            onCartUpdate={updateLocalCart}
            onSearch={searchHandler}
          />
          <Categories categories={categories} />
          <Home />
          <Footer />
        </Route>
        <Route path={"/logout"} exact>
          <Logout />
        </Route>
        <Route path={`/auth`} exact>
          <LoginSignUp localCart={localCart} onCartUpdate={updateLocalCart} />
        </Route>
        <Route path={`/profile`} exact>
          <Header
            localCart={localCart}
            onCartUpdate={updateLocalCart}
            onSearch={searchHandler}
          />
          <Profile />
          <Footer />
        </Route>
        <Route path={`/cart`} exact>
          <Header
            localCart={localCart}
            onCartUpdate={updateLocalCart}
            onSearch={searchHandler}
          />
          <Cart
            localCart={localCart}
            onDeleteCartItem={deleteCartItemHandler}
            onCartUpdate={updateLocalCart}
            onCartIncDec={cartIncDecHandler}
          />
          <Footer />
        </Route>
        <Route path={`/orders`} exact>
          <Header
            localCart={localCart}
            onCartUpdate={updateLocalCart}
            onSearch={searchHandler}
          />
          <Orders />
          <Footer />
        </Route>
        <Route path={`/search`} exact>
          <Header
            localCart={localCart}
            onCartUpdate={updateLocalCart}
            onSearch={searchHandler}
          />
          <Search searchQuery={searchQuery} />
          <Footer />
        </Route>
        <Route path={`/ele`} exact>
          <Header
            localCart={localCart}
            onCartUpdate={updateLocalCart}
            onSearch={searchHandler}
          />
          <Electronics />
          <Footer />
        </Route>
        <Route path={`/jew`} exact>
          <Header
            localCart={localCart}
            onCartUpdate={updateLocalCart}
            onSearch={searchHandler}
          />
          <Jewelery />
          <Footer />
        </Route>
        <Route path={`/men`} exact>
          <Header
            localCart={localCart}
            onCartUpdate={updateLocalCart}
            onSearch={searchHandler}
          />
          <MenCloth />
          <Footer />
        </Route>
        <Route path={`/wom`} exact>
          <Header
            localCart={localCart}
            onCartUpdate={updateLocalCart}
            onSearch={searchHandler}
          />
          <WomenCloth />
          <Footer />
        </Route>
        <Route path={`/:prod_id`} exact>
          <Header
            localCart={localCart}
            onCartUpdate={updateLocalCart}
            onSearch={searchHandler}
          />
          <ProductDetails
            localCart={localCart}
            onCartUpdate={updateLocalCart}
          />
          <Footer />
        </Route>
        <Route path={`*`}>
          <Header
            localCart={localCart}
            onCartUpdate={updateLocalCart}
            onSearch={searchHandler}
          />
          <div
            id="product-details-main-container"
            className="w-[98%] h-auto bg-white rounded-md shadow-md shadow-slate-400 flex flex-col items-center justify-center md:flex-row p-4 my-8"
          >
            <div className="w-full h-[75vh] flex justify-center items-center">
              <img
                src={require(`./components/ui/images/error-404.png`)}
                alt="ERROR 404"
              />
            </div>
          </div>
          <Footer />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
