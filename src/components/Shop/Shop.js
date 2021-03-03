import React, { useState } from 'react';
import fackData from '../../fakeData'
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    console.log(fackData)
    const first10 = fackData.slice(0,80)
   const[products,setProduct] = useState(first10)
   const [cart,setCart] = useState([])

   const handleAddProduct =(product)=>{
    //    console.log("clicked",product)
       const newCart = [...cart,product]
       setCart(newCart)
   }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd =><Product
                    showAddToCart={true}
                    handleAddProduct = {handleAddProduct}
                         product ={pd}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;