import styles from "./container.module.css";
type Props = {
  type?: "inner";
  children: React.ReactNode;
  classnames?: string;
};
export const Container = ({ children, type, classnames }: Props) => {
  let className = "";
  switch (type) {
    case "inner":
      className = classnames
        ? `${styles.inner} ${classnames}`
        : `${styles.inner}`;
      return <div className={className}>{children}</div>;

    default:
      className = classnames
        ? `${styles.container} ${classnames}`
        : `${styles.container}`;
      return <div className={className}>{children}</div>;
  }
};
