"use client";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./button.module.css";
interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "pagination";
  type: "button" | "submit";
  classNames?: string;
}

export const AppButton = ({
  children,
  variant,
  type,
  classNames,
  ...props
}: Props) => {
  switch (variant) {
    case "primary":
      return (
        <button
          className={`${styles.button} ${styles.primary}`}
          type={type}
          {...props}
        >
          {children}
        </button>
      );

    case "secondary":
      return (
        <button
          className={`${styles.button} ${styles.secondary}`}
          type={type}
          {...props}
        >
          {children}
        </button>
      );
    case "pagination":
      const classnames = classNames
        ? `${styles.paginationButton} ${classNames}`
        : `${styles.paginationButton}`;
      return (
        <button className={classnames} type={type} {...props}>
          {children}
        </button>
      );

    default:
      break;
  }
};
