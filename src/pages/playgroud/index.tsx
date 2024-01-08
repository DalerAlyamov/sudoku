import Board from "@/views/board";
import styles from "./playgroud.module.scss";

const Playground = () => {
  return (
    <div className={styles.playground}>
      <div className={styles.content}>
        <Board />
      </div>
    </div>
  );
};

export default Playground;
