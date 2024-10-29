import { StaticImageData } from "next/image";
import FLIStyles from "./foodListItem.module.css";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import SVGIcon from "@/components/CommonComponents/IconSVG/SVG";
import caloriesIcon from "../../../../assets/icons/calories.svg";
import timerIcon from "../../../../assets/icons/timer.svg";
import Link from "next/link";
import Image from "next/image";
type FoodLIstItemProps = {
  img: StaticImageData;
  title: string;
  calories: number;
  time: string;
};

const FoodLIstItem = ({ img, title, calories, time }: FoodLIstItemProps) => {
  return (
    <li className={FLIStyles.li}>
      <Link href="#">
        {" "}
        <div className={FLIStyles.container}>
          <div className={FLIStyles.textContent}>
            <Typography type="p">{title}</Typography>
            <Typography type="p">
              <SVGIcon SVG={caloriesIcon} /> {calories}
            </Typography>
            <Typography type="p">
              <SVGIcon SVG={timerIcon} /> {time}
            </Typography>
          </div>
          <div className={FLIStyles.imgContainer}>
            <Image src={img} alt={title} className={FLIStyles.img} />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default FoodLIstItem;
