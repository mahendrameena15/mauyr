export const getProducts = async () => {
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL;

  const organisationId = localStorage.getItem("organisationId");
  const products = await fetch(
    `${supplierCreateUrl}/api/OMSupplier/getProduct?OrganisationId=${organisationId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data;
      else throw new Error("Some error has occurred on fetching products.");
    })
    .catch((error) => console.log(error));

  return products;
};
