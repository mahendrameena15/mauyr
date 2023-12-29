export function splitRegions(inputString) {
  // Split the input string by commas
  if (inputString !== undefined) {
    const regionsArray = inputString.split(",");

    // Trim each element to remove leading and trailing whitespace
    const trimmedRegions = regionsArray.map((region) => region.trim());

    

    return trimmedRegions;
  } else {
    return undefined;
  }
}
