import React, { useState } from "react";
import { useFormik } from "formik";
import { AddCustomerSchema } from "../schemas";
import CustomerContact from "./CustomerContact";
import CustomerAddress from "./CustomerAddress";
import Alert from "@mui/material/Alert";
import CustomerDetailsFirst from "./CustomerDetailsFirst";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { stepOneSchema, stepTwoSchema, stepThreeSchema } from "../schemas";
import CloseIcon from "@mui/icons-material/Close";
import { message } from "antd";
import Toast from "../Toast";
export const options = [
  { value: "1", label: "Active" },
  { value: "0", label: "Inactive" },
  // { value: 3456, label: "Vanilla" },
];
const initialValues = {
  buyerId: "",
  businessName: "",
  abn: "",
  liquorLicence: "",
  salesRepId: "",
  pricingProfileId: "",
  defaultPaymentTerms: "",
  defaultPaymentMethodId: "",
  tags: "",
  organisationId: "",
  wetLiable: false,
  orderingFirstName: "",
  orderingLastName: "",
  orderingMobile: "",
  orderingEmail: "",
  deliveryFirstName: "",
  deliveryLastName: "",
  deliveryMobile: "",
  deliveryEmail: "",
  address: "",
  apartment: "",
  suburb: "",
  postalCode: "",
  state: "",
  deliveryNotes: "",
  billingAddress: "",
  billingApartment: "",
  billingSuburb: "",
  billingPostalCode: "",
  billingState: {},
  isActive: "",
};

