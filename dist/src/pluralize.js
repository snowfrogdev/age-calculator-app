const pluralRules = new Intl.PluralRules("en-US");
export function pluralize(count, singular, plural) {
    const grammaticalNumber = pluralRules.select(count);
    switch (grammaticalNumber) {
        case "one":
            return singular;
        case "other":
            return plural;
        default:
            throw new Error("Unknown: " + grammaticalNumber);
    }
}
//# sourceMappingURL=pluralize.js.map