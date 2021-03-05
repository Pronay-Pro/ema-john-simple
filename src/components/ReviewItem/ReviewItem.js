import React from 'react';

const ReviewItem = (props) => {
    // console.log(props.product)
    const {img,name,category,seller,price,key,quantity} = props.product
    return (
            <div className="pro-container">
                <div className= "img-container">
                <img src={img} alt=""/>
                </div>
                <div className = "info-container">
                <h3>{name}</h3>
                <h5>Quantity : {quantity}</h5>
                <p>Category : {category}</p>
                <p>Seller: {seller}</p>
                <p>Price: ${price}</p>

                <button className =""
                onClick={() => props.RemoveProduct(key)}>
                Remove</button>
                </div>
            </div>
    );
};

export default ReviewItem;