function CustomerDetails() {
  const customerUrl = process.env.REACT_APP_CUSTOMER_URL;
  const validationSchemas = [stepOneSchema, stepTwoSchema, stepThreeSchema];
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const [isUpdate, setIsUpDate] = useState(false);
  const [isChecked, setIsChecked] = useState();
  const [isAddressChecked, setIsAddressChecked] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemas[activeStep],
    onSubmit: (values) => {},
  });

  const success = (message) => {
    messageApi.open({
      className: "custom-class",
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">{message}</p>
        </div>
      ),
      // content: message,
    });
  };

  const error = (message) => {
    messageApi.open({
      className: "custom-class",
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">{message}</p>
        </div>
      ),
    });
  };
  const handleSubmit = () => {
    const defaultPaymentTermsList = formik.values?.defaultPaymentTerms?.label;
    const defaultPaymentMethodIdList =
      formik.values?.defaultPaymentMethodId?.label;

    const organisationId = localStorage.getItem("organisationId");
    // e.preventDefault();
    fetch(`${customerUrl}/api/Customer/Create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(formik.values),
      body: JSON.stringify({
        buyerId: formik.values?.buyerId,
        businessName: formik.values?.businessName,
        abn: formik.values?.abn,
        liquorLicence: formik.values?.liquorLicence,
        salesRepId: "",
        pricingProfileId: "",
        defaultPaymentTerm: [defaultPaymentTermsList],
        defaultPaymentMethodId: [defaultPaymentMethodIdList],
        tags: [],
        wetLiable: true,
        organisationId: organisationId,
        orderingFirstName: formik.values?.orderingFirstName,
        orderingLastName: formik.values?.orderingLastName,
        orderingMobile: formik.values?.orderingMobile,
        orderingEmail: formik.values?.orderingEmail,
        deliveryFirstName: formik.values?.deliveryFirstName,
        deliveryLastName: formik.values?.deliveryLastName,
        deliveryMobile: formik.values?.deliveryMobile,
        deliveryEmail: formik.values?.deliveryEmail,
        address: formik.values?.address,
        apartment: formik.values?.apartment,
        suburb: formik.values?.suburb,
        postalCode: formik.values?.postalCode,
        state: formik.values?.state?.label,
        deliveryNotes: formik.values?.deliveryNotes,
        billingAddress: formik.values?.billingAddress,
        billingApartment: formik.values?.billingApartment,
        billingSuburb: formik.values?.billingSuburb,
        billingPostalCode: formik.values?.billingPostalCode,
        billingState: formik.values?.billingState.label,
        isActive: formik.values?.isActive?.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          success(data.message);
          navigate("/main/customers/all-customers");
        } else {
          error(data.message);
        }
        localStorage.setItem("customerAdded", true);
      })
      .catch((error) => console.log(error));
  };
  const handleCloseToast = () => {
    setOpenToast(false);
  };
  const onChangeText = () => {
    setIsUpDate(true);
  };
  const handleCancel = () => {
    setIsUpDate(false);
    formik.setValues({
      ...initialValues,
    });
  };
  const handleNext = () => {
    formik.validateForm().then((errors) => {
      if (activeStep !== 2 && Object.values(errors).length === 0) {
        setActiveStep((cur) => cur + 1);
      } else if (
        activeStep === 2 &&
        Object.values(errors).length === 0 &&
        Object.values(formik.values).some(
          (value) => value == !null || value == !""
        )
      ) {
        formik.submitForm();

        handleSubmit();
      }
    });
  };
  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((cur) => cur - 1);
      formik.setErrors({});
      formik.setValues(formik?.values);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="mx-auto lg:w-3/5 w-full pb-20 lg:px-20 px-10 custom-stepper ">
        {isUpdate && (
          <div className="2xl:mx-auto absolute z-50 top-0 right-0 left-0">
            <div className="bg-custom-extraDarkGreen shadow-lg py-1 px-7">
              <div className="block">
                <nav className="flex h-[65px] items-center justify-end gap-5 ">
                  <button
                    onClick={handleCancel}
                    className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                  >
                    Cancel
                  </button>
                  {/* <button
                    onClick={
                      formik.isValid &&
                      activeStep === 2 &&
                      formik.values !== null
                        ? handleSubmit
                        : undefined
                    }
                    disabled={
                      !formik.isValid &&
                      formik.values === null &&
                      activeStep !== 2
                    }
                    className={`rounded-md px-6 py-2.5 text-base font-medium ${
                      formik.isValid &&
                      activeStep === 2 &&
                      formik.values !== null
                        ? "bg-white text-light"
                        : "bg-black border text-white"
                    }`}
                  >
                    Save
                  </button> */}
                </nav>
              </div>
            </div>
          </div>
        )}
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => {
            setIsLastStep(value);
          }}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={handleNext}>
            <h5 className="text-xs text-white font-normal flex justify-center items-center">
              1
            </h5>

            <div className="absolute top-7 w-max text-center -left-84">
              <Typography
                color={
                  activeStep === 0
                    ? "text-custom-darkGreen"
                    : "text-custom-gray"
                }
                className="font-normal"
              >
                Customer details
              </Typography>
            </div>
          </Step>
          <Step onClick={handleNext}>
            <h5 className="text-xs text-white font-normal flex justify-center items-center">
              2
            </h5>
            <div className="absolute top-7 w-max text-center -left-84">
              <Typography
                color={
                  activeStep === 1
                    ? "text-custom-darkGreen"
                    : "text-custom-gray"
                }
                className="font-normal"
              >
                Customer contacts
              </Typography>
            </div>
          </Step>
          <Step onClick={handleNext}>
            <h5 className="text-xs text-white font-normal flex justify-center items-center">
              3
            </h5>
            <div className="absolute top-7 w-max text-center -left-84">
              <Typography
                color={
                  activeStep === 2
                    ? "text-custom-darkGreen"
                    : "text-custom-gray"
                }
                className="font-normal"
              >
                Customer addresses.
              </Typography>
            </div>
          </Step>
        </Stepper>
      </div>
      <form
        onChange={onChangeText}
        className=" mx-auto lg:w-3/5 w-full rounded-lg border border-inherit bg-white overflow-y-auto	flex flex-col"
      >
        {activeStep === 0 ? (
          <CustomerDetailsFirst
            touched={formik.touched}
            options={options}
            values={formik.values}
            setValues={formik.setValues}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            setIsUpDate={setIsUpDate}
          />
        ) : activeStep === 1 ? (
          <CustomerContact
            touched={formik.touched}
            options={options}
            values={formik.values}
            setValues={formik.setValues}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            setIsChecked={setIsChecked}
            isChecked={isChecked}
          />
        ) : activeStep === 2 ? (
          <CustomerAddress
            touched={formik.touched}
            options={options}
            values={formik.values}
            setValues={formik.setValues}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            setIsUpDate={setIsUpDate}
            setIsAddressChecked={setIsAddressChecked}
            isAddressChecked={isAddressChecked}
          />
        ) : null}
        <div className="px-6 pb-7 flex justify-between">
          {activeStep > 0 ? (
            <Button
              className="py-3.5 px-7 rounded-md	bg-custom-skyBlue	"
              onClick={handlePrev}
              disabled={isFirstStep}
            >
              Prev
            </Button>
          ) : (
            <div></div>
          )}
          {isLastStep ? (
            <Button
              className="py-3.5 px-7 rounded-md	bg-custom-skyBlue	"
              onClick={handleSubmit}
              // onClick={{ finalHandleSubmit(); handleNext(); }}
            >
              Submit
            </Button>
          ) : (
            <Button
              className="py-3.5 px-7 rounded-md	bg-custom-skyBlue	"
              onClick={handleNext}
              disabled={isLastStep}
            >
              Next
            </Button>
          )}
        </div>
      </form>
      <Toast
        open={openToast}
        onClose={handleCloseToast}
        message={toastMessage}
        severity={toastSeverity}
      />
    </>
  );
}

export default CustomerDetails;
