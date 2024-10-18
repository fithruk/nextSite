"use client";

import shStyles from "./whItem.module.css";
import { Typography } from "@/components/CommonComponents/Typography/Typography";
import Image from "next/image";
import { useState } from "react";

import { ExersiceType, ListItemTypes } from "../WorkoutHistory";

const ExListItem = ({
  img,
  trainedGroupes,
  countSetsAndResp,
}: ExersiceType) => {
  return (
    <li className={shStyles.WHistoryItem}>
      <Image
        src={img}
        className={shStyles.WHistoryItemImage}
        alt="Exersice gif"
      />
      <div className={shStyles.WHistoryItemContent}>
        <Typography type="p">{trainedGroupes}</Typography>
        <Typography type="p">{countSetsAndResp}</Typography>
      </div>
    </li>
  );
};

const WorkoutHistoryItem = ({
  workoutData,
}: {
  workoutData: ListItemTypes[];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openWorkoutDetails = () => {
    setIsOpen((isOpen) => (isOpen = !isOpen));
  };

  return (
    <li className={shStyles.card} onClick={openWorkoutDetails}>
      <div className={shStyles.cartHeader}>
        <Typography type="p">
          WHItem {workoutData[0].dateOfExersice.toDateString()}
        </Typography>
      </div>
      <div className={shStyles.cartBody}>
        <ul className={shStyles.WHList}>
          {isOpen &&
            workoutData[0].exersices.map((item, ind) => (
              <ExListItem {...item} key={ind} />
            ))}
        </ul>
      </div>
    </li>
  );
};

export default WorkoutHistoryItem;
