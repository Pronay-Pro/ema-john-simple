import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart ,setCart] = useState([]);
    useEffect(()=>{
        const savedCart = getDatabaseCart()
        const productKey = Object.keys(savedCart)
        const counts = productKey.map(key=>{
            const product = fakeData.filter(pd=>pd.key === key)
            product.quantity = savedCart[key]
            return product
        },[])
        setCart(counts)
    })
    return (
        <div>
            <h1>Cart Items : {cart.length}</h1>
            {
                cart.map(pd=><ReviewItem product={pd}></ReviewItem>)
            }
        </div>
    );
};

export default Review;