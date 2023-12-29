export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  // const month = date.getMonth() + 1; // Months are zero-based
  const monthAbbreviation = date.toLocaleString("default", { month: "short" }); // Get three-letter month abbreviation
  const year = date.getFullYear();

  const formattedDay = String(day).padStart(2, "0");
  // const formattedMonth = String(month).padStart(2, "0");

  return `${formattedDay} ${monthAbbreviation} ${year}`;
};
