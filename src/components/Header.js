import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../src/images/logo.png";
import { userContext } from "../App";
import "./Header.css";

const Header = () => {
  const [logInUser,setLogInUser] = useContext(userContext)
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/order">Order Review</Link>
        <Link to="/Manage">Manage Inventory here</Link>
        <button onClick={() =>setLogInUser({})} className="btn btn-warning font-weight-bold">Sign Out</button>
      </nav>
    </div>
  );
};

export default Header;
