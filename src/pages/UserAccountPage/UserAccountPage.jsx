import LoginForm from "../../Components/LoginForm/LoginForm";
import NavBar from "../../Components/NavBar/NavBar";
import SignupForm from "../../Components/SignupForm/SignupForm";
import UserProfile from "../../Components/UserProfile/UserProfile";
import styles from "./UserAccountPage.module.css";
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSession } from "../../utilities/session";

const UserAccountPage = (props) => {
  const [user ,setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

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

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  }
  
  return (
    <div className={styles.page}>
      <NavBar />
      {props.login && !isLogin && (
        <section className={styles.sectionLogin}>
          <LoginForm />
        </section>
      )}
      {!props.login && !isLogin && (
        <section className={styles.sectionSignup}>
          <SignupForm />
        </section>
      )}
      {isLogin && (
        <UserProfile user={user} onUpdateUser={handleUpdateUser}/>
      )}
    </div>
  );
};

export default UserAccountPage;
