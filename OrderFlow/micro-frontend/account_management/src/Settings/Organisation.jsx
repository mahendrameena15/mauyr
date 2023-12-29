import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ProfileHeader from "../dashboard/ProfileHeader";
import { OrganisationSettingsSchema } from "../schemas";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import Select from "react-select";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { message } from "antd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  updateLogoURI,
  resetLogoURI,
} from "../Redux/Action/organisationLogoSlice";
import { updateUserData } from "../Redux/Action/userSlice";
import { styled } from "@mui/material";
import { Avatar, List, Skeleton, Switch } from "antd";
import BaseUnit from "../modal/BaseUnit";
import InnerUnit from "../modal/InnerUnit";
import { baseUnitMeasureUnit } from "../helpers/getBaseUnitOfMeasureUnit";
import { getInnerUnitMeasureType } from "../helpers/getInnerUnitMeasureType";
import {
  getInnerUnitMeasureList,
  getbaseUnitMeasureList,
} from "../helpers/getUnitOfMeasures";
import { getBaseUnitMeasureType } from "../helpers/getBaseUnitOfMeasureType";
import { useQuery, useMutation } from "react-query";
import {
  getCategories,
  getDepartments,
} from "../reactQuery/organisationApiModule";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export const options = [
  { value: 1234, label: "Alcoholic Beverage" },
  { value: 2345, label: "Non-Alcoholic Beverage" },
];

let departmentList = [];

let categoryListVar = [];

