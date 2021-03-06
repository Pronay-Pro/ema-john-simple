import React, { useEffect, useState } from "react";
// import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import image from "../../images/giphy.gif";
import { useHistory } from "react-router";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(false);
  const history = useHistory()

  const handleProceedCheckout = () => {
      history.push('/shipment')
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

    fetch(`https://gentle-peak-79048.herokuapp.com/productByKeys`,{
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(productKey)
    })
    .then(res =>res.json())
    .then(data =>setCart(data))
    // const counts = productKey.map((key) => {
    //   const product = fakeData.find((pd) => pd.key === key);
    //   product.quantity = savedCart[key];
    //   return product;
    // });
    // setCart(counts);
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
          <button onClick={handleProceedCheckout}>Proceed Checkout</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
