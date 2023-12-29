export function removePercentageFromString(inputString) {
  // Use the replace() method with a regular expression to remove the percentage character (%)
  return inputString?.replace(/%/g, "");
}
