import AppLink from "@/components/UI/AppLink/AppLink";
import { List, ListItem } from "@mui/material";

const Navigation = () => {
  return (
    <List sx={{ display: "flex", justifyContent: "space-between" }}>
      <ListItem>
        <AppLink href={"#"}>Link</AppLink>
      </ListItem>
      <ListItem>
        <AppLink href={"#"}>Link</AppLink>
      </ListItem>
      <ListItem>
        <AppLink href={"#"}>Link</AppLink>
      </ListItem>
    </List>
  );
};

export default Navigation;
