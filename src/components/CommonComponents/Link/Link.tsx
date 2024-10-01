import Link from "next/link";
import { ComponentProps } from "react";
import linkStyles from "./link.module.css";

interface Props extends ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export const AppLink = ({ children, ...props }: Props) => {
  return (
    <Link className={linkStyles.link} {...props}>
      {children}
    </Link>
  );
};
