export const addToCart = async (value, buyerId) => {
  const organisationId = localStorage.getItem("organisationId");
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL

  const cart = await fetch(
    `${supplierCreateUrl}/api/OMSupplier/AddToCartSupplier`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerId: buyerId || "",
        organisationId: organisationId || "",
        productId: value?.productId || "",
        title: value?.title || "",
        description: value?.description || "",
        articleId: 0,
        skUcode: value?.skUcode || "",
        productImageUrls: value?.productImageUrls || [],
        unitofMeasure: value?.unitofMeasure || "",
        innerUnitofMeasure: value?.innerUnitofMeasure || "",
        configuration: value?.configuration || "",
        award: value.award || "",
        brand: value?.brand || "",
        departmentId: value?.departmentId || "",
        categoryId: value?.categoryId || "",
        subCategoryId: value?.subCategoryId || "",
        segmentId: value?.segmentId || "",
        variety: value?.variety || [],
        vintage: value?.vintage || "",
        abv: value?.abv || "",
        globalPrice: value?.globalPrice || 0,
        luCcost: value?.luCcost || 0,
        buyPrice: value?.buyPrice || 0,
        gstFlag: value?.gstFlag || false,
        wetFlag: value?.wetFlag || false,
        trackInventory: value?.trackInventory || false,
        region: value?.region || "",
        availableQty: value?.availableQty || "",
        quantity: 0,
        stockThreshold: value?.stockThreshold || 0,
        stockStatus: value?.stockStatus || "",
        regionAvailability: value?.regionAvailability || [],
        productStatus: "Cart",
        visibility: value?.visibility || "",
        minimumOrder: value?.minimumOrder || 0,
        tags: value?.tags || [],
        countryOfOrigin: value?.countryOfOrigin || "",
        barcodes: "",
        esgStatus: "",
        healthRating: "",
        isActive: value?.isActive || false,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data;
      else return false;
    })
    .catch((error) => console.log(error));

  return cart;
};
