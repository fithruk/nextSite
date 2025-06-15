import { Grid } from "@mui/material";
import image from "../../../../public/images/logo/underConstruction.png";
import AppLink from "@/components/UI/AppLink/AppLink";
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
        <img
          src={image.src}
          alt="netu"
          width={700}
          height={700}
          style={{ marginBottom: "1rem" }}
        />
        <AppLink
          href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/workouts`}
        >
          Перейти на сторінку календаря
        </AppLink>
      </Grid>
      {/* <Grid size={{ sm: 12, md: 2 }}>Aside</Grid> */}
    </>
  );
};

export default Overview;
