import linkStyles from "./linkStyles.module.css";
import NextLink from "next/link";
import { Link as MuiLink, Typography } from "@mui/material";
import { ComponentProps, forwardRef } from "react";
import Link from "next/link";

interface AppLinkProps extends ComponentProps<typeof Link> {
  children: React.ReactNode;
  color?: string;
}

const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, children, color, ...props }, ref) => {
    return (
      <MuiLink
        className={linkStyles.link}
        component={NextLink}
        ref={ref}
        href={href}
        {...props}
        sx={{
          color: color ? color : "#0a1629",
        }}
      >
        <Typography component={"span"} className={linkStyles.link}>
          {children}
        </Typography>
      </MuiLink>
    );
  }
);

AppLink.displayName = "AppLink";

export default AppLink;