function Organisation() {
  const organisationUrl = process.env.REACT_APP_ORGANISATION_URL;
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;

  const navigate = useNavigate();
  const [baseUnitModalOpen, setBaseUnitModalOpen] = useState(false);
  const [innerUnitModalOpen, setInnerUnitModalOpen] = useState(false);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  const [logoUri, setLogoUri] = useState("");
  const [initiaLogoUri, setInitiaLogoUri] = useState("");
  const fileInputRef = useRef();
  const [showError, setShowError] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [baseUnitMeasureTypeList, setBaseMeasureTypeList] = useState([]);
  const [baseUnitMeasureUnitList, setBaseMeasureUnitList] = useState([]);
  const [innerUnitMeasure, setInnerUnitMeasure] = useState([]);
  const [baseUnitMeasure, setBaseUnitMeasure] = useState([]);
  const [innerUnitTypeList, setInnerUnitTypeList] = useState([]);
  const [state, setState] = useState([]);
  const authUrl = process.env.REACT_APP_AUTH_URL;
  const [initialValues, setInitialValues] = useState({
    tradingName: "",
    businessName: "",
    abn: "",
    liquorLicence: "",
    organisationAddress: "",
    organisationAddressApartment: "",
    organisationAddressSuburb: "",
    organisationAddressPostcode: "",
    billingAddress: "",
    billingAddressApartment: "",
    billingAddressSuburb: "",
    billingAddressPostcode: "",
    billingAddressState: "",
    orderingContactFirstName: "",
    orderingContactLastName: "",
    orderingContactEmail: "",
    orderingContactMobile: "",
    logisticsContactFirstName: "",
    logisticsContactLastName: "",
    logisticsContactEmail: "",
    logisticsContactMobile: "",

    description: "",
    state: "",
    postcode: "",
    categoryList: [],
    departments: [],
  });

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: OrganisationSettingsSchema,
    onSubmit: (values) => {
      saveDetails();
      if (!localStorage.getItem("organisationId")) {
        fetch(`${organisationUrl}/api/Organization/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tradingName: values.tradingName,
            businessName: values.businessName,
            liquorLicense: values.liquorLicence,
            abn: values.abn,
            categories: "",
            organisationlogo: logoUri,
            description: values?.description,
            orderingContactFirstName: values.orderingContactFirstName,
            orderingContactLastName: values.orderingContactLastName,
            orderingContactMobile: values.orderingContactMobile,
            orderingContactEmail: values.orderingContactEmail,
            logisticsContactFirstName: values.logisticsContactFirstName,
            logisticsContactLastName: values.logisticsContactLastName,
            logisticsContactMobile: values.logisticsContactMobile,
            logisticsContactEmail: values.logisticsContactEmail,
            organisationAddress: values.organisationAddress,
            apartment: values.organisationAddress,
            city: "",
            state: values.state,
            suburb: values.organisationAddressSuburb,
            postcode: values.organisationAddressPostcode,
            country: "",
            billingAddress: values.billingAddress,
            billingAddressApartment: values.billingAddressApartment,
            billingAddressSuburb: values.billingAddressSuburb,
            billingAddressPostCode: values.billingAddressPostcode,
            billingAddressState: values.billingAddressState,
            categoryList: values.categoryList?.map((obj) => {
              return `${obj.value}`;
            }),
            departmentList: values.departments?.map((obj) => {
              return `${obj.value}`;
            }),
            isActive: true,
            catalogueName: "string",
            noofProducts: "string",
            catalogueStatus: "string",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              const organisationID = data.data.organisationID;
              localStorage.setItem("organisationId", organisationID);
              const id = localStorage.getItem("ccrn");
              fetch(`${authUrl}/api/User/update?ccrn=${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  password: user.password,
                  status: true,
                  role: user.role,
                  meta: user.meta,
                  adId: user.adId,
                  imageUrl: user.imageUrl,
                  bio: user.bio,
                  mobile: user.mobile,
                  organisationId: organisationID,
                  isActive: true,
                }),
              })
                .then((response) => response.json())
                .then((data) => {});

              const organisationSettings = data.data;
              setShow(false);
            }
          })
          .catch((error) => console.log(error));
      } else {
        const orgId = localStorage.getItem("organisationId");
        fetch(`${organisationUrl}/api/Organization/update?id=${orgId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tradingName: values.tradingName,
            businessName: values.businessName,
            liquorLicense: values.liquorLicence,
            abn: values.abn,
            categories: "",
            organisationlogo: logoUri ? logoUri : "",
            description: values.description,
            orderingContactFirstName: values.orderingContactFirstName,
            orderingContactLastName: values.orderingContactLastName,
            orderingContactMobile: values.orderingContactMobile,
            orderingContactEmail: values.orderingContactEmail,
            logisticsContactFirstName: values.logisticsContactFirstName,
            logisticsContactLastName: values.logisticsContactLastName,
            logisticsContactMobile: values.logisticsContactMobile,
            logisticsContactEmail: values.logisticsContactEmail,
            organisationAddress: values.organisationAddress,
            apartment: values.organisationAddressApartment,
            city: "",
            state: values.state?.label,
            postcode: values.organisationAddressPostcode,
            country: "",
            suburb: values.organisationAddressSuburb,
            billingAddress: values.billingAddress,
            billingAddressApartment: values.billingAddressApartment,
            billingAddressSuburb: values.billingAddressSuburb,
            billingAddressPostCode: values.billingAddressPostcode,
            billingAddressState: values.billingAddressState?.label,
            departmentList: values.departments?.map((obj) => {
              return `${obj.value}`;
            }),
            categoryList: values.categoryList?.map((obj) => {
              return `${obj.value}`;
            }),
            isActive: true,
            catalogueName: "string",
            noofProducts: "string",
            catalogueStatus: "string",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setShow(false);
            }
          })
          .catch((error) => console.log(error));
      }
    },
  });

  useQuery("getDepartments", getDepartments, {
    onSuccess: (data) => {
      departmentList = data.map((item) => {
        return {
          label: item.departmentName,
          value: item.departmentId,
        };
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: mutateCategories } = useMutation(getCategories, {
    onSuccess: (data) => {
      const catList = data.map((item, index) => {
        return {
          key: index,
          value: item.categoryId,
          label: item.categoryName,
        };
      });
      setCategories([...catList]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleStateChange = (e, name) => {
    setShow(true);
    setValues((prev) => {
      return {
        ...prev,
        [name]: e,
      };
    });
  };

  useEffect(() => {
    const orgId = localStorage.getItem("organisationId");
    let states = [];

    fetch(`${mastersUrl}/api/State`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        states = data.map((i) => {
          return {
            key: i,
            value: i?.stateId,
            label: i?.stateName,
          };
        });

        setState(states);
      });

    if (orgId) {
      fetch(`${mastersUrl}/api/Category/get`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const catList = data.data.map((item, index) => {
              return {
                key: index,
                value: item.categoryId,
                label: item.categoryName,
              };
            });

            categoryListVar = [...catList];
          }
        })
        .then(() => {
          fetch(
            `${organisationUrl}/api/Organization/get?organizationId=${orgId}`,
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.success && data.data.length === 1) {
                const organisationSettings = data.data[0];
                dispatch(
                  updateUserData({
                    ...user,
                    organisationId: organisationSettings.organisationID,
                  })
                );
                const categoryList = organisationSettings?.categoryList?.map(
                  (id) => {
                    return categoryListVar.find((obj) => obj.value === id);
                  }
                );

                const departmentListData =
                  organisationSettings?.departmentList?.map((id) => {
                    return departmentList?.find((obj) => obj?.value === id);
                  });

                const departmentNames = departmentListData?.map(
                  (item) => item?.label
                );

                mutateCategories(
                  departmentListData?.length > 0 ? departmentNames : null
                );

                const state = states?.find(
                  (item) => item.label === organisationSettings?.state
                );
                const billingState = states?.find(
                  (item) =>
                    item.label === organisationSettings?.billingAddressState
                );

                const body = {
                  tradingName: organisationSettings?.tradingName || "",
                  businessName: organisationSettings?.businessName || "",
                  abn: organisationSettings?.abn || "",
                  liquorLicence: organisationSettings?.liquorLicense || "",
                  organisationAddress:
                    organisationSettings?.organisationAddress || "",
                  organisationAddressApartment:
                    organisationSettings?.apartment || "",
                  organisationAddressSuburb: organisationSettings?.suburb || "",
                  organisationAddressPostcode:
                    organisationSettings?.postcode || "",
                  billingAddress: organisationSettings?.billingAddress || "",
                  billingAddressApartment:
                    organisationSettings?.billingAddressApartment || "",
                  billingAddressSuburb:
                    organisationSettings?.billingAddressSuburb || "",
                  billingAddressPostcode:
                    organisationSettings?.billingAddressPostCode || "",
                  billingAddressState: billingState,
                  orderingContactFirstName:
                    organisationSettings?.orderingContactFirstName || "",
                  orderingContactLastName:
                    organisationSettings?.orderingContactLastName || "",
                  orderingContactEmail:
                    organisationSettings?.orderingContactEmail || "",
                  orderingContactMobile:
                    organisationSettings?.orderingContactMobile || "",
                  logisticsContactFirstName:
                    organisationSettings?.logisticsContactFirstName || "",
                  logisticsContactLastName:
                    organisationSettings?.logisticsContactLastName || "",
                  logisticsContactEmail:
                    organisationSettings?.logisticsContactEmail || "",
                  logisticsContactMobile:
                    organisationSettings?.logisticsContactMobile || "",
                  description: organisationSettings?.description || "",
                  state: state || "",
                  postcode: organisationSettings.postcode || "",
                  categoryList: categoryList || "",
                  departments: departmentListData || "",
                };

                setInitialValues(body);
                setValues(body);
                setLoading(false);
                setLogoUri(organisationSettings.organisationlogo);
                setInitiaLogoUri(organisationSettings.organisationlogo);
              }
            });
        })
        .catch((error) => console.log(error));
    } else {
      setLoading(false);
    }

    asyncFunction();
  }, []);

  const asyncFunction = async () => {
    const innerUnitMeasureResponse = await getInnerUnitMeasureList();
    setInnerUnitMeasure(innerUnitMeasureResponse);

    const baseUnitMeasureResponse = await getbaseUnitMeasureList();
    setBaseUnitMeasure(baseUnitMeasureResponse);

    const baseUnitMeasureTypeResponse = await getBaseUnitMeasureType();
    setBaseMeasureTypeList(
      baseUnitMeasureTypeResponse?.map((item, index) => {
        return {
          key: index,
          label: item?.type,
          value: item?.type,
        };
      })
    );

    const baseUnitMeasureUnitResponse = await baseUnitMeasureUnit();
    setBaseMeasureUnitList(
      baseUnitMeasureUnitResponse?.map((item, index) => {
        return {
          key: index,
          label: item?.value,
          value: item?.value,
        };
      })
    );

    const innerUnitMeasureTypeResponse = await getInnerUnitMeasureType();
    setInnerUnitTypeList(
      innerUnitMeasureTypeResponse?.map((item, index) => {
        return {
          key: index,
          label: item?.type,
          value: item?.type,
        };
      })
    );
  };
  const [messageApi, contextHolder] = message.useMessage();
  // Category List
  const handleCategoriesChange = (e) => {
    setValues({
      ...values,

      categoryList: [...e],
    });
  };

  const handleDepartmentChange = (e) => {
    const departmentNames = e?.length > 0 ? e.map((item) => item?.label) : [];
    mutateCategories(e?.length > 0 ? departmentNames : null);
    setValues((prev) => {
      return {
        ...prev,
        departments: [...e],
      };
    });
  };

  // Check Box --- Same as Organisation Address
  const handleCheckbox = (e) => {
    setCheck(e.target.checked);
    if (e.target.checked) {
      setValues({
        ...values,
        billingAddress: values?.organisationAddress,
        billingAddressApartment: values?.organisationAddressApartment,
        billingAddressSuburb: values?.organisationAddressSuburb,
        billingAddressPostcode: values?.organisationAddressPostcode,
        billingAddressState: values?.state,
      });
    }
  };

  // Upload Image
  const [file, setFile] = useState([]);
  const defaultImage = "assets/update-user.png";

  const handleDelete = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile("");

    setLogoUri("");
    setValues({
      ...values,
      organisationlogo: "",
    });
    setShow(true);
    dispatch(updateLogoURI(""));
  };

  const handleUpdate = () => {
    open();
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const fileNameParts = file.name.split(".");
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();

      const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

      if (allowedExtensions.includes(fileExtension)) {
        setShowError(false);
        const reader = new FileReader();
        const formData = new FormData();
        formData.append("file", file);

        reader.onload = () => {
          const imgData = reader.result;
          setLogoUri(imgData);
          dispatch(updateLogoURI(imgData));
          setShow(false);
        };
        reader.readAsDataURL(file);

        const orgId = localStorage.getItem("organisationId");
        fetch(
          `${organisationUrl}/api/Organization/UploadOrganizationImage?organisationID=${orgId}`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (!data.error) {
              setShow(true);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        setShowError(true);
        fileInputRef.current.value = "";
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
  });

  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };

  const handleReset = () => {
    setShow(false);
    setValues(initialValues);
    setLogoUri(initiaLogoUri);
    dispatch(updateLogoURI(initiaLogoUri));
  };

  const handleFormChange = () => {
    setShow(true);
  };

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
  const saveDetails = () => {
    messageApi.open({
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">
            Details saved!
          </p>
        </div>
      ),
      className: "custom-class",
      rtl: true,
    });
  };

  return (
    <>
      {contextHolder}
      <div>
        {show && (
          <div className=" 2xl:mx-auto absolute z-50 top-0 right-0 left-0">
            <div className="bg-custom-extraDarkGreen shadow-lg py-1 px-7">
              <div className="block">
                <nav className="flex h-[65px] items-center justify-end gap-5 ">
                  <button
                    onClick={handleReset}
                    className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                  >
                    Save
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
        <form onChange={handleFormChange}>
          <div className="profile-section  sm:px-11 px-5 padding-top-custom overflow-y-auto scroll-smooth	scrollable	">
            <div className="sm:py-12 py-8 flex justify-start items-start gap-2">
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigate("/main/account-management/settings");
                }}
              >
                <img src="/assets/previousBtn.png" alt="#" />
              </div>
              <div className="">
                <h4 className="text-green text-2xl	font-semibold pb-1  leading-[26px]">
                  Organisation settings
                </h4>
                <p className="text-gray font-medium	 text-sm	">
                  Keep your organisation details up to date
                </p>
              </div>
            </div>
            <div className="lg:flex gap-5 ">
              <div className=" lg:w-3/5 w-full  gap-5 h-full	 grid	  ">
                <div className="   w-full  rounded-lg		 border border-inherit bg-white h-fit		 	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Organisation details
                    </h6>
                  </div>
                  <Skeleton
                    style={{ padding: "10px" }}
                    loading={loading}
                    active
                    avatar
                  >
                    <div className="px-6 py-7">
                      <div className="w-full ">
                        <div className="flex flex-wrap -mx-3 mb-5">
                          <div className="w-full md:w-1/2 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                              htmlFor="grid-last-name"
                            >
                              Trading name
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-last-name"
                              name="tradingName"
                              type="text"
                              placeholder="Enter Trading name"
                              value={values.tradingName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.tradingName &&
                                  touched.tradingName &&
                                  "1px solid red",
                              }}
                            />
                            {errors.tradingName && touched.tradingName && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                {errors.tradingName}
                              </p>
                            )}
                            {errors.tradingName && touched.tradingName && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                            )}
                          </div>
                          <div className="w-full md:w-1/2 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm font-medium	 "
                              htmlFor="grid-last-name"
                            >
                              Business name
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-last-name"
                              type="text"
                              placeholder="Enter Business name"
                              name="businessName"
                              value={values.businessName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.businessName &&
                                  touched.businessName &&
                                  "1px solid red",
                              }}
                            />
                            {errors.businessName && touched.businessName && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                {errors.businessName}
                              </p>
                            )}
                            {errors.businessName && touched.businessName && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-5 relative">
                          <div className="w-full md:w-1/2 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm  font-medium   "
                              htmlFor="grid-password"
                            >
                              ABN
                            </label>

                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md   py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-password"
                              type="text"
                              placeholder="Enter ABN"
                              name="abn"
                              value={values.abn}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.abn && touched.abn && "1px solid red",
                              }}
                            />

                            {errors.abn && touched.abn && (
                              <p className="mt-2 mb-2 text-red-500 text-xs  font-normal">
                                {errors.abn}
                              </p>
                            )}

                            {errors.abn && touched.abn && (
                              <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                            )}
                          </div>
                          <div className="w-full md:w-1/2 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm  font-medium   "
                              htmlFor="grid-password"
                            >
                              Liquor licence
                            </label>

                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md   py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-password"
                              type="text"
                              placeholder="Enter Liquor licence"
                              name="liquorLicence"
                              value={values.liquorLicence}
                              onChange={handleChange}
                              maxLength={14}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-5 relative">
                          <div className="w-full px-3">
                            <label
                              htmlFor="description"
                              className="block mb-2 text-sm	 font-medium text-gray-700 dark:text-white"
                            >
                              Description
                            </label>
                            <textarea
                              id="description"
                              rows={4}
                              name="description"
                              onChange={handleChange}
                              value={values.description}
                              className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                              placeholder="Leave a comment..."
                              maxLength={256}
                              style={{
                                border:
                                  errors.description &&
                                  touched.description &&
                                  "1px solid red",
                              }}
                            />
                            {errors.description && touched.description && (
                              <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                {errors.description}
                              </p>
                            )}
                          </div>
                          <div className="w-full mt-5 px-3">
                            <label
                              className="block mb-2 text-sm	 font-medium text-gray-700 dark:text-white"
                              htmlFor="departments"
                            >
                              Departments
                            </label>
                            <div className="w-full">
                              <Select
                                id="departments"
                                name="departments"
                                isMulti
                                onChange={(val) => {
                                  handleFormChange();
                                  handleDepartmentChange(val);
                                }}
                                value={values.departments}
                                isDisabled={!departmentList.length}
                                options={departmentList}
                                className="basic-multi-select "
                                classNamePrefix="select"
                                closeMenuOnSelect={false}
                              />
                            </div>
                          </div>
                          <div className="w-full mt-5 px-3">
                            <label
                              className="block mb-2 text-sm	 font-medium text-gray-700 dark:text-white"
                              htmlFor="CategoryList"
                            >
                              Categories
                            </label>
                            <div className="w-full">
                              <Select
                                id="CategoryList"
                                name="categoryList"
                                closeMenuOnSelect={false}
                                isMulti
                                value={values?.categoryList}
                                onChange={(val) => {
                                  handleFormChange();
                                  handleCategoriesChange(val);
                                }}
                                isDisabled={
                                  values?.categoryList.length === 0 &&
                                  categories.length === 0
                                }
                                options={categories}
                                className="basic-multi-select "
                                classNamePrefix="select"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-5 relative">
                          <div className="w-full md:w-1/2 px-3 relative">
                            <table className="w-full">
                              <tr className="flex items-center justify-between mb-4">
                                <th className="font-medium text-gray-700">
                                  Base unit of measure
                                </th>
                                <th>
                                  <button
                                    className="rounded-lg bg-[#147D73] text-white p-[5px] font-medium text-sm"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setBaseUnitModalOpen(true);
                                    }}
                                  >
                                    Add/Edit
                                  </button>
                                </th>
                              </tr>
                              <div className="min-h-[0px] max-h-[170px] overflow-y-auto custom-scroll-bar">
                                {baseUnitMeasure.map((item, index) => {
                                  return (
                                    <tr className="p-2 border-b" key={index}>
                                      <td className="font-normal px-2 py-4">
                                        {`${item.unit} ${item.type}`}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </div>
                            </table>
                          </div>
                          <div className="w-full md:w-1/2 px-3 relative">
                            <table className="w-full">
                              <tr className="flex items-center justify-between mb-4">
                                <th className="font-medium text-gray-700">
                                  Inner unit of measure
                                </th>
                                <th>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault(e);
                                      setInnerUnitModalOpen(true);
                                    }}
                                    className="rounded-lg bg-[#147D73] text-white p-[5px] font-medium text-sm"
                                  >
                                    Add/Edit
                                  </button>
                                </th>
                              </tr>
                              <div className="min-h-[0px] max-h-[170px] overflow-y-auto custom-scroll-bar">
                                {innerUnitMeasure.map((item, index) => {
                                  return (
                                    <tr className="border-b" key={index}>
                                      <td className="font-normal px-2 py-4">
                                        {`${item.unit} ${item.type}`}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </div>
                            </table>
                          </div>
                        </div>
                        <div className="flex justify-"></div>
                      </div>
                    </div>
                  </Skeleton>
                </div>
                {/* Organization Details ---END */}

                {/* Organization Address ---START  */}
                <div className="   w-full  rounded-lg		 border border-inherit bg-white h-fit		 	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Organisation address
                    </h6>
                  </div>
                  <Skeleton
                    style={{ padding: "10px" }}
                    loading={loading}
                    active
                    avatar
                  >
                    <div className="px-6 py-7">
                      <div className="w-full ">
                        <div className="flex flex-wrap -mx-3 mb-5 items-start">
                          <div className="w-full md:w-1/2 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                              htmlFor="organisationAddress"
                            >
                              Address
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="organisationAddress"
                              type="text"
                              placeholder="Enter Address"
                              name="organisationAddress"
                              value={values.organisationAddress}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.organisationAddress &&
                                  touched.organisationAddress &&
                                  "1px solid red",
                              }}
                            />
                            {errors.organisationAddress &&
                              touched.organisationAddress && (
                                <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                                  {errors.organisationAddress}
                                </p>
                              )}
                            {errors.organisationAddress &&
                              touched.organisationAddress && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                              )}
                          </div>
                          <div className="w-full md:w-1/2 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                              htmlFor="organisationAddressApartment"
                            >
                              Apartment, floor etc. (optional)
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="organisationAddressApartment"
                              type="text"
                              placeholder="Apartment, floor etc. (optional)"
                              name="organisationAddressApartment"
                              value={values.organisationAddressApartment}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.organisationAddressApartment &&
                                  touched.organisationAddressApartment &&
                                  "1px solid red",
                              }}
                            />
                            {errors.organisationAddressApartment &&
                              touched.organisationAddressApartment && (
                                <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                  {errors.organisationAddressApartment}
                                </p>
                              )}
                            {errors.organisationAddressApartment &&
                              touched.organisationAddressApartment && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                              )}
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-5 items-start">
                          <div className="w-full md:w-1/3	 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                              htmlFor="organisationAddressSuburb"
                            >
                              Suburb
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="organisationAddressSuburb"
                              type="text"
                              placeholder="Enter Suburb"
                              name="organisationAddressSuburb"
                              value={values.organisationAddressSuburb}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.organisationAddressSuburb &&
                                  touched.organisationAddressSuburb &&
                                  "1px solid red",
                              }}
                            />
                            {errors.organisationAddressSuburb &&
                              touched.organisationAddressSuburb && (
                                <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                  {errors.organisationAddressSuburb}
                                </p>
                              )}
                            {errors.organisationAddressSuburb &&
                              touched.organisationAddressSuburb && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[31px] right-5 transition-all duration-[0.3s]" />
                              )}
                          </div>
                          <div className="w-full md:w-1/3	 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                              htmlFor="organisationAddressPostcode"
                            >
                              Postcode
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="organisationAddressPostcode"
                              type="text"
                              placeholder="Enter Postcode"
                              name="organisationAddressPostcode"
                              value={values.organisationAddressPostcode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.organisationAddressPostcode &&
                                  touched.organisationAddressPostcode &&
                                  "1px solid red",
                              }}
                            />
                            {errors.organisationAddressPostcode &&
                              touched.organisationAddressPostcode && (
                                <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                  {errors.organisationAddressPostcode}
                                </p>
                              )}
                            {errors.organisationAddressPostcode &&
                              touched.organisationAddressPostcode && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                              )}
                          </div>
                          <div className="w-full md:w-1/3	 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm	 font-medium	 "
                              htmlFor="state"
                            >
                              State
                            </label>
                            <div className="relative">
                              <Select
                                name="state"
                                value={values.state}
                                onChange={(e) => handleStateChange(e, "state")}
                                options={state}
                                className="appearance-none block w-full  text-gray-700 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                classNamePrefix="basic-multi-select "
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Skeleton>
                </div>
                {/* Organization Address ---END  */}

                {/* Billing Address ---START */}

                <div className="   w-full  rounded-lg		 border border-inherit bg-white h-fit		 	  ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Billing address
                    </h6>
                  </div>
                  <Skeleton
                    style={{ padding: "10px" }}
                    loading={loading}
                    active
                    avatar
                  >
                    <div className="px-6 py-7">
                      <div className="w-full">
                        {values.state &&
                          values.organisationAddressPostcode &&
                          values.organisationAddressApartment &&
                          values.organisationAddress &&
                          values.organisationAddressSuburb && (
                            <div className="flex items-center mb-5 green-checkbox">
                              <input
                                onChange={handleCheckbox}
                                id="same-address"
                                type="checkbox"
                                name="checkbox"
                                checked={check}
                                defaultValue=""
                                className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="same-address"
                                className="ml-2 sm:text-base text-sm		 font-normal	 text-green dark:text-gray-300"
                              >
                                Use same address as Organisation for Billing{" "}
                              </label>
                            </div>
                          )}
                        <div className="flex flex-wrap -mx-3 mb-5 items-start">
                          <div className="w-full md:w-1/2 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                              htmlFor="billingAddress"
                            >
                              Address
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="billingAddress"
                              type="text"
                              placeholder="Enter Address"
                              name="billingAddress"
                              value={values.billingAddress}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.billingAddress &&
                                  touched.billingAddress &&
                                  "1px solid red",
                              }}
                            />
                            {errors.billingAddress &&
                              touched.billingAddress && (
                                <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                                  {errors.billingAddress}
                                </p>
                              )}
                            {errors.billingAddress &&
                              touched.billingAddress && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                              )}
                          </div>
                          <div className="w-full md:w-1/2 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                              htmlFor="billingAddressApartment"
                            >
                              Apartment, floor etc. (optional)
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="billingAddressApartment"
                              type="text"
                              placeholder="Apartment, floor etc. (optional)"
                              name="billingAddressApartment"
                              value={values.billingAddressApartment}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.billingAddressApartment &&
                                  touched.billingAddressApartment &&
                                  "1px solid red",
                              }}
                            />
                            {errors.billingAddressApartment &&
                              touched.billingAddressApartment && (
                                <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                  {errors.billingAddressApartment}
                                </p>
                              )}
                            {errors.billingAddressApartment &&
                              touched.billingAddressApartment && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                              )}
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-5 items-start">
                          <div className="w-full md:w-1/3	 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                              htmlFor="billingAddressSuburb"
                            >
                              Suburb
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="billingAddressSuburb"
                              type="text"
                              placeholder="Enter Suburb"
                              name="billingAddressSuburb"
                              value={values.billingAddressSuburb}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.billingAddressSuburb &&
                                  touched.billingAddressSuburb &&
                                  "1px solid red",
                              }}
                            />
                            {errors.billingAddressSuburb &&
                              touched.billingAddressSuburb && (
                                <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                  {errors.billingAddressSuburb}
                                </p>
                              )}
                            {errors.billingAddressSuburb &&
                              touched.billingAddressSuburb && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                              )}
                          </div>
                          <div className="w-full md:w-1/3	 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                              htmlFor="billingAddressPostcode"
                            >
                              Postcode
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="billingAddressPostcode"
                              type="text"
                              placeholder="Enter Postcode"
                              name="billingAddressPostcode"
                              value={values.billingAddressPostcode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.billingAddressPostcode &&
                                  touched.billingAddressPostcode &&
                                  "1px solid red",
                              }}
                            />
                            {errors.billingAddressPostcode &&
                              touched.billingAddressPostcode && (
                                <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                  {errors.billingAddressPostcode}
                                </p>
                              )}
                            {errors.billingAddressPostcode &&
                              touched.billingAddressPostcode && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[41px] right-5 transition-all duration-[0.3s]" />
                              )}
                          </div>
                          <div className="w-full md:w-1/3	 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-sm		 font-medium	 "
                              htmlFor="billingAddressState"
                            >
                              State
                            </label>
                            <div className="relative">
                              <Select
                                name="billingAddressState"
                                value={values.billingAddressState}
                                onChange={(e) =>
                                  handleStateChange(e, "billingAddressState")
                                }
                                options={state}
                                className="appearance-none block w-full  text-gray-700 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                classNamePrefix="basic-multi-select "
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Skeleton>
                </div>

                {/* Billing Address ---END */}
              </div>
              <div className="w-full lg:w-2/5 gap-5 h-full	">
                {/* Organization Logo ---START */}
                <div className="w-full rounded-md border border-inherit bg-white h-full mt-[1rem] sm:mt-0 md:mt-0 lg:mt-0">
                  <div className="border-b border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base font-medium text-green">
                      Organisation logo
                    </h6>
                  </div>
                  <Skeleton
                    style={{ padding: "10px" }}
                    loading={loading}
                    active
                    avatar
                  >
                    <div className="px-6 py-7">
                      <div className="flex justify-start gap-3 items-center">
                        <div className="update-user rounded-full">
                          {logoUri ? (
                            <img
                              id="previewImage"
                              src={logoUri || defaultImage}
                              alt=""
                              className="w-[187px]	h-[58px]	object-contain"
                            />
                          ) : (
                            <AccountCircleIcon
                              style={{
                                height: "3.5rem",
                                width: "3.5rem",
                                fill: "#BABABA",
                              }}
                            />
                          )}
                        </div>
                        <div className="">
                          <h6 className="font-normal text-base text-green">
                            Edit your logo
                          </h6>
                          <div className=" pt-1 flex justify-start gap-2">
                            <p
                              onClick={handleDelete}
                              className="text-gray font-normal cursor-pointer text-sm"
                            >
                              Delete
                            </p>
                            <p
                              onClick={handleUpdate}
                              className="text-sm font-normal cursor-pointer text-lime-600"
                            >
                              Update
                            </p>
                          </div>
                        </div>
                      </div>
                      {showError && (
                        <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                          Invalid file format. Please upload an image (jpg,
                          jpeg, png, or gif).
                        </p>
                      )}
                      <div
                        {...getRootProps()}
                        className="border-darkGreen border border-dashed	flex justify-center items-center rounded-md	h-44 w-full mt-4"
                      >
                        <div className="text-center ">
                          <div className="download-icon relative mb-3 mx-auto border rounded-full border-inherit bg-white flex justify-center items-center w-10	h-10">
                            <input
                              {...getInputProps()}
                              type="file"
                              accept="image/*"
                              ref={fileInputRef}
                              className="download-file w-full h-full rounded-full absolute opacity-0	"
                              // value={imageSrc}
                            />
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.99992 9.33325C2.36811 9.33325 2.66659 9.63173 2.66659 9.99992V12.6666C2.66659 12.8434 2.73682 13.013 2.86185 13.138C2.98687 13.263 3.15644 13.3333 3.33325 13.3333H12.6666C12.8434 13.3333 13.013 13.263 13.138 13.138C13.263 13.013 13.3333 12.8434 13.3333 12.6666V9.99992C13.3333 9.63173 13.6317 9.33325 13.9999 9.33325C14.3681 9.33325 14.6666 9.63173 14.6666 9.99992V12.6666C14.6666 13.197 14.4559 13.7057 14.0808 14.0808C13.7057 14.4559 13.197 14.6666 12.6666 14.6666H3.33325C2.80282 14.6666 2.29411 14.4559 1.91904 14.0808C1.54397 13.7057 1.33325 13.197 1.33325 12.6666V9.99992C1.33325 9.63173 1.63173 9.33325 1.99992 9.33325Z"
                                fill="#147D73"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.5286 1.52851C7.78894 1.26816 8.21106 1.26816 8.4714 1.52851L11.8047 4.86185C12.0651 5.1222 12.0651 5.54431 11.8047 5.80466C11.5444 6.06501 11.1223 6.06501 10.8619 5.80466L8 2.94273L5.13807 5.80466C4.87772 6.06501 4.45561 6.06501 4.19526 5.80466C3.93491 5.54431 3.93491 5.1222 4.19526 4.86185L7.5286 1.52851Z"
                                fill="#147D73"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.99992 1.33325C8.36811 1.33325 8.66659 1.63173 8.66659 1.99992V9.99992C8.66659 10.3681 8.36811 10.6666 7.99992 10.6666C7.63173 10.6666 7.33325 10.3681 7.33325 9.99992V1.99992C7.33325 1.63173 7.63173 1.33325 7.99992 1.33325Z"
                                fill="#147D73"
                              />
                            </svg>
                          </div>

                          {isDragActive ? (
                            <p className="text-xs	text-gray leading-5 font-normal">
                              Drop the files here ...
                            </p>
                          ) : (
                            <p className="text-xs	text-gray leading-5 font-normal	">
                              <span className="text-lime-600 	">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                          )}

                          <p className="text-xs text-gray	font-normal leading-5">
                            SVG, PNG or JPG{" "}
                          </p>
                          <p className="text-xs text-gray	font-normal leading-5">
                            (max, 800 X 800px)
                          </p>
                        </div>
                      </div>
                    </div>
                  </Skeleton>
                </div>
                {/* Organization Logo ---END */}

                {/* Ordering Contact ---START */}
                <div className="   w-full rounded-lg border border-inherit bg-white h-full my-[1rem] ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Ordering contact
                    </h6>
                  </div>
                  <Skeleton
                    style={{ padding: "10px" }}
                    loading={loading}
                    active
                    avatar
                  >
                    <div className="px-6 py-7">
                      <div className="w-full ">
                        <div className="flex flex-wrap -mx-3 mb-5">
                          <div className="w-full md:w-1/2 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                              htmlFor="orderingContactFirstName"
                            >
                              First name
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="orderingContactFirstName"
                              type="text"
                              placeholder="Enter First name"
                              name="orderingContactFirstName"
                              value={values.orderingContactFirstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              // onKeyPress={(event) => {
                              //   const allowedCharacters = /^[A-Za-z]*$/; // Regular expression to match only letters (both uppercase and lowercase)
                              //   if (!allowedCharacters.test(event.key)) {
                              //     event.preventDefault();
                              //   }
                              // }}
                              onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                }
                                const allowedCharacters = /^[A-Za-z]*$/;
                                if (
                                  !allowedCharacters.test(event.key) &&
                                  event.key !== "Enter"
                                ) {
                                  event.preventDefault();
                                }
                              }}
                              style={{
                                border:
                                  errors.orderingContactFirstName &&
                                  touched.orderingContactFirstName &&
                                  "1px solid red",
                              }}
                            />
                            {errors.orderingContactFirstName &&
                              touched.orderingContactFirstName && (
                                <p className="mt-2 mb-2 text-red-500 text-xs	font-normal	">
                                  {errors.orderingContactFirstName}
                                </p>
                              )}
                            {errors.orderingContactFirstName &&
                              touched.orderingContactFirstName && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                              )}
                          </div>
                          <div className="w-full md:w-1/2 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                              htmlFor="orderingContactLastName"
                            >
                              Last name
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="orderingContactLastName"
                              type="text"
                              placeholder="Enter Last name"
                              name="orderingContactLastName"
                              value={values.orderingContactLastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              // onKeyPress={(event) => {
                              //   const allowedCharacters = /^[A-Za-z]*$/; // Regular expression to match only letters (both uppercase and lowercase)
                              //   if (!allowedCharacters.test(event.key)) {
                              //     event.preventDefault();
                              //   }
                              // }}
                              onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                }
                                const allowedCharacters = /^[A-Za-z]*$/;
                                if (
                                  !allowedCharacters.test(event.key) &&
                                  event.key !== "Enter"
                                ) {
                                  event.preventDefault();
                                }
                              }}
                              style={{
                                border:
                                  errors.orderingContactLastName &&
                                  touched.orderingContactLastName &&
                                  "1px solid red",
                              }}
                            />
                            {errors.orderingContactLastName &&
                              touched.orderingContactLastName && (
                                <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                  {errors.orderingContactLastName}
                                </p>
                              )}
                            {errors.orderingContactLastName &&
                              touched.orderingContactLastName && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                              )}
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-5 relative">
                          <div className="w-full px-3">
                            <label
                              className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                              htmlFor="orderingContactEmail"
                            >
                              Email
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="orderingContactEmail"
                              type="email"
                              placeholder="Enter Email"
                              name="orderingContactEmail"
                              value={values.orderingContactEmail}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.orderingContactEmail &&
                                  touched.orderingContactEmail &&
                                  "1px solid red",
                              }}
                            />
                            {errors.orderingContactEmail &&
                              touched.orderingContactEmail && (
                                <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                  {errors.orderingContactEmail}
                                </p>
                              )}
                            {errors.orderingContactEmail &&
                              touched.orderingContactEmail && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                              )}
                            {/* <p className="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-5 relative">
                          <div className="w-full px-3">
                            <label
                              className="tracking-wide text-gray-700 text-base flex items-center	 font-medium	 "
                              htmlFor="orderingContactMobile"
                            >
                              Mobile
                              <CustomTooltip
                                placement="right"
                                arrow
                                title="Please use a valid prefix for an Australian mobile number. It should start with '04', '+61', or '61'."
                              >
                                <HelpIcon
                                  sx={{
                                    color: "#E0E0E0",
                                    width: "20px",
                                    marginLeft: "10px",
                                  }}
                                />{" "}
                              </CustomTooltip>
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="orderingContactMobile"
                              type="text"
                              placeholder="Enter mobile no"
                              name="orderingContactMobile"
                              value={values.orderingContactMobile}
                              onChange={handleChange}
                              maxLength={20}
                              onBlur={handleBlur}
                              onKeyPress={(event) => {
                                const allowedCharacters = /^[0-9+]*$/; // Regular expression to match only numbers and '+'
                                if (!allowedCharacters.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              style={{
                                border:
                                  errors.orderingContactMobile &&
                                  touched.orderingContactMobile &&
                                  "1px solid red",
                              }}
                            />
                            {errors.orderingContactMobile &&
                              touched.orderingContactMobile && (
                                <p className="mt-2 mb-2 text-red-500 text-xs	font-normal">
                                  {errors.orderingContactMobile}
                                </p>
                              )}
                            {errors.orderingContactMobile &&
                              touched.orderingContactMobile && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                              )}
                            {/* <p className="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Skeleton>
                </div>
                {/* Organization Contact ---END */}

                {/* Logistics Contact ---START  */}
                <div className="   w-full  rounded-lg border border-inherit bg-white h-full	mb-[1rem] sm:mb-0 md:mb-0 lg:mb-0 ">
                  <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
                    <h6 className="text-base	font-medium	 text-green">
                      Logistics contact
                    </h6>
                  </div>
                  <Skeleton
                    style={{ padding: "10px" }}
                    loading={loading}
                    active
                    avatar
                  >
                    <div className="px-6 py-7">
                      <div className="w-full ">
                        <div className="flex flex-wrap -mx-3 mb-5">
                          <div className="w-full md:w-1/2 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-base	 font-medium"
                              htmlFor="logisticsContactFirstName"
                            >
                              First name
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="logisticsContactFirstName"
                              type="text"
                              placeholder="Enter First name"
                              name="logisticsContactFirstName"
                              value={values?.logisticsContactFirstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.logisticsContactFirstName &&
                                  touched.logisticsContactFirstName &&
                                  "1px solid red",
                              }}
                            />
                            {errors.logisticsContactFirstName &&
                              touched.logisticsContactFirstName && (
                                <p className="mt-2 mb-2 text-red-500 font-normal	text-xs">
                                  {errors.logisticsContactFirstName}
                                </p>
                              )}
                            {errors.logisticsContactFirstName &&
                              touched.logisticsContactFirstName && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                              )}
                          </div>
                          <div className="w-full md:w-1/2 px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                              htmlFor="LogisticsContactLastName"
                            >
                              Last name
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="logisticsContactLastName"
                              type="text"
                              placeholder="Enter Last name"
                              name="logisticsContactLastName"
                              value={values.logisticsContactLastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.logisticsContactLastName &&
                                  touched.logisticsContactLastName &&
                                  "1px solid red",
                              }}
                            />
                            {errors.logisticsContactLastName &&
                              touched.logisticsContactLastName && (
                                <p className="mt-2 mb-2 text-red-500 font-normal	text-xs">
                                  {errors.logisticsContactLastName}
                                </p>
                              )}
                            {errors.logisticsContactLastName &&
                              touched.logisticsContactLastName && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                              )}
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-5">
                          <div className="w-full px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                              htmlFor="LogisticsContactEmail"
                            >
                              Email
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="logisticsContactEmail"
                              type="email"
                              placeholder="Enter Email"
                              name="logisticsContactEmail"
                              value={values.logisticsContactEmail}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              onKeyPress={(e) =>
                                e.key === "Enter" && e.preventDefault()
                              }
                              style={{
                                border:
                                  errors.logisticsContactEmail &&
                                  touched.logisticsContactEmail &&
                                  "1px solid red",
                              }}
                            />
                            {errors.logisticsContactEmail &&
                              touched.logisticsContactEmail && (
                                <p className="mt-2 mb-2 text-red-500 font-normal	text-xs">
                                  {errors.logisticsContactEmail}
                                </p>
                              )}
                            {errors.logisticsContactEmail &&
                              touched.logisticsContactEmail && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                              )}
                            {/* <p className="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-5">
                          <div className="w-full px-3 relative">
                            <label
                              className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                              htmlFor="LogisticsContactMobile"
                            >
                              Mobile
                              <CustomTooltip
                                placement="right"
                                arrow
                                title="Please use a valid prefix for an Australian mobile number. It should start with '04', '+61', or '61'."
                              >
                                <HelpIcon
                                  sx={{
                                    color: "#E0E0E0",
                                    width: "20px",
                                    marginLeft: "10px",
                                  }}
                                />{" "}
                              </CustomTooltip>
                            </label>
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="logisticsContactMobile"
                              type="text"
                              placeholder="Enter mobile no"
                              name="logisticsContactMobile"
                              value={values.logisticsContactMobile}
                              onChange={handleChange}
                              maxLength={20}
                              onKeyPress={(event) => {
                                const allowedCharacters = /^[0-9+]*$/; // Regular expression to match only numbers and '+'
                                if (!allowedCharacters.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              onBlur={handleBlur}
                              style={{
                                border:
                                  errors.logisticsContactMobile &&
                                  touched.logisticsContactMobile &&
                                  "1px solid red",
                              }}
                            />
                            {errors.logisticsContactMobile &&
                              touched.logisticsContactMobile && (
                                <p className="mt-2 mb-2 text-red-500 font-normal	text-xs	">
                                  {errors.logisticsContactMobile}
                                </p>
                              )}
                            {errors.logisticsContactMobile &&
                              touched.logisticsContactMobile && (
                                <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                              )}
                            {/* <p className="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Skeleton>
                </div>
                {/* Logistics Contact ---END */}
              </div>
            </div>
          </div>
        </form>
      </div>

      <BaseUnit
        masterAsyncFunction={asyncFunction}
        baseUnitMeasure={baseUnitMeasure}
        baseUnitMeasureTypeList={baseUnitMeasureTypeList}
        baseUnitMeasureUnitList={baseUnitMeasureUnitList}
        open={baseUnitModalOpen}
        onOk={() => {
          setBaseUnitModalOpen(false);
        }}
        onCancel={() => {
          setBaseUnitModalOpen(false);
        }}
      />
      <InnerUnit
        masterAsyncFunction={asyncFunction}
        innerUnitMeasure={innerUnitMeasure}
        baseUnitMeasureTypeList={baseUnitMeasureTypeList}
        innerUnitTypeList={innerUnitTypeList}
        open={innerUnitModalOpen}
        onOk={() => {
          setInnerUnitModalOpen(false);
        }}
        onCancel={() => {
          setInnerUnitModalOpen(false);
        }}
      />
    </>
  );
}

export default Organisation;
