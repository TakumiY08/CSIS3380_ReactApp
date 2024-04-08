import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Item.module.css";

const Item = ({ item, tea }) => {
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity === 0) {
      alert("Please select a valid quantity.");
      return;
    }

    const cartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      image_url: item.image_url,
      price: item.price,
      quantity: quantity,
    };

    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItemIndex = existingCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex !== -1) {
      existingCartItems[existingItemIndex].quantity += quantity;
    } else {
      existingCartItems.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    alert(`${quantity} of ${item.name} have been added to cart.`);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const basePath = location.pathname.startsWith("/tea") ? "/tea" : "/coffee";

  return (
    <div className={`${styles.item} ${tea ? styles.tea : ""}`}>
      <div className={styles.container}>
        <h3 className={styles.title}>{item.name}</h3>

        <div className={styles.information}>
          <img src={item.image_url} alt={item.name} className={styles.image} />
        </div>

        <div className={styles.content}>
          <p className={styles.description}>
            {item.description}
            <br />
            <br />
            <NavLink
              className={styles.link}
              to={`${basePath}/${item.id}`}
            >
              Learn More
            </NavLink>
          </p>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlsPrice}>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
            className={styles.inputQuantity}
          />
          <p className={styles.price}>${item.price}</p>
        </div>
        <button className={styles.button} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Item;
