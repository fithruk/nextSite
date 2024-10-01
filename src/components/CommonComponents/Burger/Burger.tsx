import styles from "./burgerMenu.module.css";

type BurgerMenuProps = {
  isActive?: boolean;
  toggleMenu: () => void;
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isActive, toggleMenu }) => {
  return (
    <button
      className={`${styles.burger} ${isActive ? styles.active : ""}`}
      onClick={toggleMenu}
    >
      <div className={`${styles.line} ${styles.line1}`} />
      <div className={`${styles.line} ${styles.line2}`} />
      <div className={`${styles.line} ${styles.line3}`} />
    </button>
  );
};

export default BurgerMenu;
