"use client";
import dashNavStyles from "./navigation.module.css";
import { signOut } from "next-auth/react";
import { AppLink } from "@/components/CommonComponents/Link/Link";
import { iconsArr } from "./icons";
import SVGIcon from "@/components/CommonComponents/IconSVG/SVG";
import { useTranslations } from "next-intl";
import { Typography } from "@/components/CommonComponents/Typography/Typography";

const dashboadrNavigationLinks: string[] = [
  "overview",
  "workout",
  "dietPlan",
  "goals",
  "mySchedule",
  "progress",
];

const DashboadrNavigation = () => {
  const t = useTranslations("DashboardNavigation");

  const capitalizeLink = (link: string) => {
    return link.substring(0, 1).toUpperCase() + link.substring(1);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className={dashNavStyles.container}>
      <nav>
        <ul className={dashNavStyles.list}>
          {dashboadrNavigationLinks.map((link, i) => (
            <li key={link}>
              <AppLink href={`/dashboard/${link}`}>
                {" "}
                <SVGIcon SVG={iconsArr[i]} />{" "}
                <Typography type="span">
                  {capitalizeLink(t(`${link}`))}
                </Typography>
              </AppLink>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <AppLink href={`#`} onClick={handleLogout}>
          {" "}
          <SVGIcon SVG={iconsArr[iconsArr.length - 1]} /> {t("logOut")}
        </AppLink>
      </div>
    </div>
  );
};

export default DashboadrNavigation;
