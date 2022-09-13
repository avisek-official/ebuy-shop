import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../redux/action";
const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  localStorage.removeItem("userAuth");
  useEffect(() => {
    dispatch(logout());
    history.push("/");
  }, [dispatch,history]);
};

export default Logout;
