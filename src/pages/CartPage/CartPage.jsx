import React, { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";
import { addTransaction } from "../../API/TransactionApi.js"
import { getSession } from "../../utilities/session.js";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const CART_ITEMS = "cartItems";

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem(CART_ITEMS)) || [];
    const getUser = async() => {
      if(await getSession() !== null) {
        const data = await getSession();
        if(data) {
          setUserId(data.user._id);
        }
      }
    }
    getUser();
    setCartItems(storedCartItems);
  }, []);

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem(CART_ITEMS, JSON.stringify(updatedCartItems));
  };

  const removeOneQuantity = (itemId) => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item.id === itemId) {
          if (item.quantity === 1) {
            return null;
          }
          return { ...item, quantity: Math.max(0, item.quantity - 1) };
        }
        return item;
      })
      .filter(Boolean);
    setCartItems(updatedCartItems);
    localStorage.setItem(CART_ITEMS, JSON.stringify(updatedCartItems));
  };

  const addOneQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem(CART_ITEMS, JSON.stringify(updatedCartItems));
  };

  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const grandTotal = cartItems.reduce((total, item) => {
    return total + calculateItemTotal(item);
  }, 0);

  const handleTransaction = async(event) => {
    event.preventDefault();

    if(userId === null) {
      navigate('/account/login');
    } else {
      await transactionProcess();
    }
  }

  const transactionProcess = async() => {
    let cartContents = [];
    let transactionInfo = [];
    cartItems.map((item) => {
      let productId = item.id;
      let quantity = item.quantity;
      let cartItem = {
        product_id: productId,
        quantity: quantity
      };

      cartContents.push(cartItem);
    })

    transactionInfo = {
      userId: userId,
      contents: cartContents,
      grandTotal: grandTotal,
      transaction_date: formatDate(Date.now())
    }

    try {
      const result = addTransaction(transactionInfo);

      if(result) {
        localStorage.setItem(CART_ITEMS, null);
        navigate('/');
      }
    } catch(error) {
      console.error("Error happened", error);
    }
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const amOrPm = date.getHours() < 12 ? 'AM' : 'PM';
  
    return `${month}/${day}/${year} ${hours}:${minutes} ${amOrPm}`;
  }

  return (
    <div>
      <NavBar />
      <div className={styles.cartSection}>
        <h2>Your Cart</h2>
        <ul className={styles.list}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <NavLink to={`/coffee/${item.id}`} className={styles.link}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className={styles.image}
                />
              </NavLink>

              <div className={styles.information}>
                <div className={styles.block}>
                  <h4 className={styles.name}>{item.name}</h4>
                  <p className={styles.price}>${item.price}</p>
                  <p className={styles.quantity}>Quantity: {item.quantity}</p>
                </div>
                <p className={styles.description}>{item.description}</p>
              </div>

              <div className={styles.cartItemButtonGroup}>
                <button
                  className={styles.button}
                  onClick={() => addOneQuantity(item.id)}
                >
                  Add One
                </button>
                <button
                  className={styles.button}
                  onClick={() => removeOneQuantity(item.id)}
                >
                  Remove One
                </button>
                <button
                  className={styles.button}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove All
                </button>
              </div>
            </li>
          ))}
        </ul>
        <h3 className={styles.total}>Grand Total: ${grandTotal.toFixed(2)}</h3>
        <button className={styles.button} onClick={handleTransaction}>Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
