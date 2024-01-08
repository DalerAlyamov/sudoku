import DifficultyButton from "@/views/difficulty-button";
import styles from "./difficulty-level.module.scss";

const difficultyButtons = [
  {
    difficulty: "easy",
    label: "Легкий",
  },
  {
    difficulty: "middle",
    label: "Средний",
  },
  {
    difficulty: "hard",
    label: "Сложный",
  },
  {
    difficulty: "expert",
    label: "Эксперт",
  },
  {
    difficulty: "master",
    label: "Мастер",
  },
];

const DifficultyLevel = () => {
  return (
    <div className={styles.difficulty_level}>
      <div className={styles.title}>Уровень сложности</div>
      <div className={styles.buttonList}>
        {difficultyButtons.map((btn) => (
          <DifficultyButton key={btn.difficulty}>{btn.label}</DifficultyButton>
        ))}
      </div>
    </div>
  );
};

export default DifficultyLevel;
