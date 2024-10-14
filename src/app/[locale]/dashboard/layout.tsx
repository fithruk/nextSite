import { Container } from "@/components/CommonComponents/Container/Container";
import dashboardStyles from "./dashboard.module.css";
import SearchBar from "@/components/Dashboard/SearchBar/SearchBar";
import DashboadrNavigation from "@/components/Dashboard/Navigation/Navigation";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import typographyStyles from "@/components/CommonComponents/Typography/typography.module.css";
import WorkoutHistory from "@/components/Dashboard/WorkoutHistory/WorkoutHistory";

const DashboardLayout = () => {
  return (
    <Container>
      <Container type="inner">
        <div className={dashboardStyles.layoutGrid}>
          <div className={dashboardStyles.logo}>
            {" "}
            <Typography
              type="span"
              classnames={`${typographyStyles.fontSize2Rem}`}
            >
              Fitness
            </Typography>
          </div>
          <div className={dashboardStyles.navigation}>
            <DashboadrNavigation />
          </div>

          <div className={dashboardStyles.search}>
            <SearchBar />
          </div>
          <div className={dashboardStyles.main}>{"main"}</div>
          <div className={dashboardStyles.sideBar}>
            <WorkoutHistory />
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default DashboardLayout;
