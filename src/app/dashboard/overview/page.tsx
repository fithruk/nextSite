import { Grid } from "@mui/material";
import image from "../../../../public/images/logo/underConstruction.png";
import AppLink from "@/components/UI/AppLink/AppLink";
import { AppBox } from "@/components/UI/AppBox/AppBox";
const Overview = () => {
  return (
    <>
      <Grid
        size={{ sm: 12, md: 8 }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <AppBox>
          <img
            src={image.src}
            alt="netu"
            width={300}
            height={350}
            style={{ marginBottom: "1rem" }}
          />
          <AppLink
            href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/workouts`}
          >
            Перейти на сторінку календаря
          </AppLink>
        </AppBox>
      </Grid>
      {/* <Grid size={{ sm: 12, md: 2 }}>Aside</Grid> */}
    </>
  );
};

export default Overview;
