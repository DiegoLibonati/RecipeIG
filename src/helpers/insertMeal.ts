import { mealContainer } from "../constants/elements";
import { Meal } from "../entities/vite-env";
import { removeMeal } from "./removeMeal";

export const insertMeal = (meal: Meal): void => {
  if (mealContainer.children.length > 0) {
    removeMeal();
  }

  const img = document.createElement("img");

  img.src = meal.strMealThumb;
  img.alt = meal.strMeal;

  img.setAttribute("class", "w-full h-full rounded-lg object-cover");

  mealContainer.append(img);

  return;
};
