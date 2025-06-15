import checkBoxStyles from "./checkBoxStyles.module.css";
import { Checkbox, CheckboxProps } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type AppCheckBoxProps = CheckboxProps & {
  variant: "squared" | "rounded";
};

const AppCheckBox: React.FC<AppCheckBoxProps> = ({
  defaultChecked,
  variant,
  ...props
}) => {
  switch (variant) {
    case "squared":
      return (
        <Checkbox
          defaultChecked={defaultChecked && defaultChecked}
          className={checkBoxStyles.checkBox}
          {...props}
          sx={{
            color: "#3F8CFF",
            "&.Mui-checked": {
              color: "#3F8CFF",
            },
            "& .MuiSvgIcon-root": {
              border: "1px solid #D8E0F0",
              borderRadius: "5px",
              backgroundColor: "#fff",

              "@media (max-width:900px)": {
                fontSize: "2.5vh",
              },
            },
          }}
        />
      );
    case "rounded":
      return (
        <Checkbox
          defaultChecked={defaultChecked}
          className={checkBoxStyles.checkBox}
          icon={
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "2px solid #D8E0F0",
                backgroundColor: "#fff",
                display: "inline-block",
              }}
            />
          }
          checkedIcon={
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "2px solid #3F8CFF",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#3F8CFF",
              }}
            >
              <CheckIcon style={{ fontSize: 16 }} />
            </span>
          }
          {...props}
          sx={{
            padding: "4px",
            "@media (max-width:900px)": {
              fontSize: "2vh",
            },
          }}
        />
      );
    default:
      break;
  }
};

export default AppCheckBox;
