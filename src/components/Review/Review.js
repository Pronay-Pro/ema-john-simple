import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import image from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(false);
  const handleOrderNow = () => {
    setOrder(true);
    setCart([]);
    processOrder();
  };

  const RemoveProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    console.log(newCart);
    removeFromDatabaseCart(productKey);
    setCart(newCart);
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKey = Object.keys(savedCart);
    const counts = productKey.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(counts);
  }, []);
  let thanks;
  if (order) {
    thanks = <img  src={image} alt="" />;
  }
  return (
    <div className="shop-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem RemoveProduct={RemoveProduct} product={pd}></ReviewItem>
        ))}
        {thanks}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleOrderNow}>Order Now</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
