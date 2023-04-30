export function getAge(birthdate: Date, now = Date.now): { years: number; months: number; days: number } {
  const ageInMilliseconds = now() - birthdate.getTime();

  const age = new Date(ageInMilliseconds); // As if born in 1970
  const years = age.getUTCFullYear() - 1970;
  const months = age.getUTCMonth();
  const days = age.getUTCDate() - 1;

  return { years, months, days };
}
