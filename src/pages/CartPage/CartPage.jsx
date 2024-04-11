import React, { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";
import { addTransaction } from "../../API/TransactionApi.js";
import { getSession } from "../../utilities/session.js";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const navigate = useNavigate();
  const CART_ITEMS = "cartItems";

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem(CART_ITEMS)) || [];
    const getUser = async () => {
      const sessionData = await getSession();
      if (sessionData) {
        setUserId(sessionData.user._id);
        setUserAddress(sessionData.user.address || "");
      }
    };
    getUser();
    setCartItems(storedCartItems);
  }, []);

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem(CART_ITEMS, JSON.stringify(updatedCartItems));
  };

  const removeOneQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: Math.max(1, item.quantity - 1) };
      }
      return item;
    });
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

  const handleTransaction = async (event) => {
    event.preventDefault();

    if (userId === null) {
      alert("Please login if you want to checkout items");
      navigate("/account/login");
    } else {
      if (cartItems.length > 0) {
        setShowModal(true);
      } else {
        setError("Your cart is currently empty");
      }
    }
  };

  const transactionProcess = async () => {
    const cartContents = cartItems.map((item) => {
      return {
        product_id: item.id,
        quantity: item.quantity,
      };
    });

    const transactionInfo = {
      userId: userId,
      contents: cartContents,
      grandTotal: grandTotal,
      transaction_date: formatDate(Date.now()),
    };

    try {
      const result = await addTransaction(transactionInfo);
      if (result) {
        localStorage.removeItem(CART_ITEMS);
        const sessionData = await getSession();
        alert(`Order has been placed. Thank you!`);
        navigate("/");
      }
    } catch (error) {
      console.error("Error happened", error);
    }
  };

  const formatDate = (timestamp) => {
    const currentDate = new Date(timestamp);
    const estimatedDeliveryDate = new Date(timestamp);
    estimatedDeliveryDate.setDate(currentDate.getDate() + 10); //add 10 days for estimated time
    const formattedCurrentDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    const formattedEstimatedDate = `${estimatedDeliveryDate.getMonth() + 1}/${estimatedDeliveryDate.getDate()}/${estimatedDeliveryDate.getFullYear()}`;
    return { currentDate: formattedCurrentDate, estimatedDate: formattedEstimatedDate };
  };

  return (
    <div>
      <NavBar />
      <div className={styles.cartSection}>
        <h2>Your Cart</h2>
        {error && <p className={styles.error}>{error}</p>}
        {cartItems.length > 0 ? (
          <>
            <ul className={styles.list}>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <NavLink
                    to={String(item.id).startsWith("t") ? `/tea/${item.id}` : `/coffee/${item.id}`}
                    className={styles.link}
                  >
                    <img src={item.image_url} alt={item.name} className={styles.image} />
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
                    <button className={styles.button} onClick={() => addOneQuantity(item.id)}>
                      Add One
                    </button>
                    <button className={styles.button} onClick={() => removeOneQuantity(item.id)}>
                      Remove One
                    </button>
                    <button className={styles.button} onClick={() => removeFromCart(item.id)}>
                      Remove All
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className={styles.total}>Grand Total: ${grandTotal.toFixed(2)}</h3>
            <button className={styles.button} onClick={handleTransaction}>
              Checkout
            </button>
          </>
        ) : (
          <p>Your cart is currently empty</p>
        )}
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Order Summary</h2>
            <p>Address: {userAddress}</p>
            <p>Current Date: {formatDate(Date.now()).currentDate}</p>
            <p>Estimated Delivery Date: {formatDate(Date.now()).estimatedDate}</p>
            <p>Grand Total: ${grandTotal.toFixed(2)}</p>
            <br></br>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <button className={styles.orderButton} onClick={transactionProcess}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
