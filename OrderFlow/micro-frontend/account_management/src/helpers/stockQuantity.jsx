export const stockQuantity = (products) => {
  let lowStock = 0;
  let outOfStock = 0;

  products.forEach((item) => {
    if (item.availableQty === 0) {
      outOfStock++;
    } else if (item.availableQty <= item.stockThreshold) {
      lowStock++;
    }
  });

  return {
    lowStock,
    outOfStock,
  };
};
