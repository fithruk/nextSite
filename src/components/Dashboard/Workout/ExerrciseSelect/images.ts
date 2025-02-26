import chest from "../../../../assets/images/chest.png";
import abs from "../../../../assets/images/abs.png";
import leg from "../../../../assets/images/leg.png";
import lifting from "../../../../assets/images/lifting.png";
import etc from "../../../../assets/images/etc.png";
import back from "../../../../assets/images/back.png";
import arm from "../../../../assets/images/bicep.png";
import shoulder from "../../../../assets/images/shoulder.png";
import { StaticImageData } from "next/image";

const muscleGroupImages: Record<string, StaticImageData> = {
  chest,
  abs,
  leg,
  lifting,
  etc,
  back,
  arm,
  shoulder,
};

export { muscleGroupImages };
