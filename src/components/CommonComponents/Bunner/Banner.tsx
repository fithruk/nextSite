"use client";
import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { Typography } from "../Typography/Typography";
import bannerStyles from "./banner.module.css";

type BannerProps = {
  img: StaticImageData;
  type: "main" | "sub";
  bannerHeader?: string;
  bannerParagraph?: string;
  subParagraph1?: string;
  subParagraph2?: string;
  classNames?: string;
  lineColor?: string;
  fillColor?: string;
  drawLine?: (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    lineColor: string,
    fillColor: string
  ) => void;
};

export const drawLine = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  lineColor: string,
  fillColor: string
) => {
  // Настраиваем стиль линии
  context.strokeStyle = lineColor; // Цвет линии
  context.lineWidth = 1; // Толщина линии

  // Функция для генерации случайной амплитуды в пределах от min до max
  const getRandomAmplitude = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  // Начинаем рисовать волнистую линию
  context.beginPath();
  context.moveTo(0, 100); // Начальная точка

  const frequency = 90; // Частота волны (ширина)
  const minAmplitude = 20; // Минимальная амплитуда
  const maxAmplitude = 120; // Максимальная амплитуда
  let basePointY = 70; // Начальная точка Y для волны

  // Указываем, насколько basePointY будет увеличиваться по мере продвижения
  const growthRate = 1; // Чем больше значение, тем круче подъем

  for (let x = 0; x < canvas.width; x += frequency) {
    // Генерируем случайную амплитуду для каждой волны
    const randomAmplitude = getRandomAmplitude(minAmplitude, maxAmplitude);

    // Постепенно увеличиваем basePointY на каждом шаге
    basePointY += growthRate;

    const controlPointX = x + frequency / 2;
    const controlPointY =
      x % (2 * frequency) === 0
        ? basePointY + randomAmplitude
        : basePointY - randomAmplitude;

    context.quadraticCurveTo(
      controlPointX,
      controlPointY,
      x + frequency,
      basePointY
    );
  }

  // Закрываем путь до нижней границы канваса, чтобы заполнить область под волной
  context.lineTo(canvas.width, canvas.height);
  context.lineTo(0, canvas.height);
  context.closePath();

  // Заливаем область под волной
  context.fillStyle = fillColor; // Цвет под волной
  context.fill();

  // Рисуем саму линию
  context.stroke();
};

const Banner = ({
  img,
  bannerHeader,
  bannerParagraph,
  subParagraph1,
  subParagraph2,
  classNames,
  type,
  drawLine,
  lineColor,
  fillColor,
}: BannerProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const commonClassNames = classNames
    ? `${bannerStyles.subBanner} ${classNames}`
    : bannerStyles.subBanner;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && drawLine) {
      const ctx = canvas?.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      drawLine(
        ctx as CanvasRenderingContext2D,
        canvas as HTMLCanvasElement,
        lineColor as string,
        fillColor as string
      );
    }
  }, []);

  switch (type) {
    case "main":
      return (
        <div className={bannerStyles.mainBanner}>
          <div className={bannerStyles.content}>
            <Typography type="h2">{bannerHeader}</Typography>
            <Typography type="p">{bannerParagraph}</Typography>
          </div>
          <div className={bannerStyles.imgContainer}>
            <Image className={bannerStyles.bannerImg} src={img} alt="banner" />
          </div>
        </div>
      );
    case "sub":
      return (
        <div className={commonClassNames}>
          <div className={bannerStyles.subContent}>
            <div className={bannerStyles.subImgContainer}>
              <Image className={bannerStyles.subImg} src={img} alt="banner" />
            </div>
            <div>
              <Typography type="p">{subParagraph1}</Typography>
              <Typography type="p">{subParagraph2}</Typography>
            </div>
          </div>
          <div className={bannerStyles.subWaveContainer}>
            <canvas ref={canvasRef} className={bannerStyles.subWave}></canvas>
          </div>
        </div>
      );

    default:
      break;
  }
};

export default Banner;
