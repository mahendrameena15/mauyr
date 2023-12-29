import * as Yup from "yup";

export const addProductSchema = Yup.object().shape({
  status: Yup.mixed().required("Status is required"),
  visibility: Yup.boolean(),
  region: Yup.array()
    .required("Region is required")
    .min(1, "Region is required"),
  availableQty: Yup.string().required("Available quantity is required"),
  trackInventory: Yup.boolean(),
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must have at least 2 characters")
    .max(100, "Exceeded the characters limit"),
  skuCode: Yup.string()
    .required("SKU code is required")
    .min(4, "SKU code must have at least 4 characters"),
  brand: Yup.string()
    .required("Brand is required")
    .min(2, "Brand must have at least 2 characters"),
  department: Yup.object().required("Department is required"),
  category: Yup.object().required("Category is required"),
  segment: Yup.mixed(),
  grapeVariety: Yup.array(),
  regionSelect: Yup.mixed(),
  country: Yup.mixed().required("country is required"),
  baseUnitMeasure: Yup.mixed().required("Base unit measure is required"),
  innerUnitMeasure: Yup.mixed().required("Inner unit measure is required"),
  configuration: Yup.string(),
  description: Yup.string()
    .required("Please Enter Description")
    .max(1000, "Exceeded the characters limit")
    .min(2, "Description must have at least 2 characters"),
  // tags: Yup.array().required("tags is required"),
  salePrice: Yup.string().required("Sale price is required"),
  // buyPrice: Yup.string().required("Buy price is required"),
  profit: Yup.string(),
  margin: Yup.string(),
  tax: Yup.string(),
});

export const addProductSchemaWithSubcategory = Yup.object().shape({
  status: Yup.mixed().required("Status is required"),
  visibility: Yup.boolean(),
  region: Yup.array()
    .required("Region is required")
    .min(1, "Region is required"),
  availableQty: Yup.string().required("Available quantity is required"),
  trackInventory: Yup.boolean(),
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must have at least 2 characters")
    .max(100, "Exceeded the characters limit"),
  skuCode: Yup.string()
    .required("SKU code is required")
    .min(4, "SKU code must have at least 4 characters"),
  brand: Yup.string()
    .required("Brand is required")
    .min(2, "Brand must have at least 2 characters"),
  department: Yup.object().required("Department is required"),
  category: Yup.object().required("Category is required"),
  subcategory: Yup.object().required("Subcategory is required"),
  segment: Yup.mixed(),
  grapeVariety: Yup.array(),
  regionSelect: Yup.mixed(),
  country: Yup.mixed().required("country is required"),
  baseUnitMeasure: Yup.mixed().required("Base unit measure is required"),
  innerUnitMeasure: Yup.mixed().required("Inner unit measure is required"),
  configuration: Yup.string(),
  description: Yup.string()
    .required("Please Enter Description")
    .max(1000, "Exceeded the characters limit")
    .min(2, "Description must have at least 2 characters"),
  // tags: Yup.array().required("tags is required"),
  salePrice: Yup.string().required("Sale price is required"),
  // buyPrice: Yup.string().required("Buy price is required"),
  profit: Yup.string(),
  margin: Yup.string(),
  tax: Yup.string(),
});

export const bulkEditSchema = Yup.object().shape({
  status: Yup.mixed().required("Status is required"),
  visibility: Yup.mixed().required("Visibility is required"),
  availableQty: Yup.string().required("Available quantity is required"),
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must have at least 2 characters")
    .max(100, "Exceeded the characters limit")
    .required("Title is required"),
  skuCode: Yup.string()
    .required("SKU code is required")
    .min(4, "SKU code must have at least 4 characters")
    .required("SKU code is required"),
  baseUnitMeasure: Yup.mixed().required("Base unit measure is required"),
  innerUnitMeasure: Yup.mixed().required("Inner unit measure is required"),
  salePrice: Yup.string().required("Sale price is required"),
});
