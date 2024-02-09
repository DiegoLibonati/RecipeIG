import { alert, alertH2 } from "../constants/elements";

export const handleAlert = (message: string, type: string): void => {
  alert.classList.remove("opacity-0");
  alert.classList.add(
    "opacity-100",
    type === "success" ? "bg-[#0D9276]" : "bg-red-600"
  );
  alertH2.textContent = message;

  const timeout = setTimeout(() => {
    alert.classList.add("opacity-0");
    alert.classList.remove("opacity-100", "bg-[#0D9276]", "bg-red-600");
    alertH2.textContent = "";

    clearTimeout(timeout);
  }, 2000);

  return;
};
