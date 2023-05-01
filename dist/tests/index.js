import { getAge } from "../src/get-age";
function testGetAge(birthdate, now = Date.now, expected) {
    const actual = getAge(birthdate, now);
    if (actual.years !== expected.years || actual.months !== expected.months || actual.days !== expected.days) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
}
testGetAge(new Date(1990, 0, 1), () => new Date(1990, 0, 2).getTime(), { years: 0, months: 0, days: 1 });
testGetAge(new Date(1990, 0, 1), () => new Date(1990, 1, 1).getTime(), { years: 0, months: 1, days: 0 });
testGetAge(new Date(1990, 0, 1), () => new Date(1991, 0, 1).getTime(), { years: 1, months: 0, days: 0 });
testGetAge(new Date(1990, 0, 1), () => new Date(1990, 0, 1).getTime(), { years: 0, months: 0, days: 0 });
testGetAge(new Date(1990, 0, 1), () => new Date(1991, 1, 2).getTime(), { years: 1, months: 1, days: 1 });
testGetAge(new Date(1990, 0, 1), () => new Date(1991, 1, 1).getTime(), { years: 1, months: 1, days: 0 });
testGetAge(new Date(1990, 0, 1), () => new Date(1991, 0, 2).getTime(), { years: 1, months: 0, days: 1 });
testGetAge(new Date(1990, 0, 1), () => new Date(1990, 1, 2).getTime(), { years: 0, months: 1, days: 1 });
testGetAge(new Date(1990, 0, 1), () => new Date(2023, 1, 2).getTime(), { years: 33, months: 1, days: 1 });
console.log("All tests passed!");
//# sourceMappingURL=index.js.map