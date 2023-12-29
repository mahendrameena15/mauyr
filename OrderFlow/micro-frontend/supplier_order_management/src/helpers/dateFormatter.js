export function formatDateAfterRelativeDate(relativeDate) {
    const currentDate = new Date();
    const dateMap = {
      "Last 7 days": 7,
      "Last 14 days": 14,
      "Last 30 days": 30,
    };
  
    let formattedDate = "";
  
    if (dateMap.hasOwnProperty(relativeDate)) {
      const daysAgo = dateMap[relativeDate];
      const targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() - daysAgo);
  
      const year = targetDate.getFullYear();
      const month = String(targetDate.getMonth() + 1).padStart(2, "0");
      const day = String(targetDate.getDate()).padStart(2, "0");
  
      formattedDate = `${year}-${month}-${day}`;
    } else {
      formattedDate = "";
    }
  
    return formattedDate;
  }
  