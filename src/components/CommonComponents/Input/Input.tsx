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
  placeholder?: string;
  type:
    | "text"
    | "phone"
    | "email"
    | "password"
    | "range"
    | "radio"
    | "checkbox"
    | "date"
    | "number";
  labalValue?: string;
}

export const Input = ({
  name,
  placeholder,
  type,
  labalValue,
  classnames,
  ...props
}: InputProps) => {
  return (
    <label htmlFor={labalValue}>
      {labalValue && (
        <Typography
          classnames={`${typographyStyles.basicFontSize}`}
          type="span"
        >
          {labalValue}
        </Typography>
      )}
      <input
        id={labalValue}
        autoComplete="off"
        className={
          classnames
            ? `${inputStyles.input} ${classnames}`
            : `${inputStyles.input}`
        }
        name={name}
        placeholder={placeholder}
        type={type}
        required
        {...props}
      ></input>
    </label>
  );
};
