import { FoodTableStateType } from "@/types/types";
import styles from "./foodMenuItemsList.module.css";
import { Typography } from "@/components/CommonComponents/Typography/Typography";

type FoodMenuItemsListTypes = FoodTableStateType;

const FoodMenuItemsList = ({
  fats,
  vegetables,
  proteins,
  carbohydrates,
}: FoodMenuItemsListTypes) => {
  const foodMenuItemsArray = Object.entries({
    fats,
    vegetables,
    proteins,
    carbohydrates,
  }).filter(([, value]) => value);

  const totalCalories = foodMenuItemsArray.reduce(
    (prev, [, items]) =>
      prev + (items?.reduce((sum, item) => sum + item.calories, 0) ?? 0),
    0
  );

  return (
    <ul className={styles.foodMenuItemsList}>
      {foodMenuItemsArray.map(([key, items]) => (
        <li key={key}>
          <strong>{key}</strong>:
          <ul>
            {items!.map((item, index) => (
              <li key={index}>
                {item.name} — {item.grams}g, {item.calories}kcal
              </li>
            ))}
          </ul>
        </li>
      ))}
      <li>
        <Typography type="p">
          <strong>Total Calories:</strong> {totalCalories}
        </Typography>
      </li>
    </ul>
  );
};

export default FoodMenuItemsList;
