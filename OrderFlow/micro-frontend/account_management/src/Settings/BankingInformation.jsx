import React from "react";
import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
// import { BankingSchema } from "../../../supplier_order_management/src/schemas";
import { BankingSchema } from "../schemas";
import { getOrganisationDetails } from "../helpers/getOrganisationDetails";
import { postSetupBankingDetails } from "../helpers/postSetupBankinDetails";
import { Button, message } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { styled } from "@mui/material";
import BusinessDetails from "./BusinessDetails";
import RepresentativeInformation from "./RepresentativeInformation";
import BankingInfoForm from "./BankingInfoForm";
import CustomerBillingStatement from "./CustomerBillingStatement";
import BankingInfoFooter from "./BankingInfoFooter";
import { useMutation, useQuery } from "react-query";
import {
  getBankingInformation,
  postBankingInformations,
} from "../reactQuery/bankingInformationApiModule";
import { useStripe } from "@stripe/react-stripe-js";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const BankingInformation = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [show, setShow] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [businessType, setBusinessType] = useState([]);
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;

  const stripe = useStripe();

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#2B4447",
      color: "white",
      borderRadius: "5px",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
      fontSize: 11,
      lineHeight: "24px",
      fontFamily: "Inter",
      fontSize: "11px",
      fontWeight: 600,
    },
  }));

  const detilsUpdated = () => {
    messageApi.open({
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">
            Details updated!
          </p>
        </div>
      ),
      className: "custom-class",
      rtl: true,
    });
  };

  const errorUpdating = (message) => {
    messageApi.error({
      content: (
        <p className="text-base inline-block font-semibold text-[#F8FAFC]">
          {message}
        </p>
      ),
      className: "custom-class",
      rtl: true,
    });
  };

  const [initialValues, setInitialValues] = useState({
    businessType: "",
    legalBusinessName: "",
    acn: "",
    abn: "",
    businessAddress: "",
    businessPhoneNumber: "",
    businessDetailsSuburb: "",
    businessDetailsPostcode: "",
    businessDetailsState: "",
    businessDetailsCountry: "AU",
    businessWebsiteUrl: "",
    representativeInformationFirstName: "",
    representativeInformationLastName: "",
    representativeInformationDob: "",
    representativeInformationAddress: "",
    representativeInformationSuburb: "",
    representativeInformationPostcode: "",
    representativeInformationState: "",
    representativeInformationMobile: "",
    representativeInformationEmail: "",
    representativeInformationOwnership: "",
    bankingInformationBsb: "",
    bankingInformationAccountNumber: "",
    bankingInformationBankName: "",
    billingStatementDescriptor: "",
    billingStatementMobile: "",
    termsAndConditions: false,
    organisationId: localStorage.getItem("organisationId"),
  });

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
    isValid,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: BankingSchema,
    onSubmit: (values) => {
      postBankingInfo([values, stripe]);
    },
  });

  // Fetching bank information
  const asyncFunction = async () => {
    const data = await getBankingInformation();
    if (data) {
      let businessType = "";

      switch (data?.businessType) {
        case "individual":
          businessType = "Individual";
          break;

        case "company":
          if (data?.companyStructure === "sole_proprietorship") {
            businessType = "Sole Proprietorship";
          } else if (data?.companyStructure === "private_corporation") {
            businessType = "Private Company";
          } else if (data?.companyStructure === "public_corporation") {
            businessType = "Public Company";
          } else if (data?.companyStructure === "partnership") {
            // Assuming you have a partnership case
            businessType = "Partnership";
          }
          break;

        case "non_profit":
          businessType = "Nonprofit";
          break;

        default:
          businessType = "Unknown"; // It's a good practice to handle the default case
          break;
      }

      const body = {
        businessType: businessType,
        legalBusinessName: data?.legalBusinessName,
        acn: data?.acn,
        abn: data?.abn,
        businessAddress: data?.businessAddress,
        businessPhoneNumber: data?.businessPhoneNumber,
        businessDetailsSuburb: data?.businessDetailsSuburb,
        businessDetailsPostcode: data?.businessDetailsPostcode,
        businessDetailsState: data?.businessDetailsState,
        businessDetailsCountry: data?.businessDetailsCountry,
        businessWebsiteUrl: data?.businessWebsiteUrl,
        representativeInformationFirstName:
          data?.representativeInformationFirstName,
        representativeInformationLastName:
          data?.representativeInformationLastName,
        representativeInformationDob: convertDateString(
          data?.representativeInformationDob
        ),
        representativeInformationAddress:
          data?.representativeInformationAddress,
        representativeInformationSuburb: data?.representativeInformationSuburb,
        representativeInformationPostcode:
          data?.representativeInformationPostcode,
        representativeInformationState: data?.representativeInformationState,
        representativeInformationMobile: data?.representativeInformationMobile,
        representativeInformationEmail: data?.representativeInformationEmail,
        representativeInformationOwnership:
          data?.representativeInformationOwnership,
        bankingInformationBsb: data?.bankingInformationBsb,
        bankingInformationAccountNumber: data?.bankingInformationAccountNumber,
        bankingInformationBankName: data?.bankingInformationBankName,
        billingStatementDescriptor: data?.billingStatementDescriptor,
        billingStatementMobile: data?.billingStatementMobile,
        termsAndConditions: data?.termsAndConditions,
        organisationId: data?.organisationId,
      };

      setInitialValues((prev) => {
        return {
          ...prev,
          ...body,
        };
      });

      setValues((prev) => {
        return {
          ...prev,
          ...body,
        };
      });
    }
  };

  // Posting bank information
  const {
    mutate: postBankingInfo,
    isLoading: postBankingInformationsIsLoading,
  } = useMutation(postBankingInformations, {
    onSuccess: (dataGet) => {
      if (dataGet) {
        setValues((prev) => {
          return { ...prev, bankingInformationBankName: dataGet?.name };
        });
        detilsUpdated();
        setShow(false);
      } else {
        errorUpdating("Error occurred while updating, please try again!");
      }
    },
    onError: (err) => {
      errorUpdating(err);
    },
  });

  useEffect(() => {
    fetch(`${mastersUrl}/api/State`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setStateOptions(
          data.map((ele) => {
            return {
              value: ele.stateName,
              label: ele.stateName,
            };
          })
        );
      });

    fetch(`${mastersUrl}/api/BusinessType/options`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const businessTypeOptions = data.map((item) => ({
          value: item,
          label: item,
        }));
        setBusinessType(businessTypeOptions);
      });

    asyncFunction();
  }, []);

  const formChange = () => {
    setShow(true);
  };

  const handleReset = () => {
    setValues(initialValues);
    setShow(false);
  };

  return (
    <>
      {contextHolder}
      <div className="bank-information-page padding-top-custom">
        <div className="pb-6 px-6 flex justify-start items-center gap-2">
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/main/account-management/settings");
            }}
          >
            <img src="/assets/previousBtn.png" alt="" />
          </div>
          <h4 className="text-xl font-semibold text-[#2B4447]">
            Set up banking Information
          </h4>
        </div>
        <form onSubmit={handleSubmit} onChange={formChange}>
          {show && (
            <div className="2xl:mx-auto absolute z-50 top-0 right-0 left-0">
              <div className="bg-custom-extraDarkGreen shadow-lg py-1 px-7">
                <div className="block">
                  <nav className="flex h-[65px] items-center justify-end gap-5 ">
                    <button
                      onClick={handleReset}
                      className="rounded-md bg-white px-6 py-2.5 text-green text-base font-medium "
                    >
                      Cancel
                    </button>
                    {postBankingInformationsIsLoading ? (
                      <button
                        disabled={true}
                        type="submit"
                        className="rounded-md bg-white px-6 py-2.5 text-green text-base font-medium"
                      >
                        Save
                        <Spin
                          indicator={
                            <LoadingOutlined
                              style={{
                                marginLeft: 3,
                                fontSize: 15,
                              }}
                              spin
                            />
                          }
                        />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="rounded-md bg-white px-6 py-2.5 text-green text-base font-medium "
                      >
                        Save
                      </button>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          )}
          <div className="lg:flex flex-col gap-5 px-6 ">
            <div className="  w-full  gap-5 h-full	 grid">
              <BusinessDetails
                setShow={setShow}
                values={values}
                businessType={businessType}
                handleBlur={handleBlur}
                errors={errors}
                setValues={setValues}
                handleChange={handleChange}
                stateOptions={stateOptions}
                CustomTooltip={CustomTooltip}
                HelpIcon={HelpIcon}
                touched={touched}
              />
            </div>
            <div className="  w-full  gap-5 h-full	 grid	  ">
              <RepresentativeInformation
                setShow={setShow}
                setValues={setValues}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
                stateOptions={stateOptions}
              />
            </div>
            <div className="w-full  gap-5  overflow-y-auto	lg:flex">
              <BankingInfoForm
                setValues={setValues}
                formChange={formChange}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                touched={touched}
                errors={errors}
              />
              <CustomerBillingStatement
                formChange={formChange}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched}
              />
            </div>
          </div>
        </form>
        <BankingInfoFooter setValues={setValues} values={values} />
      </div>
    </>
  );
};

function convertDateString(inputDate) {
  // Parse the input date string
  var date = new Date(inputDate);

  // Format the date
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // months are zero-indexed
  var day = ("0" + date.getDate()).slice(-2);

  // Construct the formatted date string
  var formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export default BankingInformation;
