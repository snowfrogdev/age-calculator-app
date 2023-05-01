import { getAge } from "./get-age.js";
import { pluralize } from "./pluralize.js";
import "./input-group.component.js";
import { isValidDate } from "./is-valid-date.js";
const formElement = document.querySelector("form");
const dayInputGroupElement = document.querySelector("#day-input-group");
const monthInputGroupElement = document.querySelector("#month-input-group");
const yearInputGroupElement = document.querySelector("#year-input-group");
const allInputGroupElements = [dayInputGroupElement, monthInputGroupElement, yearInputGroupElement];
const dayInputElement = dayInputGroupElement.querySelector("input");
const monthInputElement = monthInputGroupElement.querySelector("input");
const yearInputElement = yearInputGroupElement.querySelector("input");
const allInputElements = [dayInputElement, monthInputElement, yearInputElement];
const submitButton = document.querySelector("button");
const resultDaysElement = document.querySelector("#result-days");
const resultMonthsElement = document.querySelector("#result-months");
const resultYearsElement = document.querySelector("#result-years");
const resultDaysLabelElement = document.querySelector("#result-days-label");
const resultMonthsLabelElement = document.querySelector("#result-months-label");
const resultYearsLabelElement = document.querySelector("#result-years-label");
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
    const day = formData.get("day");
    const month = formData.get("month");
    const year = formData.get("year");
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
    resultDaysElement.textContent = age.days.toString();
    resultMonthsElement.textContent = age.months.toString();
    resultYearsElement.textContent = age.years.toString();
    resultDaysLabelElement.textContent = pluralize(age.days, "day", "days");
    resultMonthsLabelElement.textContent = pluralize(age.months, "month", "months");
    resultYearsLabelElement.textContent = pluralize(age.years, "year", "years");
});
function resetResults() {
    resultDaysElement.textContent = "- -";
    resultMonthsElement.textContent = "- -";
    resultYearsElement.textContent = "- -";
    resultDaysLabelElement.textContent = "days";
    resultMonthsLabelElement.textContent = "months";
    resultYearsLabelElement.textContent = "years";
}
//# sourceMappingURL=main.js.map