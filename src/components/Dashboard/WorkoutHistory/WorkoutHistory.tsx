import whStyles from "./workoutHistory.module.css";
import WorkoutHistoryItem from "./WHItem/WHItem";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import { StaticImageData } from "next/image";
import testGif from "../../../assets/images/textGif.gif";

export type ExersiceType = {
  img: StaticImageData;
  trainedGroupes: string;
  countSetsAndResp: string;
};

export type ListItemTypes = {
  exersices: ExersiceType[];
  dateOfExersice: Date;
};

type WorkoutData = ListItemTypes[];

const testItems: WorkoutData[] = [
  [
    {
      exersices: [
        { img: testGif, trainedGroupes: "Chest", countSetsAndResp: "24/36" },
        { img: testGif, trainedGroupes: "Arms", countSetsAndResp: "24/36" },
        { img: testGif, trainedGroupes: "Chest", countSetsAndResp: "24/36" },
        { img: testGif, trainedGroupes: "Arms", countSetsAndResp: "24/36" },
      ],
      dateOfExersice: new Date(),
    },
  ],
  [
    {
      exersices: [
        { img: testGif, trainedGroupes: "Chest", countSetsAndResp: "24/36" },
        { img: testGif, trainedGroupes: "Arms", countSetsAndResp: "24/36" },
        { img: testGif, trainedGroupes: "Chest", countSetsAndResp: "24/36" },
        { img: testGif, trainedGroupes: "Arms", countSetsAndResp: "24/36" },
      ],
      dateOfExersice: new Date(),
    },
  ],
  [
    {
      exersices: [
        { img: testGif, trainedGroupes: "Chest", countSetsAndResp: "24/36" },
        { img: testGif, trainedGroupes: "Arms", countSetsAndResp: "24/36" },
        { img: testGif, trainedGroupes: "Chest", countSetsAndResp: "24/36" },
        { img: testGif, trainedGroupes: "Arms", countSetsAndResp: "24/36" },
      ],
      dateOfExersice: new Date(),
    },
  ],
  [
    {
      exersices: [
        { img: testGif, trainedGroupes: "Chest", countSetsAndResp: "24/36" },
        { img: testGif, trainedGroupes: "Arms", countSetsAndResp: "24/36" },
        { img: testGif, trainedGroupes: "Chest", countSetsAndResp: "24/36" },
        { img: testGif, trainedGroupes: "Arms", countSetsAndResp: "24/36" },
      ],
      dateOfExersice: new Date(),
    },
  ],
];

const WorkoutHistory = () => {
  return (
    <>
      <Typography type="h2">Workouts history</Typography>
      <ul className={whStyles.list}>
        {testItems.map((item, ind) => (
          <WorkoutHistoryItem workoutData={item} key={ind} />
        ))}
      </ul>
    </>
  );
};

export default WorkoutHistory;
