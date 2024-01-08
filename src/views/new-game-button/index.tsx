import RippleBox from "daler-ripple-box";
import classNames from "classnames";
import styles from "./new-game-button.module.scss";

const NewGameButton = ({
  children,
  onClick,
  className,
}: {
  children: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) => {
  return (
    <RippleBox>
      {(button) => (
        <button
          onClick={onClick}
          className={classNames(className, styles.newGameButton)}
          ref={button}
        >
          {children}
        </button>
      )}
    </RippleBox>
  );
};

export default NewGameButton;
