import { NavLink } from "react-router-dom";
import styles from "./CoffeeCard.module.css";
import React from "react";

const CoffeeCard = ({ item, isGradient }) => {
  const itemPath = String(item.id).startsWith('t') ? `/tea/${item.id}` : `/coffee/${item.id}` 
  return (
    <NavLink
      className={`${styles.container} ${isGradient ? styles.gradient : ""}`}
      to={itemPath}
    >
      <img src={item.image_url} alt={item.name} className={styles.image} />

      <div className={styles.information}>
        <div className={styles.block}>
          <h4 className={styles.name}>{item.name}</h4>
          <p className={styles.price}>${item.price}</p>
        </div>
        <p className={styles.description}>{item.description}</p>
      </div>
    </NavLink>
  );
};

export default CoffeeCard;
