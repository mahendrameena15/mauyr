export const updateDefaultPaymentTerms = async (
  buyerId,
  defaultPaymentTerm,
  shippingcharges
) => {
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL;

  const update = await fetch(
    `${supplierCreateUrl}/api/OMSupplier/UpdatePaymentInfo?BuyerId=${buyerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        defaultPaymentTerm: [defaultPaymentTerm],
        shippingcharges: shippingcharges,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else false;
    })
    .catch((error) => console.log(error));

  return update;
};
