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
  type: "text" | "phone" | "email";
}

export const Input = ({ name, placeholder, type, ...props }: InputProps) => {
  return (
    <label htmlFor={name}>
      <input
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
