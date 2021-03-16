import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/NotFound/NotFound";
import Detail from "./components/Detail/Detail";
import Shipment from "./components/Shipment/Shipment";
import LogIn from "./components/LogIn/LogIn";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const userContext = createContext()


function App() {
  const [LogInUser,setLogInUser] = useState({})
  return (
    <userContext.Provider value={[LogInUser,setLogInUser]}>
      <h3>User Email : {LogInUser.email}</h3>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/order">
            <Review></Review>
          </Route>
          <PrivateRoute path="/Manage">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/Login">
            <LogIn></LogIn>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <Detail></Detail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
