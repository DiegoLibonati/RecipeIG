import { historiesContainer } from "../constants/elements";
import { Meal } from "../entities/vite-env";
import { viewMeal } from "./viewMeal";

export const insertHistory = (meal: Meal) => {
  if (
    historiesContainer.children.length > 0 &&
    historiesContainer.children[0].tagName !== "DIV"
  ) {
    historiesContainer.innerHTML = "";
  }

  const div = document.createElement("div");

  div.setAttribute(
    "class",
    "h-12 w-12 rounded-full p-1 bg-[#BBE2EC] cursor-pointer active:scale-75 transition-all ml-[.5rem] md:h-16 md:w-16"
  );

  const img = document.createElement("img");

  img.src = meal.strMealThumb;
  img.alt = meal.strMeal;
  img.id = meal.idMeal;

  img.setAttribute("class", "w-full h-full rounded-full object-cover");

  div.append(img);

  div.addEventListener("click", () => viewMeal(meal.idMeal));

  historiesContainer.append(div);
};
