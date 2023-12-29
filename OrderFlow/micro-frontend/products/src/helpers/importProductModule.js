import {
  convertInnerUnitAndBaseUnit,
  getConfiguration,
} from "./getConfiguration";

export const convertImportedProductList = (importedProducts) => {
  try {
    const organisationId = localStorage.getItem("organisationId");

    const updatedProducts = importedProducts.map((product) => {
      const { baseUnit, innerUnit } = convertInnerUnitAndBaseUnit(
        product?.innerUnitofMeasure,
        product?.unitofMeasure
      );

      const configuration = getConfiguration(
        product?.innerUnitofMeasure,
        product?.unitofMeasure
      );

      const calculatedLucCost =
        product?.wetFlag === 1 || (true && product.globalPrice)
          ? calculateLucCost(product.globalPrice)
          : 0;

      return {
        title: product?.title ? product.title : "",
        description: product?.description ? product.description : "",
        productImageUrls: product?.productImageUrls
          ? product.productImageUrls.split(",")
          : [],
        globalPrice: product?.globalPrice ? product.globalPrice : 0,
        createdBy: "supplier",
        articleID: 0,
        skUcode: product?.skUcode ? product.skUcode : "",
        unitofMeasure: product?.unitofMeasure ? baseUnit : "",
        configuration: configuration,
        brand: product?.brand ? product.brand : "",
        departmentId: product?.departmentId ? product.departmentId : "",
        innerUnitofMeasure: product?.innerUnitofMeasure ? innerUnit : "",
        award: product?.awards ? product.awards : "",
        categoryId: product?.categoryID ? product.categoryID : "",
        subCategoryId: product?.subCategoryId ? product.subCategoryId : "",
        segmentId: product?.segmentId ? product.segmentId : "",
        variety: product?.variety ? product.variety.split(",") : [],
        vintage: product?.vintage ? product?.vintage?.toString() : "",
        abv: product?.abv ? product.abv.toString() : "",
        luCcost: calculatedLucCost,
        buyPrice: product?.buyPrice ? product.buyPrice : 0,
        gstFlag: product?.gstFlag === 1 || true ? true : false,
        wetFlag: product?.wetFlag === 1 || true ? true : false,
        trackInventory: product?.trackInventory === 1 || true ? true : false,
        region: product?.region ? product.region : "",
        availableQty: product?.availableQty ? product.availableQty : 0,
        stockThreshold: product?.stockThreshold ? product.stockThreshold : 0,
        stockStatus: "string",
        regionAvailability: product?.regionAvailability
          ? product.regionAvailability.split(",")
          : [],
        productStatus: product?.productStatus ? product.productStatus : "",
        visibility: product?.visibility === 1 || true ? "1" : "0",
        sellOutOfStock: product?.Sell_when_OOS === 1 || true ? true : false,
        minimumOrder: product?.minimumOrder ? product.minimumOrder : 0,
        tags: product?.tags ? product.tags.split(",") : [],
        countryOfOrigin: product?.countryOfOrigin
          ? product.countryOfOrigin
          : "",
        barcodes: "string",
        esgStatus: "string",
        healthRating: "string",
        catalogueId: localStorage.getItem("catalogueId"),
        cCatalogueId: localStorage.getItem("cCatalogueId"),
        organisationId: organisationId,
        isActive: true,
      };
    });
    return updatedProducts;
  } catch (error) {
    throw new Error(error);
  }
};

const calculateLucCost = (salePrice) => {
  const wet = parseInt(salePrice) * 0.29;
  const luc = parseInt(salePrice) + parseInt(wet);
  return luc;
};
