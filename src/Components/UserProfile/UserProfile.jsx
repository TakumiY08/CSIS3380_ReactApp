import { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";
import AdditionalInfoForm from "../AdditionalInfoForm/AdditionalInfoForm";
import { useNavigate, useLocation } from "react-router-dom";

const UserProfile = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [fullName, setFullName] = useState(null);
  const [address, setAddress] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  useEffect(() => {
    if(!props.user) {
      navigate('/account/login');
    }
  }, [props.user, navigate]);
  
  const user = props.user;
  let isFullName = user.fullName !== null ? true : false;

  useEffect(() => {
    if(props.user){
      setFullName(user.fullName || '');
      setAddress(user.address || '');
      setDateOfBirth(user.dateOfBirth || '');
    }
      setIsUpdating(false);
      
  }, [props.user]);

  const handleUpdateInfo = (updatedUser) => {
    setFullName(updatedUser.fullName);
    setAddress(updatedUser.address);
    setDateOfBirth(updatedUser.dateOfBirth);
    setIsUpdating(false);

    if(props.onUpdateUser) {
      props.onUpdateUser({
        ...props.user,
        fullName: updatedUser.fullName,
        address: updatedUser.address,
        dateOfBirth: updatedUser.dateOfBirth
      });
    }
  }

  return (
    <section className={styles.userProfileSection}>
      <div className={styles.info}>
        {isFullName ? (
          <h1 className={styles.heading}>Profile of {fullName}</h1>
        ) : (
          <h1 className={styles.heading}>Profile of {user.email}</h1>
        )}
        {!isUpdating && (
          <div className={styles.additionalInfoContainer}>
            <h2 className={styles.subHeading}>Additional Information</h2>

            <div className={styles.additionalInfo}>
              <p className={styles.fullName}>
                <span className={styles.label}>Full Name:</span>{" "}
                {fullName || "None"}
              </p>
              <p className={styles.address}>
                <span className={styles.label}>Address:</span>{" "}
                {address || "None"}
              </p>
              <p className={styles.dateOfBirth}>
                <span className={styles.label}>Date of Birth:</span>{" "}
                {dateOfBirth || "None"}
              </p>
            </div>

            <button
              className={styles.button}
              onClick={() => {
                setIsUpdating(true);
              }}
            >
              Update Information
            </button>
          </div>
        )}

        {isUpdating && (
          <AdditionalInfoForm
            user={user}
            submitUser={handleUpdateInfo}
          />
        )}
      </div>
    </section>
  );
};

export default UserProfile;
