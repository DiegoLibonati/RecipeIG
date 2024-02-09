import { getMeal } from "./api/getMeal";
import { getMealByName } from "./api/getMealByName";
import {
  deleteMealButton,
  formButton,
  historiesContainer,
  inputForm,
  likeMeal,
  nextMeal,
} from "./constants/elements";
import { addLocalStorage } from "./helpers/addLocalStorage";
import { deleteLocalStorage } from "./helpers/deleteLocalStorage";
import { getLocalStorage } from "./helpers/getLocalStorage";
import { handleAlert } from "./helpers/handleAlert";
import { insertHistory } from "./helpers/insertHistory";
import { insertMeal } from "./helpers/insertMeal";
import { mealState } from "./state";

const onInit = (): void => {
  const list = getLocalStorage();
  generateMeal();

  if (list.length === 0) {
    const span = document.createElement("span");

    span.setAttribute(
      "class",
      "flex items-center justify-center h-12 w-12 rounded-full p-1 bg-[#BBE2EC] text-white cursor-not-allowed md:h-16 md:w-16"
    );

    const icon = document.createElement("i");

    icon.setAttribute("class", "fa fa-plus");
    icon.setAttribute("aria-hidden", "true");

    span.append(icon);
    historiesContainer.append(span);

    return;
  }

  list.forEach((meal) => {
    insertHistory(meal);

    return;
  });
};

const generateMeal = async (): Promise<void> => {
  const meal = await getMeal();
  mealState.currentMeal = meal;
  mealState.historyOpen = false;

  deleteMealButton.setAttribute("disabled", "");
  deleteMealButton.classList.add("[&&]:bg-[#ccc]");
  deleteMealButton.classList.remove("[&&]:bg-[#0D9276]");

  likeMeal.classList.remove("[&&]:bg-[#ccc]", "[&&]:cursor-not-allowed");

  insertMeal(meal);
};

const saveMeal = (): void => {
  if (!mealState?.currentMeal?.idMeal) return;

  const list = getLocalStorage();

  if (list.some((m) => m.idMeal === mealState.currentMeal?.idMeal)) {
    handleAlert("The story is already added", "error");
    return;
  }

  insertHistory(mealState?.currentMeal);

  addLocalStorage(mealState?.currentMeal);

  handleAlert("Story successfully added", "success");
};

const deleteMeal = (): void => {
  const idMeal = mealState?.currentMeal?.idMeal;

  deleteLocalStorage(idMeal!);

  if (!mealState.historyOpen) return;

  historiesContainer.innerHTML = "";

  onInit();

  handleAlert("Story successfully deleted", "success");
};

const searchMeal = async (e: MouseEvent): Promise<void> => {
  e.preventDefault();

  const nameMeal = inputForm.value.trim();

  if (!nameMeal) return;

  const meal = await getMealByName(nameMeal);

  inputForm.value = "";

  if (!meal) {
    handleAlert("Meal not found", "error");
    return;
  }

  mealState.currentMeal = meal;

  insertMeal(mealState.currentMeal);

  handleAlert("Meal found", "success");
};

// Events
document.addEventListener("DOMContentLoaded", onInit);
nextMeal.addEventListener("click", generateMeal);
likeMeal.addEventListener("click", saveMeal);
deleteMealButton.addEventListener("click", deleteMeal);
formButton.addEventListener("click", (e) => searchMeal(e));
