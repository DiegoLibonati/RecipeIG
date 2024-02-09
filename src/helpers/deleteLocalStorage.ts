import { getLocalStorage } from "./getLocalStorage";

export const deleteLocalStorage = (idMeal: string): void => {
  const list = getLocalStorage();

  const newList = list.filter((meal) => meal.idMeal !== idMeal);

  localStorage.setItem("list", JSON.stringify(newList));
};
