"use client";
import { Button, ButtonProps } from "@mui/material";

type AppButtonProps = React.PropsWithChildren<ButtonProps>;

const AppButton: React.FC<AppButtonProps> = ({
  children,
  variant = "text",
  ...props
}) => (
  <Button
    variant={variant}
    {...props}
    sx={{
      marginTop: "2rem",
      backgroundColor: "#3F8CFF",
      color: "#fff",
      padding: "0.5rem 1.5rem",
      borderRadius: "1.5rem",
      textTransform: "none",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      "&:hover": {
        backgroundColor: "#2c6fd9",
      },

      "@media (max-width:600px)": {
        fontSize: "1.5vh",
        padding: "0.5vh 1.5vh",
        borderRadius: "1.5vh",
      },
      ...props.sx,
    }}
  >
    {children}
  </Button>
);

export { AppButton };
