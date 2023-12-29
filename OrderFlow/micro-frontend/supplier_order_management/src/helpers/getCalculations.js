export const getCalculations = (cartList, shipCharges) => {
  try {
    let gst = 0;
    let wet = 0;
    let subtotal1 = 0;
    let subtotal2 = 0;
    let subtotal = 0;
    let total = 0;
    let lucUnit = 0;

    cartList?.forEach((product) => {
      const price = product.globalPrice;
      const quantity = product.quantity;
      if (
        product.subCategoryId === "SC5000" ||
        product.subCategoryId === "SC500"
      ) {
        const productSubtotal = price * quantity;
        const wetApplied = productSubtotal * 0.29;
        wet += wetApplied;
        const luc = productSubtotal + wetApplied;
        lucUnit = luc;
        const gstAppliedLuc = luc * 0.1;
        gst += gstAppliedLuc;
        subtotal1 += luc + gstAppliedLuc;
      } else {
        const productSubtotal = price * quantity;
        const gstAppliedOnNonWine = productSubtotal * 0.1;
        gst += gstAppliedOnNonWine;
        subtotal2 += productSubtotal + gstAppliedOnNonWine;
      }
      subtotal = price * quantity;
      total = subtotal1 + subtotal2 + shipCharges;
    });
    return {
      gst: gst.toFixed(2),
      wet: wet.toFixed(2),
      subTotal: subtotal.toFixed(2),
      total: total.toFixed(2),
      shippingcharges: shipCharges,
    };
  } catch (error) {
    throw new Error("Error while processing, error: " + error);
  }
};
