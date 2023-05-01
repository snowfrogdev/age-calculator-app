import { getAge } from "../src/get-age.js";
import { isValidDate } from "../src/is-valid-date.js";

testGetAge(new Date(1990, 0, 1), () => new Date(1990, 0, 2).getTime(), { years: 0, months: 0, days: 1 });
testGetAge(new Date(1990, 0, 1), () => new Date(1990, 1, 1).getTime(), { years: 0, months: 1, days: 0 });
testGetAge(new Date(1990, 0, 1), () => new Date(1991, 0, 1).getTime(), { years: 1, months: 0, days: 0 });
testGetAge(new Date(1990, 0, 1), () => new Date(1990, 0, 1).getTime(), { years: 0, months: 0, days: 0 });
testGetAge(new Date(1990, 0, 1), () => new Date(1991, 1, 2).getTime(), { years: 1, months: 1, days: 1 });
testGetAge(new Date(1990, 0, 1), () => new Date(1991, 1, 1).getTime(), { years: 1, months: 1, days: 0 });
testGetAge(new Date(1990, 0, 1), () => new Date(1991, 0, 2).getTime(), { years: 1, months: 0, days: 1 });
testGetAge(new Date(1990, 0, 1), () => new Date(1990, 1, 2).getTime(), { years: 0, months: 1, days: 1 });
testGetAge(new Date(1990, 0, 1), () => new Date(2023, 1, 2).getTime(), { years: 33, months: 1, days: 1 });

// Test valid dates
console.assert(isValidDate(1, 1, 2022) === true, "1/1/2022");
console.assert(isValidDate(28, 2, 2022) === true, "28/2/2022");
console.assert(isValidDate(31, 12, 2021) === true, "31/12/2021");
console.assert(isValidDate(29, 2, 2000) === true);
console.assert(isValidDate(29, 2, 2004) === true);

// Test invalid dates
console.assert(isValidDate(0, 1, 2022) === false, "0/1/2022");
console.assert(isValidDate(1, 0, 2022) === false, "1/0/2022");
console.assert(isValidDate(32, 1, 2022) === false, "32/1/2022");
console.assert(isValidDate(31, 4, 2021) === false, "31/4/2021");
console.assert(isValidDate(29, 2, 2021) === false, "29/2/2021");
console.assert(isValidDate(29, 2, 2022) === false, "29/2/2022");

function testGetAge(birthdate: Date, now = Date.now, expected: { years: number; months: number; days: number }) {
  const actual = getAge(birthdate, now);

  console.assert(
    actual.years === expected.years && actual.months === expected.months && actual.days === expected.days,
    `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
  );
}
