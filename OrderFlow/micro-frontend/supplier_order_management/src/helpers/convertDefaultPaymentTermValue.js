export const convertDefaultPaymentTermValue = (input) => {
  // Trim any leading or trailing spaces in the input
  input = input.trim();

  const match = input.match(/^(\d+) days from (invoice date|end of month)$/i);

  if (!match) {
    throw new Error("Invalid input format");
  }

  const days = parseInt(match[1]);
  const referenceDate = match[2].toLowerCase();

  if (isNaN(days)) {
    throw new Error("Invalid number of days");
  }

  const today = new Date();
  let calculatedDate = new Date(today);

  if (referenceDate === "invoice date") {
    calculatedDate.setDate(calculatedDate.getDate() + days);
  } else if (referenceDate === "end of month") {
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    calculatedDate = new Date(endOfMonth);
    calculatedDate.setDate(calculatedDate.getDate() + days);
  } else {
    throw new Error("Invalid reference date");
  }

  const dd = String(calculatedDate.getDate()).padStart(2, "0");
  const mm = String(calculatedDate.getMonth() + 1).padStart(2, "0");
  const yyyy = calculatedDate.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};
