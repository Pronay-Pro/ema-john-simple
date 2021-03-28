import React from 'react';
// import fakeData from '../../fakeData';

const Inventory = () => {
     const products ={}
    const handleAddProduct =()=> {
        fetch('http://localhost:5000/addProducts',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(products)
        })
        
    }
   

    return (
        <div className="App">
          <form action="">
              <p><span>Name : </span><input type="text"/></p>
              <p><span>Price: </span><input type="text"/></p>
              <p><span>Quantity: </span><input type="text"/></p>
              <p><span>Product Image: </span><input type="file"/></p>
            <button onClick={handleAddProduct}>Add Product</button>
          </form>
        </div>
    );
};

export default Inventory;