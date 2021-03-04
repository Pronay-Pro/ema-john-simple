import React from 'react';

const ReviewItem = (props) => {
    console.log(props.product)
    return (
        <div>
            <div>
                <h1>{props.product.name}</h1>
                <h3>{props.product.quantity}</h3>
            </div>

        
        </div>
    );
};

export default ReviewItem;