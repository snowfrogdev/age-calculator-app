export function isValidDate(day, month, year) {
    if (month < 1 || month > 12) {
        return false;
    }
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false;
    }
    return true;
}
//# sourceMappingURL=is-valid-date.js.map