import { Meal } from "../entities/vite-env";
import { getLocalStorage } from "./getLocalStorage";

export const addLocalStorage = (meal: Meal): void => {
  const list = getLocalStorage();

  list.push(meal);

  localStorage.setItem("list", JSON.stringify(list));
};
