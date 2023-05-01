import { getAge } from "./get-age.js";
import { pluralize } from "./pluralize.js";
import "./input-group.component.js";
const formElement = document.querySelector("form");
const dayInputGroupElement = document.querySelector("#day-input-group");
const monthInputGroupElement = document.querySelector("#month-input-group");
const yearInputGroupElement = document.querySelector("#year-input-group");
const submitButton = document.querySelector("button");
const resultDaysElement = document.querySelector("#result-days");
const resultMonthsElement = document.querySelector("#result-months");
const resultYearsElement = document.querySelector("#result-years");
const resultDaysLabelElement = document.querySelector("#result-days-label");
const resultMonthsLabelElement = document.querySelector("#result-months-label");
const resultYearsLabelElement = document.querySelector("#result-years-label");
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData(formElement);
    const day = formData.get("day");
    const month = formData.get("month");
    const year = formData.get("year");
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
//# sourceMappingURL=main.js.map