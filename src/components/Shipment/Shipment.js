import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
  const [logInUser, setLogInUser] = useContext(userContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const saveCart = getDatabaseCart();
    const orderDetails = {
      ...logInUser,
      products: saveCart,
      shipment: data,
      time: new Date(),
    };
    fetch(`http://localhost:5000/addOrders`,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(orderDetails)
    })
    .then(response =>response.json())
    .then(data =>{
      if(data){
        processOrder()
        alert("You order successfully Done")
      }
    })
  };
  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        defaultValue={logInUser.name}
        placeholder="Your Name"
        ref={register({ required: true })}
      />
      {errors.name && <span className="error">Name is required</span>}
      <input
        name="Email"
        defaultValue={logInUser.email}
        placeholder="Your Email"
        ref={register({ required: true })}
      />
      {errors.Email && <span className="error">Email is required</span>}
      <input
        name="Address"
        placeholder="Your Address"
        ref={register({ required: true })}
      />
      {errors.Address && <span className="error">Address is required</span>}
      <input
        name="Phone"
        placeholder="Your Phone Number"
        ref={register({ required: true })}
      />
      {errors.Phone && <span className="error">Country is required</span>}
      <input
        name="Country"
        placeholder="Your Country"
        ref={register({ required: true })}
      />
      {errors.Country && <span className="error">Country is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;
