"use client";
import { ReactNode, useState, MouseEvent } from "react";
import Image from "next/image";
import Shevron from "../../../assets/images/Shevron.png";
import selectStyles from "./select.module.css";

type Props = {
  currentValue: string;
  children: ReactNode[];
  clickHandler: (e: MouseEvent<HTMLLIElement>) => void;
};

export const Select = ({ currentValue, children, clickHandler }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHoveringButton, setIsHoveringButton] = useState<boolean>(false);
  const [isHoveringList, setIsHoveringList] = useState<boolean>(false);

  const handleButtonMouseEnter = () => {
    setIsOpen(true);
    setIsHoveringButton(true);
  };

  const handleButtonMouseLeave = () => {
    setIsHoveringButton(false);

    if (!isHoveringList) {
      setIsOpen(false);
    }
  };

  const handleListMouseEnter = () => {
    setIsHoveringList(true);
  };

  const handleListMouseLeave = () => {
    setIsHoveringList(false);

    if (!isHoveringButton) {
      setIsOpen(false);
    }
  };

  const butttonClasses = isOpen
    ? `${selectStyles.button} ${selectStyles.hovered}`
    : selectStyles.button;

  const imageClasses = isOpen
    ? `${selectStyles.arrow} ${selectStyles.rotated}`
    : selectStyles.arrow;

  return (
    <div className={selectStyles.select}>
      <div className={selectStyles.header}>
        <button
          type="button"
          className={butttonClasses}
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
        >
          {currentValue}{" "}
          <Image src={Shevron} alt="arrow" className={imageClasses} />
        </button>
      </div>
      {isOpen && (
        <div
          className={selectStyles.body}
          onMouseEnter={handleListMouseEnter}
          onMouseLeave={handleListMouseLeave}
        >
          <ol className={selectStyles.list}>
            {children &&
              children.map((option, i) => (
                <li
                  key={i}
                  className={selectStyles.option}
                  onClick={clickHandler}
                >
                  {option}
                </li>
              ))}
          </ol>
        </div>
      )}
    </div>
  );
};
