import { NavLink, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { useRef } from "react";
import { loginUser } from "../../API/UserApi"
import { setSession } from "../../utilities/session";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    await loginHandler();
  }

  const loginHandler = async() => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if(email != null && password != null) {
      try {
        const user = await loginUser(email, password);
        await setSession(user);
        navigate('/account/detail');
      } catch (error) {
        console.error("Error happened", error);
      }
    }
  };

  return (
    <form className={styles.form} method="POST">
      <h3 className={styles.heading}>Log Into Your Account</h3>

      <div className={styles.inputs}>
        <input
          type="email"
          name="email"
          className={styles.input}
          placeholder="Enter your email address"
          ref={emailRef}
        />

        <input
          type="password"
          name="password"
          className={styles.input}
          placeholder="Enter your email password"
          ref={passwordRef}
        />
      </div>
      <button className={styles.button} onClick={handleSubmit}>
        Log In
      </button>

      <span className={styles.notation}>
        Don't have an account?{" "}
        <NavLink to="/account/signup" className={styles.link}>
          Sign Up
        </NavLink>
      </span>
    </form>
  );
};

export default LoginForm;
