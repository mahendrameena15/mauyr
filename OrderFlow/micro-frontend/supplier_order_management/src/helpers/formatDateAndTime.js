export const fomatDateAndTime = (inputDateTime) => {
  const date = new Date(inputDateTime);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

  return `${formattedDate} at ${formattedTime}`;
};

export function formatGivenDate(inputDate) {
  const date = new Date(inputDate);

  const isoString = date.toISOString();

  return isoString;
}
