import { getAge } from "./getAge.js";
import { pluralize } from "./pluralize.js";

const formElement = document.querySelector("form")!;
const dayInputLabelElement = document.querySelector("label[for='day']")!;
const monthInputLabelElement = document.querySelector("label[for='month']")!;
const yearInputLabelElement = document.querySelector("label[for='year']")!;
const dayInputElement = document.querySelector("#day")! as HTMLInputElement;
const monthInputElement = document.querySelector("#month")! as HTMLInputElement;
const yearInputElement = document.querySelector("#year")! as HTMLInputElement;
const dayInputErrorElement = document.querySelector("#day-error")!;
const monthInputErrorElement = document.querySelector("#month-error")!;
const yearInputErrorElement = document.querySelector("#year-error")!;

const submitButton = document.querySelector("button")!;

const resultDaysElement = document.querySelector("#result-days")!;
const resultMonthsElement = document.querySelector("#result-months")!;
const resultYearsElement = document.querySelector("#result-years")!;
const resultDaysLabelElement = document.querySelector("#result-days-label")!;
const resultMonthsLabelElement = document.querySelector("#result-months-label")!;
const resultYearsLabelElement = document.querySelector("#result-years-label")!;

dayInputElement.addEventListener("input", () => {
  if (dayInputElement.validity.valid) {
    dayInputLabelElement.classList.remove("invalid");
    dayInputElement.classList.remove("invalid");
    dayInputErrorElement.textContent = "";
  }
});

monthInputElement.addEventListener("input", () => {
  if (monthInputElement.validity.valid) {
    monthInputLabelElement.classList.remove("invalid");
    monthInputElement.classList.remove("invalid");
    monthInputErrorElement.textContent = "";
  }
});

yearInputElement.addEventListener("input", () => {
  if (yearInputElement.validity.valid) {
    yearInputLabelElement.classList.remove("invalid");
    yearInputElement.classList.remove("invalid");
    yearInputErrorElement.textContent = "";
  }
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const formData = new FormData(formElement);
  const day = formData.get("day") as string;
  const month = formData.get("month") as string;
  const year = formData.get("year") as string;

  let hasErrors = false;

  if (day === "") {
    dayInputLabelElement.classList.add("invalid");
    dayInputElement.classList.add("invalid");
    dayInputErrorElement.textContent = "This field is required";
    hasErrors = true;
  }

  if (month === "") {
    monthInputLabelElement.classList.add("invalid");
    monthInputElement.classList.add("invalid");
    monthInputErrorElement.textContent = "This field is required";
    hasErrors = true;
  }

  if (year === "") {
    yearInputLabelElement.classList.add("invalid");
    yearInputElement.classList.add("invalid");
    yearInputErrorElement.textContent = "This field is required";
    hasErrors = true;
  }

  if (hasErrors) return;

  const age = getAge(new Date(+year, +month - 1, +day));

  resultDaysElement.textContent = age.days.toString();
  resultMonthsElement.textContent = age.months.toString();
  resultYearsElement.textContent = age.years.toString();

  resultDaysLabelElement.textContent = pluralize(age.days, "day", "days");
  resultMonthsLabelElement.textContent = pluralize(age.months, "month", "months");
  resultYearsLabelElement.textContent = pluralize(age.years, "year", "years");
});
