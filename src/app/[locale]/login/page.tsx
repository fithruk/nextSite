"use client";
import { Input } from "@/components/CommonComponents/Input/Input";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import typographyStyles from "@/components/CommonComponents/Typography/typography.module.css";
import { AppButton } from "@/components/CommonComponents/Button/Button";
import Image from "next/image";
import logineImage from "../../../assets/images/loginImage.png";
import googleIcon from "../../../assets/images/googleIcon.png";
import loginSlyles from "./login.module.css";
import { AppLink } from "@/components/CommonComponents/Link/Link";
import { FormEvent, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type LoginType = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginData, setLoginData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const t = useTranslations("Login");
  const b = useTranslations("ButtonText");
  const session = useSession();
  console.log(session);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: loginData.email,
      password: loginData.password,
      redirect: false,
    });

    if (res && !res.error) {
      router.push("/");
    } else {
      console.log(res);
    }
  };

  const googleAuth = () => {
    signIn("google", {
      callbackUrl: "/private",
    });
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLoginData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div className={loginSlyles.container}>
      <div className={loginSlyles.formContainer}>
        <Typography classnames={`${typographyStyles.fontSize3Rem}`} type="h1">
          {t("loginTitle")}
        </Typography>
        <Typography classnames={`${typographyStyles.basicFontSize}`} type="p">
          {t("loginSubTitle")}
        </Typography>
        <form className={loginSlyles.form} onSubmit={handleSubmit}>
          <Input
            placeholder="Enter email"
            type="email"
            name="email"
            labalValue={t("email")}
            onChange={handleChange}
            value={loginData?.email}
          />
          <Input
            placeholder="Enter password"
            type="password"
            name="password"
            labalValue={t("password")}
            onChange={handleChange}
            value={loginData?.password}
          />
          <AppButton variant="primary" type="submit">
            {b("signIn")}
          </AppButton>
        </form>
        <AppButton variant="secondary" type="button" onClick={googleAuth}>
          <Image
            className={loginSlyles.googleIcon}
            src={googleIcon}
            alt="iconGoogle"
          />{" "}
          {b("signinWithGoogle")}
        </AppButton>
        <Typography classnames={`${typographyStyles.basicFontSize}`} type="p">
          {t("callToRegistration1")}
          <AppLink
            className={`${typographyStyles.colorSecondary} ${typographyStyles.basicFontSize}`}
            href={"/registration"}
          >
            {t("callToRegistration2")}
          </AppLink>
        </Typography>
      </div>
      <div className={loginSlyles.imageBox}>
        <Image className={loginSlyles.formImage} src={logineImage} alt="logo" />
      </div>
    </div>
  );
};

export default Login;
