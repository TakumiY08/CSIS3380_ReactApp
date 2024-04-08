import { NavLink, useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";
import { useRef, useState } from "react";
import { getEmails, signupUser } from "../../API/UserApi";
import { setSession } from "../../utilities/session";

const SignupForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRepeatRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState({ value: null, isValid: null });
  const [password, setPassword] = useState({ value: null, isValid: null });
  const [passwordRepeat, setPasswordRepeat] = useState({
    value: null,
    isValid: null,
  });

  const validateEmail = async() => {
    const emailRegex =
      /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    const emailValue = emailRef.current.value.trim();

    let registeredEmails = await getEmails();
    let dupFlag = false;

    if (emailRegex.test(emailValue)) {
      if(registeredEmails.length > 0) {
        for(let i = 0; i < registeredEmails.length; i++) {
          if(emailValue === registeredEmails[i].email) {
            dupFlag = true;
            break;
          }
        }
      }
      
      if(!dupFlag) {
        setEmail({ value: emailValue, isValid: true });
      } else {
        setEmail({ value: emailValue, isValid: false });
      }
    } else {
      setEmail({ value: emailValue, isValid: false });
    }
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const passwordValue = passwordRef.current.value.trim();

    if (passwordRegex.test(passwordValue)) {
      setPassword({ value: passwordValue, isValid: true });
    } else {
      setPassword({ value: passwordValue, isValid: false });
    }

    validatePasswordRepeat();
  };

  const validatePasswordRepeat = () => {
    const passwordRepeatValue = passwordRepeatRef.current.value.trim();

    if (passwordRepeatValue === passwordRef.current.value.trim()) {
      setPasswordRepeat({ value: passwordRepeatValue, isValid: true });
    } else {
      setPasswordRepeat({ value: passwordRepeatValue, isValid: false });
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    await signUpHandler();
  }

  const signUpHandler = async() => {
    if(email != null && password != null) {
      const em = email.value;
      const pw = password.value;
  
      try {
        const result = await signupUser(em, pw);

        if(result) {
          const user = result;
          
          setSession(user);

          navigate('/account/detail');
        } else {
          navigate('/account/signup');
        }
      } catch(error) {
        console.error("Error happened", error);
      }
    }
  };

  return (
    <form className={styles.form} method="POST">
      <h3 className={styles.heading}>Create an account</h3>

      <div className={styles.container}>
        <div className={styles.inputs}>
          <input
            type="email"
            name="email"
            className={`${styles.input} ${
              email.isValid === false ? styles.invalid : ""
            }`}
            placeholder="Enter your email address"
            ref={emailRef}
            onChange={validateEmail}
          />

          <input
            type="password"
            name="password"
            className={`${styles.input} ${
              password.isValid === false ? styles.invalid : ""
            }`}
            placeholder="Enter your password"
            ref={passwordRef}
            onChange={validatePassword}
          />

          <input
            type="password"
            name="passwordRepeat"
            className={`${styles.input} ${
              passwordRepeat.isValid === false ? styles.invalid : ""
            }`}
            placeholder="Repeat your password"
            ref={passwordRepeatRef}
            onChange={validatePasswordRepeat}
          />
        </div>

        <div className={styles.passwordInfo}>
          <h4>Your password should meet the following:</h4>

          <ul className={styles.list}>
            <li>Has minimum 8 characters in length</li>
            <li>At least one uppercase English letter</li>
            <li>At least one lowercase English letter</li>
            <li>At least one digit</li>
            <li>At least one special character</li>
          </ul>
        </div>
      </div>

      <button
        className={styles.button}
        disabled={
          !(email.isValid && password.isValid && passwordRepeat.isValid)
        }
        onClick={handleSubmit}
      >
        Sign Up
      </button>

      <span className={styles.notation}>
        Already have an account?{" "}
        <NavLink to="/account/login" className={styles.link}>
          Log In
        </NavLink>
      </span>
    </form>
  );
};

export default SignupForm;
