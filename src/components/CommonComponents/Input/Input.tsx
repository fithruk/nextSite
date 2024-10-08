import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Typography } from "../Typography/Typography";
import typographyStyles from "../Typography/typography.module.css";
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
      {labalValue && (
        <Typography
          classnames={`${typographyStyles.basicFontSize}`}
          type="span"
        >
          {labalValue}
        </Typography>
      )}
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
