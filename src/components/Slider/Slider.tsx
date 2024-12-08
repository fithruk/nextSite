"use client";
import Image from "next/image";
import { forwardRef } from "react";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import slyderStyles from "./slider.module.css";
import trainer_1 from "../../assets/images/trainer_1.png";
import trainer_2 from "../../assets/images/trainer_2.png";
import trainer_3 from "../../assets/images/trainer_3.png";
import trainer_4 from "../../assets/images/trainer_4.png";
const handleDragStart = (e: React.DragEvent<HTMLDivElement>) =>
  e.preventDefault();

const items = [
  <Image
    className={slyderStyles.img}
    alt="Slider img"
    key={1}
    src={trainer_1}
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <Image
    className={slyderStyles.img}
    alt="Slider img"
    key={2}
    src={trainer_2}
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <Image
    className={slyderStyles.img}
    alt="Slider img"
    key={3}
    src={trainer_3}
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <Image
    className={slyderStyles.img}
    alt="Slider img"
    key={4}
    src={trainer_4}
    onDragStart={handleDragStart}
    role="presentation"
  />,
];

interface SliderProps {
  images?: React.ReactElement[];
}

export interface imagesProps {
  className?: string;
  alt: string;
  key: React.Key;
  src: string;
  onDragStart?: React.DragEventHandler<HTMLImageElement>;
  role?: React.AriaRole;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const imagesForSlides = props.images ? props.images : items;
  return (
    <div className={slyderStyles.slider} ref={ref}>
      <AliceCarousel mouseTracking items={imagesForSlides} />
    </div>
  );
});

Slider.displayName = "Slider";
