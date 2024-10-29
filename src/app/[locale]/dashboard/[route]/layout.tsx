import { Container } from "@/components/CommonComponents/Container/Container";
import dashboardStyles from "./dashboard.module.css";
import SearchBar from "@/components/Dashboard/SearchBar/SearchBar";
import DashboadrNavigation from "@/components/Dashboard/Navigation/Navigation";
import Overview from "@/components/Dashboard/Overview/Overview";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import typographyStyles from "@/components/CommonComponents/Typography/typography.module.css";
import WorkoutHistory from "@/components/Dashboard/WorkoutHistory/WorkoutHistory";
import DietPlan from "@/components/Dashboard/DietPlan/DietPlan";
import WeekFoodPlan from "@/components/Dashboard/WeekFoodPlan/WeekFoodPlan";

interface DashboardProps {
  params: {
    route: string;
  };
}

enum RoutesEnum {
  overview = "overview",
  dietPlan = "dietPlan",
}

const DashboardLayout: React.FC<DashboardProps> = ({ params }) => {
  const { route } = params;
  console.log(route);

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
          <div className={dashboardStyles.main}>
            {route === RoutesEnum.overview && <Overview />}
            {route === RoutesEnum.dietPlan && <DietPlan />}
          </div>
          <div className={dashboardStyles.sideBar}>
            {route === RoutesEnum.overview && <WorkoutHistory />}
            {route === RoutesEnum.overview && <p>jopa</p>}
            {route === RoutesEnum.dietPlan && <WeekFoodPlan />}
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default DashboardLayout;
