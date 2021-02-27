import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    // console.log(props.product.name)
    return (
        <div className="pro-container">
            <div className= "img-container">
                <img src={props.product.img} alt=""/>
            </div>
            <div className = "info-container">
                <a href="">{props.product.name}</a>
                <h4>Category: {props.product.category}</h4>
                <p>by:{props.product.seller}</p>
                <h3>${props.product.wholePrice}</h3>
                <h5>only {props.product.stock} left in stock - order soon</h5>
                <button onClick={()=>props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>

            </div>
            
        </div>
    );
};

export default Product;