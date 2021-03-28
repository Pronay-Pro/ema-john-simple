import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cart = props.cart
    const quantity = props.quantity
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * (product.quantity || 1);
        
    }
    let shipping = 0;
    if(total > 35){
        shipping = 7.99;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    const tax =(total /10).toFixed(2);
    const grandTotal =( total + shipping +Number(tax)).toFixed(2)
    return (
        <div className="summary">
            <h1>Order Summary</h1>
                <h3>Items ordered:{cart.length}</h3>
                <p>Items : ${total}</p>
                <p>Shipping & Handling: ${shipping}</p>
                <p>Total before tax: ${total+shipping}</p>
                <p>Estimated Tax: ${tax}</p>
                <h4>Order Total : ${Number(grandTotal)}</h4>
                {
                    props.children
                }
        </div>
    );
};

export default Cart;