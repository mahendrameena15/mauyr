export function formatPrice(revenue) {
    // Convert the revenue to a number
    const numericRevenue = parseFloat(revenue);
  
    // Check if the conversion is successful
    if (isNaN(numericRevenue)) {
      // If the conversion fails, return the original input
      return revenue;
    }
  
    // Use Number.prototype.toLocaleString() to format the number with commas
    const formattedRevenue = numericRevenue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return formattedRevenue;
  }
  
  
  