"use client";
import loginStyles from "./loginStyles.module.css";
import { FormControl, FormControlLabel, Grid, Typography } from "@mui/material";
import { AppBox } from "@/components/UI/AppBox/AppBox";
import { AppInput } from "@/components/UI/AppInput/AppInput";
import Image from "next/image";
import LoginImage from "../../../public/images/login/loginImage.png";
import { AppButton } from "@/components/UI/AppButton/AppButton";
import AppLink from "@/components/UI/AppLink/AppLink";
import AppCheckBox from "@/components/UI/AppCheckBox/AppCheckBox";
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const styles = {
  display: "flex",
  margin: "auto",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
};

interface FormState {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("submit");
    e.preventDefault();

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res && !res.error) {
      router.push("/dashboard/overview");
    } else {
      if (res?.status === 401) {
        alert("неправильний логін або пароль");
      }
    }
  };

  return (
    <AppBox sx={styles}>
      <Grid
        className={loginStyles.container}
        container
        spacing={{ xs: 2, md: 4 }}
      >
        <Grid
          sx={{
            position: "relative",
            "@media (max-width:600px)": {
              height: "50vh",
            },
          }}
          size={{ xs: 12, md: 6 }}
        >
          <Image
            src={LoginImage.src}
            alt="login"
            fill
            style={{ objectFit: "fill" }}
          ></Image>
        </Grid>
        <Grid
          // padding={"3rem"}
          display={"flex"}
          flexDirection={"column"}
          size={{ xs: 12, md: 6 }}
        >
          <Typography
            variant="h3"
            textAlign={"center"}
            fontSize={{ xs: "2.5vh" }}
          >
            Увійти
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <AppInput
                name="email"
                inputType="email"
                value={form.email}
                onChange={handleChange}
              />
              <AppInput
                name="password"
                inputType="password"
                value={form.password}
                onChange={handleChange}
              />
              <AppBox
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                marginTop={"1rem"}
              >
                <FormControlLabel
                  control={<AppCheckBox defaultChecked variant={"squared"} />}
                  label={
                    <Typography
                      component={"span"}
                      sx={{
                        fontSize: {
                          xs: "2.5vh",
                          md: "1rem",
                        },
                      }}
                    >
                      Запам'ятати мене
                    </Typography>
                  }
                />
                <AppLink href={"/"}>Забули пароль?</AppLink>
              </AppBox>
              <AppButton type="submit">Увійти →</AppButton>
              <AppBox marginTop={"1rem"} textAlign={"center"}>
                <AppLink color="#3F8CFF" href={`/register/step_1`}>
                  Немаєте облікового запису?
                </AppLink>
              </AppBox>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </AppBox>
  );
};
export default LoginPage;
