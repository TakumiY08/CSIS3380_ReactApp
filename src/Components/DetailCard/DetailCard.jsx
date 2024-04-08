import React, { useState, useEffect } from "react";
import styles from "./DetailCard.module.css";

const DetailCard = ({ item, isTea }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = storedCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex !== -1) {
      setQuantity(storedCartItems[existingItemIndex].quantity);
    }
  }, [item.id]);

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

  return (
    <div className={`${styles.container} ${isTea ? styles.tea : ""}`}>
      <div className={styles.imageContainer}>
        <img src={item.image_url} alt={item.name} className={styles.image} />
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.header}>
          <h2 className={styles.name}>{item.name}</h2>
        </div>
        <div className={styles.information}>
          <p className={styles.description}>{item.description}</p>
          <div className={styles.details}>
            <p className={styles.flavor}>
              <strong>Flavor Profile:</strong> {item.flavor_profile}
            </p>
            <p className={styles.roast}>
              <strong>Roast Level:</strong> {item.roast_level}
            </p>
            <p className={styles.region}>
              <strong>Region:</strong> {item.region}
            </p>
            <br />
          </div>
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
    </div>
  );
};

export default DetailCard;
