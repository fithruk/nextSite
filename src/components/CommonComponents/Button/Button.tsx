"use client";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./button.module.css";
interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  type: "button" | "submit";
}

export const AppButton = ({ children, variant, type, ...props }: Props) => {
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

    default:
      break;
  }
};
