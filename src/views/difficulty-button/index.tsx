import RippleBox from "daler-ripple-box";
import styles from "./difficulty-button.module.scss";

const DifficultyButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <RippleBox rippleColor="rgb(29, 49, 86, 0.1)">
      {(button) => (
        <button ref={button} type="button" className={styles.difficultyButton}>
          {children}
        </button>
      )}
    </RippleBox>
  );
};

export default DifficultyButton;
