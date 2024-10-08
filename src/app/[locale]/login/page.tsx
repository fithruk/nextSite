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
      callbackUrl: "/",
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
          Welcome back
        </Typography>
        <Typography classnames={`${typographyStyles.basicFontSize}`} type="p">
          Please enter your details.
        </Typography>
        <form className={loginSlyles.form} onSubmit={handleSubmit}>
          <Input
            placeholder="Enter email"
            type="email"
            name="email"
            labalValue="Email"
            onChange={handleChange}
            value={loginData?.email}
          />
          <Input
            placeholder="Enter password"
            type="password"
            name="password"
            labalValue="Password"
            onChange={handleChange}
            value={loginData?.password}
          />
          <AppButton variant="primary" type="submit">
            Sign in
          </AppButton>
        </form>
        <AppButton variant="secondary" type="button" onClick={googleAuth}>
          <Image
            className={loginSlyles.googleIcon}
            src={googleIcon}
            alt="iconGoogle"
          />{" "}
          Sign in with Google
        </AppButton>
        <Typography classnames={`${typographyStyles.basicFontSize}`} type="p">
          Don’t have an account?{" "}
          <AppLink
            className={`${typographyStyles.colorSecondary} ${typographyStyles.basicFontSize}`}
            href={"/registration"}
          >
            Sign up for free!
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
