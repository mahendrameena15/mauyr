import * as Yup from "yup";

// customers-details Schema
export const AddCustomerSchema = Yup.object().shape({
  businessName: Yup.string()
    .max(50)
    .min(2, "Business name should have atleast 2 letters"),
  abn: Yup.string().min(2, "ABN should have atleast 2 letters").max(50),

  // liquorLicence: Yup.string()
  liquorLicence: Yup.string().max(
    13,
    "Liquor licence cannot be more than 13 characters"
  ),

  //customers-contact

  orderingFirstName: Yup.string()
    .min(2, "First name should have atleast 2 letters")
    .max(50)
    .required("First name is required"),
  orderingLastName: Yup.string()
    .min(2, "Last name should have atleast 2 letters")
    .max(50)
    .required("Last name is required"),

  deliveryFirstName: Yup.string()
    .min(2, "First name should have atleast 2 letters")
    .max(50)
    .required("First name is required"),
  deliveryLastName: Yup.string()
    .min(2, "Last name should have atleast 2 letters")
    .max(50)
    .required("Last name is required"),

  orderingEmail: Yup.string().email("Please enter a valid email"),

  orderingMobile: Yup.string()
    .required("Mobile Number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),

  deliveryEmail: Yup.string().email("Please enter a valid email"),

  deliveryMobile: Yup.string()
    .required("Mobile Number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),

  address: Yup.string()
    .min(2, "Address should have atleast 2 letters")
    .max(50)
    .required("Address is required"),

  // apartment: Yup.string()
  //   .min(2, "Apartment should have atleast 2 letters")
  //   .max(50)
  //   .required("Apartment is required"),

  suburb: Yup.string()
    .min(2, "suburb should have atleast 2 letters")
    .max(50)
    .required("suburb is required"),

  postalCode: Yup.string()
    .matches(/^\d{4}$/, "Invalid postcode")
    .required("postcode is required"),

  deliveryNotes: Yup.string()
    .min(2, "Delivery instructions should have atleast 5 letters")
    .max(50, "Delivery instructions must be at most 50 characters.")
    .required("Delivery instructions name is required"),
  state: Yup.mixed().required("State is required"),

  billingAddress: Yup.string()
    .min(2, "Address should have atleast 2 letters")
    .max(50)
    .required("Address is required"),

  // billingApartment: Yup.string()
  //   .min(2, "Address should have atleast 2 letters")
  //   .max(50)
  //   .required("Address is required"),

  billingSuburb: Yup.string()
    .min(2, "suburb should have atleast 2 letters")
    .max(50)
    .required("suburb  is required"),

  billingPostalCode: Yup.string()
    .matches(/^\d{4}$/, "Invalid postcode")
    .required("postcode is required"),
  billingState: Yup.mixed().required("Postcode is required"),
});

export const stepOneSchema = Yup.object().shape({
  businessName: Yup.string()
    .max(50)
    .min(2, "Business name should have atleast 2 letters")
    .required("Business name is required"),
  abn: Yup.string()
    .matches(/^[0-9]{9,11}$/, "ABN should be a number between 9 to 11 digits")
    .required("ABN is required"),

  isActive: Yup.mixed().required("Status is required"),

  defaultPaymentTerms: Yup.mixed().required("defaultPaymentTerms is required"),
  defaultPaymentMethodId: Yup.mixed().required(
    "defaultPaymentMethodId is required"
  ),
});

export const stepTwoSchema = Yup.object().shape({
  orderingFirstName: Yup.string()
    .min(2, "First name should have atleast 2 letters")
    .max(50)
    .required("First name is required"),
  orderingLastName: Yup.string()
    .min(2, "Last name should have atleast 2 letters")
    .max(50)
    .required("Last name is required"),

  deliveryFirstName: Yup.string()
    .min(2, "First name should have atleast 2 letters")
    .max(50)
    .required("First name is required"),
  deliveryLastName: Yup.string()
    .min(2, "Last name should have atleast 2 letters")
    .max(50)
    .required("Last name is required"),

  orderingEmail: Yup.string()
    .required("Email name is required")
    .email("Please enter a valid email"),

  orderingMobile: Yup.string()
    .required("Mobile name is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),

  deliveryEmail: Yup.string()
    .required("Email name is required")
    .email("Please enter a valid email"),

  deliveryMobile: Yup.string()
    .required("Mobile name is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),
});

export const stepThreeSchema = Yup.object().shape({
  address: Yup.string()
    .min(2, "Address should have atleast 2 letters")
    .max(50)
    .required("Address is required"),

  suburb: Yup.string()
    .min(2, "suburb should have atleast 2 letters")
    .max(50)
    .required("suburb is required"),

  postalCode: Yup.string()
    .matches(/^\d{4}$/, "Invalid postcode")
    .required("Postcode is required"),

  state: Yup.mixed().required("state is required"),
  billingState: Yup.mixed().required("billingState is required"),

  billingAddress: Yup.string()
    .min(2, "Address should have atleast 2 letters")
    .max(50)
    .required("Address is required"),

  billingSuburb: Yup.string()
    .min(2, "suburb should have atleast 2 letters")
    .max(50)
    .required("suburb  is required"),

  billingPostalCode: Yup.string()
    .matches(/^\d{4}$/, "Invalid postcode")
    .required("postcode is required"),
});
export const ViewCustomerDetails = Yup.object().shape({
  businessName: Yup.string()
    .min(2, "Business name should have atleast 2 letters")
    .max(50)
    .required("Business name is required"),
  abn: Yup.string()
    .matches(/^[0-9]{9,11}$/, "ABN should be a number between 9 to 11 digits")
    .required("ABN is required"),
  liquorLicence: Yup.string()
    .min(13, "Liquor licence cannot be more than 13 characters")
    .max(13, "Liquor licence cannot be more than 13 characters"),
});
