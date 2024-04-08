import { useRef } from "react";
import styles from "./AdditionalInfoForm.module.css";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../API/UserApi";
import { setSession } from "../../utilities/session";

const AdditionalInfoForm = ({
  user,
  submitUser
}) => {
  const fullNameRef = useRef();
  const addressRef = useRef();
  const dateOfBirthRef = useRef();
  const navigate = useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();
    await submitInfoHandler();
  }

  const submitInfoHandler = async() => {
    const fullName = fullNameRef.current.value.trim();
    const address = addressRef.current.value.trim();
    const dateOfBirth = dateOfBirthRef.current.value.trim();

    try {
      if(user) {
        const userId = user._id;
        const updatedUser = await updateUser(userId, fullName, address, dateOfBirth);
        setSession(updatedUser);
        submitUser({updatedUser});
        navigate('/account/detail');
      }
    } catch(error) {
      console.error("Error: " , error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Update Additional Information</h2>
      <input
        className={styles.input}
        defaultValue={user.fullName || ""}
        type="text"
        ref={fullNameRef}
        placeholder={"Enter your full name"}
      />

      <input
        className={styles.input}
        defaultValue={user.address || ""}
        type="text"
        ref={addressRef}
        placeholder={"Enter your full address"}
      />

      <input
        className={styles.input}
        defaultValue={user.dateOfBirth || ""}
        type="date"
        ref={dateOfBirthRef}
      />

      <button className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default AdditionalInfoForm;
