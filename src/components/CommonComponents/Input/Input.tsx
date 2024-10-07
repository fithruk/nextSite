import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import inputStyles from "./input.module.css";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  classnames?: string;
  name: string;
  placeholder: string;
  type: "text" | "phone" | "email" | "password";
  labalValue?: string;
}

export const Input = ({
  name,
  placeholder,
  type,
  labalValue,
  ...props
}: InputProps) => {
  return (
    <label htmlFor={name}>
      {labalValue && labalValue}
      <input
        autoComplete="off"
        className={`${inputStyles.input}`}
        name={name}
        placeholder={placeholder}
        type={type}
        required
        {...props}
      ></input>
    </label>
  );
};
