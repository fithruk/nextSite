import dashNavStyles from "./navigation.module.css";
import { AppLink } from "@/components/CommonComponents/Link/Link";
import { iconsArr } from "./icons";
import SVGIcon from "@/components/CommonComponents/IconSVG/SVG";

const dashboadrNavigationLinks: string[] = [
  "Overview",
  "Workout",
  "Diet Plan",
  "Goals",
  "My Schedule",
  "Progress",
];

const DashboadrNavigation = () => {
  return (
    <div className={dashNavStyles.container}>
      <nav>
        <ul className={dashNavStyles.list}>
          {dashboadrNavigationLinks.map((link, i) => (
            <li key={link}>
              <AppLink href={`/dashboard/${link}`}>
                {" "}
                <SVGIcon SVG={iconsArr[i]} /> {link}
              </AppLink>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <AppLink href={`/`}>
          {" "}
          <SVGIcon SVG={iconsArr[iconsArr.length - 1]} /> LogOut
        </AppLink>
      </div>
    </div>
  );
};

export default DashboadrNavigation;
