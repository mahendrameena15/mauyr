import * as Yup from "yup";

//Reset Password Schema
export const ResetPasswordEmailSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email."),
});

export const ResetPasswordFormSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#{}()\[\]\\.\\/<>\^+_~-])[A-Za-z\d@$!%*?&^#{}()\[\]\\.\\/<>\^+_~-]{8,16}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and at least one special character"
    ),
  repeatPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf(
      [Yup.ref("password"), null],
      "Passwords do not match, please try again"
    ),
});

//Sign-up Schema
export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password is too long")
    .matches(
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]+$/,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#{}()\[\]\\.\\/<>\^+_~-])[A-Za-z\d@$!%*?&^#{}()\[\]\\.\\/<>\^+_~-]{8,16}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

// Registration Form Schema
export const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .max(50)
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .max(50)
    .required("Last name is required"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),
  businessName: Yup.string()
    .min(2, "Business name should have atleast 2 letters")
    .max(50)
    .required("Business name is required"),
});

// Sign-in Schema
export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#{}()\[\]\\.\\/<>\^+_~-])[A-Za-z\d@$!%*?&^#{}()\[\]\\.\\/<>\^+_~-]{8,16}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

// Personal Details Schema [User Profile]
export const PersonalDetailsSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name name is required")
    .min(2, "Your first name should have at least 2 letters")
    .max(50),
  lastName: Yup.string()
    .required("Last Name name is required")
    .min(2, "Your last name should have at least 2 letters")
    .max(50),
  email: Yup.string().email("Please enter a valid email"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),
  bio: Yup.string().max(255, "Bio cannot be more than 255 characters"), // Set max limit to 225 and error message
});

export const OrganisationSettingsSchema = Yup.object().shape({
  // Organization Details

  businessName: Yup.string()
    .min(2, "Your business name should have at least 2 letters")
    .max(50)
    .required("Business name is required"),
  abn: Yup.string()
    .matches(/^\d{11}$/, "Invalid ABN format")
    .required("ABN is required"),
  description: Yup.string()
    .max(255, "Bio cannot be more than 255 characters")
    .required("Description is required"),
  // Organization Address
  organisationAddress: Yup.string()
    .min(10, "Your address should have at least 10 letters")
    .required("Address is required")
    .max(100),
  organisationAddressSuburb: Yup.string()
    .min(2, "Suburb should have at least 2 letters")
    .required("Suburb is required")
    .max(50),
  organisationAddressPostcode: Yup.string()
    .matches(/^\d{4}$/, "Invalid postcode")
    .required("Postcode is required"),

  // Billing address
  billingAddress: Yup.string()
    .min(10, "Your address should have at least 10 letters")
    .max(100)
    .required("Address is required"),
  billingAddressSuburb: Yup.string()
    .min(2, "Suburb should have at least 2 letters")
    .max(50)
    .required("Suburb is required"),
  billingAddressPostcode: Yup.string()
    .matches(/^\d{4}$/, "Invalid postcode")
    .required("Postcode is required"),

  // Ordering contact
  orderingContactFirstName: Yup.string()
    .min(2, "Your first name should have at least 2 letters")
    .required("First name is required")
    .max(50),
  orderingContactLastName: Yup.string()
    .min(2, "Your last name should have at least 2 letters")
    .required("Last name is required")
    .max(50),
  orderingContactEmail: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  orderingContactMobile: Yup.string()
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    )
    .required("Mobile number is required"),

  // Logistics Contacts
  logisticsContactFirstName: Yup.string()
    .min(2, "Your first name should have at least 2 letters")
    .required("FirstName is required")
    .max(50),
  logisticsContactLastName: Yup.string()
    .min(2, "Your last name should have at least 2 letters")
    .required("LastName is required")
    .max(50),
  logisticsContactEmail: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  logisticsContactMobile: Yup.string()
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    )
    .required("Mobile number is required"),
});

export const BankingSchema = Yup.object().shape({
  businessType: Yup.mixed().required("Business type is required"),

  legalBusinessName: Yup.string()
    .min(2, "Your trading name should have at least 2 letters")
    .max(50)
    // .matches(/^[^\d]*$/, "business name should not contain numbers")
    .required("Business name is required"),

  acn: Yup.string()
    .matches(/^\d{9}$/, "Invalid ACN format")
    .required("ACN is required"),

  abn: Yup.string()
    .matches(/^\d{11}$/, "Invalid ABN format")
    .required("ABN is required"),

  businessAddress: Yup.string()
    .min(2, "Address should have at least 2 letters")
    .max(50)
    // .matches(/^[^\d]*$/, "Trading name should not contain numbers")
    .required("Address is required"),

  businessPhoneNumber: Yup.string()
    .required("Business mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Business mobile number must be a valid Australian mobile number"
    ),

  businessDetailsSuburb: Yup.string()
    .required("Suburb is required")
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),

  businessDetailsPostcode: Yup.string()
    .required("Postcode is required")
    .matches(/^\d{4}$/, "Invalid postcode"),

  businessDetailsState: Yup.mixed().required("State is required"),

  businessWebsiteUrl: Yup.string()
    .min(2, "Business website URL should have at least 2 letters")
    .max(50)
    // .matches(/^[^\d]*$/, "Trading name should not contain numbers")
    .required("Business website URL is required"),

  representativeInformationFirstName: Yup.string()
    .min(2, "Your first name should have atleast 2 letters")
    .max(50)
    .required("First name is required"),

  representativeInformationLastName: Yup.string()
    .min(2, "Your last name should have atleast 2 letters")
    .max(50)
    .required("Last name is required"),

  representativeInformationDob: Yup.mixed().required(
    "Date of Birth is required."
  ),

  representativeInformationAddress: Yup.string()
    .min(2, "Address should have at least 2 letters")
    .max(50)
    // .matches(/^[^\d]*$/, "Trading name should not contain numbers")
    .required("Address is required"),

  representativeInformationSuburb: Yup.string()
    .required("Suburb is required")
    .min(2, "Suburb should have atleast 2 letters")
    .max(50),

  representativeInformationPostcode: Yup.string()
    .required("Postcode is required")
    .matches(/^\d{4}$/, "Invalid postcode"),

  representativeInformationState: Yup.mixed().required("State is required"),

  representativeInformationMobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),

  representativeInformationEmail: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email."),

  bankingInformationBsb: Yup.string()
    .required("BSB Number is required")
    .matches(/^[0-9]{6}$/, "Mobile number must be a 6-digit number"),

  bankingInformationAccountNumber: Yup.string()
    .required("Account Number is required")
    .matches(
      /^[A-Za-z0-9]{9,16}$/,
      "Account number must be 16 characters containing numbers and letters"
    ),

  billingStatementDescriptor: Yup.string().required(
    "StatementDescriptor is required"
  ),

  billingStatementMobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-47-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Mobile number must be a valid Australian mobile number"
    ),
});
