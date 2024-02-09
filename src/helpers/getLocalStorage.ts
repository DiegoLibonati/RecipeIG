import { Meal } from "../entities/vite-env";

export const getLocalStorage = (): Meal[] => {
    return localStorage.getItem("list")
      ? JSON.parse(localStorage.getItem("list")!)
      : [];
  };