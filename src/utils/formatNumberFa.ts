export function formatNumberFa(numberString: string) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  if (numberString.startsWith("0")) {
    return numberString.replace(
      /\d/g,
      (digit) => persianDigits[parseInt(digit, 10)]
    );
  } else {
    const number = parseInt(numberString, 10);
    return number
      .toString()
      .replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);
  }
}
