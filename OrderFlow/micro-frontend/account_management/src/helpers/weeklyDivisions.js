function getWeekDivisionsWithMonthNames() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Find the Monday of the week containing the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  firstDayOfMonth.setDate(firstDayOfMonth.getDate() - daysToSubtract);

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const weekDivisions = [];
  let currentWeek = [];

  for (
    let day = new Date(firstDayOfMonth);
    day <= lastDayOfMonth;
    day.setDate(day.getDate() + 1)
  ) {
    const dayOfWeek = day.getDay();

    if (dayOfWeek === 1 && currentWeek.length > 0) {
      // Start a new week when Monday is encountered
      weekDivisions.push({
        monthName: getMonthShortName(day.getMonth()),
        days: [...currentWeek],
      });
      currentWeek = [];
    }

    currentWeek.push({
      date: day.getDate(),
      month: getMonthShortName(day.getMonth()),
    });

    if (dayOfWeek === 0 && day < lastDayOfMonth) {
      // End the current week on Sunday (unless it's the last day of the month)
      weekDivisions.push({
        monthName: getMonthShortName(day.getMonth()),
        days: [...currentWeek],
      });
      currentWeek = [];
    }
  }

  // If there are remaining days in the last week
  if (currentWeek.length > 0) {
    weekDivisions.push({
      monthName: getMonthShortName(lastDayOfMonth.getMonth()),
      days: [...currentWeek],
    });
  }

  return weekDivisions;
}

function getMonthShortName(monthIndex) {
  const monthNamesShort = [
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
  return monthNamesShort[monthIndex];
}

export const getWeeks = () => {
  const weekList = getWeekDivisionsWithMonthNames();

  const updatedWeeks = weekList.map((item) => {
    return `${item.days[0].month} ${item.days[0].date}`;
  });

  return updatedWeeks;
};
