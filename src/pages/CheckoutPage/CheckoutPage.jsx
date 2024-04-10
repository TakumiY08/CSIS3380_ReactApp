import React, { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./CheckoutPage.module.css";
import { getSession } from "../../utilities/session";

const CheckoutPage = () => {
  const [user ,setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);


  const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));

if (storedCartItems && storedCartItems.length > 0) {
  console.log("The Items in localStorage:", storedCartItems);
} else {
  console.log("localStorage is empty or cartItems is not defined");
}


useEffect(() => {
  const getUserInfo = async() => {
    try {
      const userData = await getSession();
      setUser(userData.user);
      setIsLogin(userData !== null);

    } catch(error) {
      console.error("Error" + error);
    }
  };
  getUserInfo();
}, [location]);

  console.log("Cart Items:", cartItems);

  return (
    <div>
      <NavBar />
      <div className={styles.checkoutSection}>
        <h2>Checkout</h2>
        <ul className={styles.list}>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>{item.name}: ${item.price}</p>
              {/* Render other item details here */}
            </li>
          ))}
        </ul>
        {/* Render total and checkout button here */}
      </div>
    </div>
  );
};

export default CheckoutPage;
