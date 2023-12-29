import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { PersonalDetailsSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ProfileHeader from "../dashboard/ProfileHeader";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../Redux/Action/userSlice";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { styled } from "@mui/material";
function PersonalDetails({
  profileUri,
  setShow,
  show,
  resetProfileImage,
  setImageSrc,
  imageSrc,
  setSaveClicked,
}) {
  const user = useSelector((state) => state.user);
  const [initiaLogoUri, setInitiaLogoUri] = useState("");
  const dispatch = useDispatch();
  const authUrl = process.env.REACT_APP_AUTH_URL;
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    status: true,
    role: "",
    meta: "",
    adId: "",
    imageUrl: "",
    bio: "",
    organisationId: "string",
    isActive: true,
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    fetch(`${authUrl}/api/User/get?email=${email}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const ccrn = data.data[0].ccrn;
        localStorage.setItem("ccrn", ccrn);

        setInitialValues({
          firstName: data.data[0].firstName,
          lastName: data.data[0].lastName,
          email: data.data[0].email,
          mobile: data.data[0].mobile,
          bio: data.data[0].bio,
          password: data.data[0].password,
          status: true,
          role: data.data[0].role,
          meta: data.data[0].meta,
          adId: data.data[0].adId,
          imageUrl: data.data[0].imageUrl,
        });

        setValues({
          firstName: data.data[0].firstName,
          lastName: data.data[0].lastName,
          email: data.data[0].email,
          mobile: data.data[0].mobile,
          bio: data.data[0].bio,
          password: data.data[0].password,
          status: true,
          role: data.data[0].role,
          meta: data.data[0].meta,
          adId: data.data[0].adId,
          imageUrl: data.data[0].imageUrl,
        });
        setImageSrc(data.data[0].imageUrl);
        setInitiaLogoUri(data.data[0].imageUrl);
        dispatch(
          updateUserData((prev) => {
            return {
              ...prev,
              imageUrl: data.data[0].imageUrl,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  }, []);

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
    validationSchema: PersonalDetailsSchema,
    onSubmit: (values) => {
      const id = localStorage.getItem("ccrn");
      fetch(`${authUrl}/api/User/update?ccrn=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          status: true,
          role: values.role,
          meta: values.meta,
          adId: values.adId,
          imageUrl: profileUri,
          bio: values.bio,
          mobile: values.mobile,
          organisationId: localStorage.getItem("organisationId"),
          isActive: true,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            dispatch(
              updateUserData({
                ...user,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                mobile: values.mobile,
                password: values.password,
                imageUrl: profileUri,
                status: true,
                role: values.role,
                meta: values.meta,
                adId: values.adId,
                bio: values.bio,
                organisationId: values.organisationId,
                isActive: true,
              })
            );
            setShow(false);
            fetch(`${authUrl}/api/User/get?ccrn=${id}`, {
              method: "GET",
            })
              .then((response) => response.json())
              .then((data) => {
                setInitialValues({
                  firstName: data.data[0].firstName,
                  lastName: data.data[0].lastName,
                  email: data.data[0].email,
                  mobile: data.data[0].mobile,
                  bio: data.data[0].bio,
                  password: data.data[0].password,
                  status: true,
                  role: data.data[0].role,
                  meta: data.data[0].meta,
                  adId: data.data[0].adId,
                  imageUrl: data.data[0].imageUrl,
                  organisationId: "",
                  isActive: true,
                });

                setValues({
                  firstName: data.data[0].firstName,
                  lastName: data.data[0].lastName,
                  email: data.data[0].email,
                  mobile: data.data[0].mobile,
                  bio: data.data[0].bio,
                  password: data.data[0].password,
                  status: true,
                  role: data.data[0].role,
                  meta: data.data[0].meta,
                  adId: data.data[0].adId,
                  imageUrl: data.data[0].imageUrl,
                  organisationId: "",
                  isActive: true,
                });
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    },
  });

  const handleInputChange = () => {
    setShow(true);
  };

  const handleReset = () => {
    setShow(false);
    setValues(initialValues);
    resetProfileImage(initialValues?.imageUrl);
    setImageSrc(initialValues.imageUrl);
    dispatch(
      updateUserData({
        ...user,
        imageUrl: initialValues.imageUrl,
      })
    );
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

  return (
    <>
      <div className=" lg:w-3/5 w-full  rounded-lg		 border border-inherit bg-white	 grid	 overflow-y-auto	scroll-smooth	scrollable ">
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
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">Personal details</h6>
        </div>
        <div className="px-6 py-7">
          <form onChange={handleInputChange} className="w-full ">
            <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  First name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={(event) => {
                    const allowedCharacters = /^[A-Za-z]*$/;
                    if (!allowedCharacters.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  style={{
                    border:
                      errors.firstName && touched.firstName && "1px solid red",
                  }}
                />
                {errors.firstName && touched.firstName && (
                  <p className="mt-2 mb-2 text-red-500">{errors.firstName}</p>
                )}
                {errors.firstName && touched.firstName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Last name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyPress={(event) => {
                    const allowedCharacters = /^[A-Za-z\s]*$/; // Regular expression to match only letters (both uppercase and lowercase)
                    if (!allowedCharacters.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  style={{
                    border:
                      errors.lastName && touched.lastName && "1px solid red",
                  }}
                />
                {errors.lastName && touched.lastName && (
                  <p className="mt-2 mb-2 text-red-500">{errors.lastName}</p>
                )}
                {errors.lastName && touched.lastName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full relative px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full border border-gray-200 rounded-md	py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  disabled
                  type="email"
                  name="email"
                  autoComplete="on"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    color: "gray",
                    border: errors.email && touched.email && "1px solid red",
                  }}
                />
                {errors.email && touched.email && (
                  <p className="mt-2 mb-2 text-red-500">{errors.email}</p>
                )}
                {errors.email && touched.email && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}

                {/* <p className="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full relative px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-password"
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
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  name="mobile"
                  placeholder="Mobile No"
                  value={values.mobile}
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
                    border: errors.mobile && touched.mobile && "1px solid red",
                  }}
                />
                {errors.mobile && touched.mobile && (
                  <p className="mt-2 mb-2 text-red-500">{errors.mobile}</p>
                )}
                {errors.mobile && touched.mobile && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
                {/* <p className="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full relative px-3">
                <label
                  htmlFor="message"
                  className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
                >
                  Bio
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                  placeholder="Leave a comment..."
                  name="bio"
                  maxLength={256}
                  value={values.bio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: errors.bio && "1px solid red",
                  }}
                />
                {errors.bio && (
                  <p className="mt-2 mb-2 text-red-500">{errors.bio}</p>
                )}
                {/* <p className="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PersonalDetails;
