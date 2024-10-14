import searchBarStyles from "./searchBar.module.css";
import { Input } from "@/components/CommonComponents/Input/Input";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
// import typographyStyles from "@/components/CommonComponents/Typography/typography.module.css";

const SearchBar = () => {
  return (
    <div className={searchBarStyles.container}>
      <div>
        <Typography type="p">Good Morning</Typography>
        <Typography type="p">Welcome Back!</Typography>
      </div>
      <div>
        <Input name="search" placeholder="Type for search..." type="text" />
      </div>

      <div>Icons</div>
    </div>
  );
};

export default SearchBar;
