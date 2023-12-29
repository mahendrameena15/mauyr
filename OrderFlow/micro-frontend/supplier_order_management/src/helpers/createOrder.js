export const createOrder = async (
  customerDetails,
  defaultPaymentTermValue,
  cartCalculations,
  shippingcharges
) => {
  const cartId = localStorage.getItem("cartId");
  const total = cartCalculations.total + parseFloat(shippingcharges.price);
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL

  const order = fetch(
    `${supplierCreateUrl}/api/OMSupplier/CreateOrders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderStatus: "New",
        paymentStatus: "Unpaid",
        orderByEmailID: customerDetails?.deliveryEmail,
        defaultPaymentTerm: [defaultPaymentTermValue?.label],
        totalPrice: cartCalculations.subTotal,
        payAmountLong: total,
        cartID: cartId,
        shippingNames: shippingcharges.name,
        shippingcharges: parseFloat(shippingcharges.price),
        gst: cartCalculations.gst,
        wt: cartCalculations.wet,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else false;
    })
    .catch((error) => console.log(error));

  return order;
};
