"use client";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import { FormControl, Grid } from "@mui/material";
import { AppInput } from "@/components/UI/AppInput/AppInput";

// chronicDiseases: "text",
// injuries: "text",
// workoutExperience: "text",

const Profile = () => {
  return (
    <Grid size={{ sm: 12, md: 10 }}>
      <AppBox>
        <form onSubmit={() => {}}>
          <FormControl>
            <AppInput
              name="chronicDiseases"
              label="chronicDiseases"
              inputType="chronicDiseases"
              isTextArea
              value="Вставить значение"
            />
          </FormControl>
        </form>
      </AppBox>
    </Grid>
  );
};

export default Profile;
