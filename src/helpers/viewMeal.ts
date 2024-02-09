import {
  deleteMealButton,
  likeMeal,
  mealContainer,
  nextMeal,
} from "../constants/elements";
import { mealState } from "../state";
import { getLocalStorage } from "./getLocalStorage";
import { removeMeal } from "./removeMeal";

export const viewMeal = (idMeal: string): void => {
  const list = getLocalStorage();

  const meal = list.find((meal) => meal.idMeal === idMeal);

  mealState.currentMeal = meal!;
  mealState.historyOpen = true;

  removeMeal();

  const article = document.createElement("article");
  article.classList.add("w-full", "h-full");

  const div = document.createElement("div");
  div.setAttribute(
    "class",
    "flex items-center justify-center relative w-full h-[30%]"
  );

  const h2 = document.createElement("h2");
  h2.setAttribute(
    "class",
    "absolute z-[100] text-white text-lg font-semibold truncate w-[75%] text-center"
  );
  h2.textContent = mealState.currentMeal.strMeal;

  const img = document.createElement("img");
  img.setAttribute("class", "absolute w-full rounded-lg h-full object-cover");
  img.src = mealState.currentMeal?.strMealThumb!;
  img.alt = mealState.currentMeal?.strMeal!;

  div.append(img);
  div.append(h2);

  const p = document.createElement("p");
  p.setAttribute(
    "class",
    "w-full h-[70%] overflow-auto text-justify pt-[.5rem]"
  );
  p.textContent = mealState.currentMeal?.strInstructions!;

  article.append(div);
  article.append(p);

  const button = document.createElement("button");
  button.setAttribute(
    "class",
    "absolute top-4 right-4 h-12 w-12 bg-[#BBE2EC] rounded-full text-white text-base cursor-pointer active:scale-75 transition-all"
  );
  button.type = "button";

  const icon = document.createElement("i");
  icon.setAttribute("class", "fa fa-x");
  icon.setAttribute("aria-hidden", "true");

  button.append(icon);

  mealContainer.append(article);
  mealContainer.append(button);

  deleteMealButton.removeAttribute("disabled");
  deleteMealButton.classList.add("[&&]:bg-[#0D9276]");
  deleteMealButton.classList.remove("[&&]:bg-[#ccc]", "cursor-not-allowed");

  likeMeal.classList.add("[&&]:bg-[#ccc]", "[&&]:cursor-not-allowed");

  button.addEventListener("click", () => {
    nextMeal.click();
  });
};
