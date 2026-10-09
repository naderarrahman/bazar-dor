export function toBengaliNumber(num: number | string): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return num
    .toString()
    .split("")
    .map((digit) => {
      if (/\d/.test(digit)) {
        return bengaliDigits[parseInt(digit)];
      }
      return digit; 
    })
    .join("");
}