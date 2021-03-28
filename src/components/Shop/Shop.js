import React, { useEffect, useState } from "react";
// import fakeData from "../../fakeData";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from "react-router-dom";
const Shop = () => {
  // console.log(fackData)
  // const first10 = fackData.slice(0,90)
  const [products, setProduct] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/products`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    fetch(`http://localhost:5000/productByKeys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
    //    if(products.length){
    //     const previousCart = productKeys.map(existKey =>{
    //         const product = products.find(pd=>pd.key === existKey)
    //         product.quantity =saveCart[existKey]
    //         return product
    //     })
    //   setCart(previousCart)
    //    }
  }, []);

  const handleAddProduct = (product) => {
    const toBeAdded = product.key;
    //    console.log("clicked",product)
    const sameProduct = cart.find((pd) => pd.key === toBeAdded);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAdded);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((pd) => (
          <Product
            key={pd.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={pd}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/order">
            <button>Review your order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
