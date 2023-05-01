import { getAge } from "./get-age.js";
import { pluralize } from "./pluralize.js";
import "./input-group.component.js";
import { InputGroupComponent } from "./input-group.component.js";
import { isValidDate } from "./is-valid-date.js";

const formElement = document.querySelector("form")!;

const dayInputGroupElement: InputGroupComponent = document.querySelector("#day-input-group")!;
const monthInputGroupElement: InputGroupComponent = document.querySelector("#month-input-group")!;
const yearInputGroupElement: InputGroupComponent = document.querySelector("#year-input-group")!;
const allInputGroupElements = [dayInputGroupElement, monthInputGroupElement, yearInputGroupElement];
const dayInputElement = dayInputGroupElement.querySelector("input")!;
const monthInputElement = monthInputGroupElement.querySelector("input")!;
const yearInputElement = yearInputGroupElement.querySelector("input")!;
const allInputElements = [dayInputElement, monthInputElement, yearInputElement];

const submitButton = document.querySelector("button")!;

const resultDaysElement: HTMLSpanElement = document.querySelector("#result-days")!;
const resultMonthsElement: HTMLSpanElement = document.querySelector("#result-months")!;
const resultYearsElement: HTMLSpanElement = document.querySelector("#result-years")!;
const resultDaysLabelElement = document.querySelector("#result-days-label")!;
const resultMonthsLabelElement = document.querySelector("#result-months-label")!;
const resultYearsLabelElement = document.querySelector("#result-years-label")!;

yearInputElement.max = new Date().getFullYear().toString();

let invalidDate = false;

// Reset the whole form error state when the user starts typing again
for (const input of allInputElements) {
  input.addEventListener("input", () => {
    if (invalidDate) {
      for (const inputGroup of allInputGroupElements) {
        inputGroup.invalid = false;
      }

      dayInputGroupElement.inputErrorElement.textContent = "";
      invalidDate = false;
    }
  });
}

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const formData = new FormData(formElement);
  const day = formData.get("day") as string;
  const month = formData.get("month") as string;
  const year = formData.get("year") as string;

  for (const inputGroup of allInputGroupElements) {
    inputGroup.submit();
  }

  if (!formElement.checkValidity()) {
    resetResults();
    return;
  }

  if (!isValidDate(+day, +month, +year)) {
    invalidDate = true;
    for (const inputGroup of allInputGroupElements) {
      inputGroup.invalid = true;
    }
    dayInputGroupElement.inputErrorElement.textContent = "Invalid date";

    resetResults();
    return;
  }

  const age = getAge(new Date(+year, +month - 1, +day));

  updateResult(resultDaysElement, age.days.toString());
  updateResult(resultMonthsElement, age.months.toString());
  updateResult(resultYearsElement, age.years.toString());

  resultDaysLabelElement.textContent = pluralize(age.days, "day", "days");
  resultMonthsLabelElement.textContent = pluralize(age.months, "month", "months");
  resultYearsLabelElement.textContent = pluralize(age.years, "year", "years");
});

function resetResults() {
  updateResult(resultDaysElement, "- -");
  updateResult(resultMonthsElement, "- -");
  updateResult(resultYearsElement, "- -");
  resultDaysLabelElement.textContent = "days";
  resultMonthsLabelElement.textContent = "months";
  resultYearsLabelElement.textContent = "years";
}

function updateResult(element: HTMLElement, newValue: string) {
  element.classList.add("animate");
  setTimeout(() => {
    element.textContent = newValue;
    element.classList.remove("animate");
  }, 150);
}
