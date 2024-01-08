import styles from "./logo.module.scss";

const Logo = ({ children }: { children: string }) => {
  return <div className={styles.logo}>{children}</div>;
};

export default Logo;
