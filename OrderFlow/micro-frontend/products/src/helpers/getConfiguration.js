export const getConfiguration = (innerUnitOfMeasure, baseUnitOfMeasure) => {
  const innerUnitMatch =
    innerUnitOfMeasure &&
    innerUnitOfMeasure?.toString()?.match(/(\d+)\s*([\s\S]*)/);
  const innerUnitValue = innerUnitMatch ? innerUnitMatch[1] : "";
  const innerUnitName = innerUnitMatch
    ? innerUnitMatch[2].trim().split(" ")[0]
    : "";
  const innerUnitType = innerUnitOfMeasure && innerUnitOfMeasure.split(" ");
  const innerUnitTypeName = innerUnitType[innerUnitType.length - 1];

  // Extracting the numeric value and unit from the base unit of measure
  const baseUnitMatch =
    baseUnitOfMeasure &&
    baseUnitOfMeasure?.toString()?.match(/(\d+)\s*([\s\S]*)/);
  const baseUnitValue = baseUnitMatch ? baseUnitMatch[1] : "";
  const baseUnitName = baseUnitMatch
    ? baseUnitMatch[2].trim().split(" ")[0]
    : "";

  // Constructing the converted value
  const convertedValue = `(${baseUnitValue} ${baseUnitName} x ${innerUnitValue} ${innerUnitName}) ${innerUnitTypeName}`;

  return convertedValue;
};

export const convertInnerUnitAndBaseUnit = (
  innerUnitOfMeasure,
  baseUnitOfMeasure
) => {
  const innerUnitMatch =
    innerUnitOfMeasure &&
    innerUnitOfMeasure?.toString()?.match(/(\d+)\s*([\s\S]*)/);
  const innerUnitValue = innerUnitMatch ? innerUnitMatch[1] : "";
  const innerUnitName = innerUnitMatch ? innerUnitMatch[2].trim() : "";
  const innerUnitType = innerUnitOfMeasure && innerUnitOfMeasure.split(" ");

  // Extracting the numeric value and unit from the base unit of measure
  const baseUnitMatch =
    baseUnitOfMeasure &&
    baseUnitOfMeasure?.toString()?.match(/(\d+)\s*([\s\S]*)/);
  const baseUnitValue = baseUnitMatch ? baseUnitMatch[1] : "";
  const baseUnitName = baseUnitMatch ? baseUnitMatch[2].trim() : "";

  // Constructing the converted value
  const baseUnit = `${baseUnitValue} ${baseUnitName}`;
  const innerUnit = `${innerUnitValue} ${innerUnitName}`;

  return { baseUnit, innerUnit };
};
