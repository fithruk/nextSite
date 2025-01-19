import { useState, useEffect } from "react";
import { AppLink } from "../Link/Link";
import recipeStyles from "./recipe.module.css";
import { Slider } from "@/components/Slider/Slider";
import sliderStyles from "@/components/Slider/slider.module.css";
import axios from "axios";
import { useSession } from "next-auth/react";

import { Typography } from "../Typography/Typography";
import { FoodType } from "@/types/types";

const tag = "#theFitnessTranerOnline";

type Props = {
  _id: string;
  handleModal: () => void;
};

type RecipeProps = FoodType | null;

const dataTableTitles = ["calories", "proteins", "fats", "carbs", "fiber"];

const Recipe = ({ _id, handleModal }: Props) => {
  const { data: session } = useSession();
  const [recipeData, setRecipeData] = useState<RecipeProps>(null);
  const recipeTitle = recipeData && recipeData?.title.trim().split(":")[1];
  const ingredients = recipeData && Object.values(recipeData?.ingredients);
  const steps =
    recipeData &&
    recipeData.paragraphs.map((ph) => ph.replace(/#gymbeamua/g, tag));

  const porcionsData = steps?.filter((ph, ind) => {
    if (ph.split(" ").length <= 2 || !isNaN(+ph.split(" ")[0])) {
      delete steps[ind];
      return ph;
    }
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const slides: React.ReactElement[] = recipeData?.imgUrls
    ? recipeData.imgUrls.map((img, key) => (
        <img
          src={img}
          onDragStart={handleDragStart}
          alt="food step"
          key={key}
          className={sliderStyles.img}
          role="presentation"
        />
      ))
    : [];

  useEffect(() => {
    (async (_id: string) => {
      try {
        const { data, status } = await axios.get(`/api/foodService/${_id}`, {
          params: {
            token: session?.user.token,
            id: _id,
          },
        });
        if (status === 200) {
          setRecipeData(data);
        }
      } catch (error) {
        console.log(error);
      }
    })(_id);
  }, [_id]);

  return (
    <div className={recipeStyles.container}>
      <AppLink href="#" onClick={handleModal}>
        Back to all
      </AppLink>
      <Typography type="h1">{recipeTitle}</Typography>
      <Typography type="h2">{recipeData?.category}</Typography>
      <div className={recipeStyles.titleImgContainer}>
        <img
          className={recipeStyles.titleImg}
          src={recipeData?.imgUrls[recipeData.imgUrls.length - 1]}
          alt={recipeTitle!}
        />
      </div>
      <div className={recipeStyles.recipeContent}>
        <div className={recipeStyles.steps}>
          <Typography type="h2">Instructions</Typography>
          {steps?.map((ph, i) => (
            <Typography type="p" key={i}>
              {ph}
            </Typography>
          ))}
        </div>
        <div className={recipeStyles.ingredients}>
          {ingredients?.map((item, ind) => {
            if (item.length === 0) return;
            return (
              <ul key={ind}>
                {item.map((li, i) => (
                  <li key={i}>
                    {" "}
                    <Typography type="span">{li}</Typography>
                  </li>
                ))}
              </ul>
            );
          })}
          {
            <ul>
              <li>
                {" "}
                <Typography type="span">
                  {porcionsData && porcionsData[0]}{" "}
                </Typography>
                <Typography type="span">
                  {porcionsData && porcionsData[1]}
                </Typography>
              </li>
              {dataTableTitles.map((title, i) => (
                <li key={i}>
                  {" "}
                  <Typography type="span">{title} </Typography>
                  <Typography type="span">
                    {
                      recipeData?.tableData[
                        title as
                          | "calories"
                          | "proteins"
                          | "carbs"
                          | "fats"
                          | "fiber"
                      ]
                    }
                  </Typography>
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
      <Slider images={slides} />
    </div>
  );
};

export default Recipe;
