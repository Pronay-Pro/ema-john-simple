import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props)
    const {img,key,name,category,seller,wholePrice,stock} = props.product
    return (
        <div className="pro-container">
            <div className= "img-container">
                <img src={img} alt=""/>
            </div>
            <div className = "info-container">
                <h4><Link to={"/product/" +key}>{name}</Link></h4>
                <h5>Category: {category}</h5>
                <p>by:{seller}</p>
                <h3>${wholePrice}</h3>
                <h5>only {stock} left in stock - order soon</h5>
               {props.showAddToCart && <button onClick={()=>props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>}

            </div>
            
        </div>
    );
};

export default Product;