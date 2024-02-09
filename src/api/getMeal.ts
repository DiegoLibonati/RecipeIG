import axios from "axios";
import { Meal } from "../entities/vite-env";

export const getMeal = async (): Promise<Meal> => {
  const request = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const meal = request.data.meals[0]

  return meal
};
