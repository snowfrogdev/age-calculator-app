import { getAge } from "./get-age.js";
import { pluralize } from "./pluralize.js";
import "./input-group.component.js";
import { InputGroupComponent } from "./input-group.component.js";

const formElement = document.querySelector("form")!;

const dayInputGroupElement: InputGroupComponent = document.querySelector("#day-input-group")!;
const monthInputGroupElement: InputGroupComponent = document.querySelector("#month-input-group")!;
const yearInputGroupElement: InputGroupComponent = document.querySelector("#year-input-group")!;

const submitButton = document.querySelector("button")!;

const resultDaysElement = document.querySelector("#result-days")!;
const resultMonthsElement = document.querySelector("#result-months")!;
const resultYearsElement = document.querySelector("#result-years")!;
const resultDaysLabelElement = document.querySelector("#result-days-label")!;
const resultMonthsLabelElement = document.querySelector("#result-months-label")!;
const resultYearsLabelElement = document.querySelector("#result-years-label")!;

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const formData = new FormData(formElement);
  const day = formData.get("day") as string;
  const month = formData.get("month") as string;
  const year = formData.get("year") as string;

  for (const inputGroup of [dayInputGroupElement, monthInputGroupElement, yearInputGroupElement]) {
    inputGroup.submit();
  }

  if (!formElement.checkValidity()) {
    resultDaysElement.textContent = "--";
    resultMonthsElement.textContent = "--";
    resultYearsElement.textContent = "--";
    resultDaysLabelElement.textContent = "days";
    resultMonthsLabelElement.textContent = "months";
    resultYearsLabelElement.textContent = "years";
    return;
  }

  const age = getAge(new Date(+year, +month - 1, +day));

  resultDaysElement.textContent = age.days.toString();
  resultMonthsElement.textContent = age.months.toString();
  resultYearsElement.textContent = age.years.toString();

  resultDaysLabelElement.textContent = pluralize(age.days, "day", "days");
  resultMonthsLabelElement.textContent = pluralize(age.months, "month", "months");
  resultYearsLabelElement.textContent = pluralize(age.years, "year", "years");
});
