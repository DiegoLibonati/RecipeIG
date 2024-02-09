import axios from "axios";
import { Meal } from "../entities/vite-env";

export const getMealByName = async (nameMeal: string): Promise<Meal> => {
  const request = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameMeal}`
  );

  if (!request.data.meals) return request.data.meals

  return request.data.meals[0]
};
