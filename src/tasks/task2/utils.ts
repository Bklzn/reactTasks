const isDateValid = (dateString: string) => {
  const year = parseInt(dateString.slice(0, 2));
  const month = parseInt(dateString.slice(2, 4));
  const day = parseInt(dateString.slice(4, 6));

  const realMonth = month % 20;
  const date = new Date(year, realMonth - 1, day);

  return date.getMonth() === realMonth - 1 && date.getDate() === day;
};

export const validatePesel = (pesel: string) => {
  const multiplier = [1, 3, 7, 9];
  if (RegExp(/[^0-9]/).test(pesel)) return false;
  if (pesel.length !== 11) return false;
  if (!isDateValid(pesel.slice(0, 6))) return false;
  const sum = pesel
    .split("")
    .slice(0, 10)
    .reduce(
      (acc, digit, idx) => acc + parseInt(digit) * multiplier[idx % 4],
      0
    );
  return pesel.split("").pop() === String(10 - (sum % 10));
};
