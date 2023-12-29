import { Children, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { useFormik } from "formik";
import UnSavedCustomerModal from "../modal/UnsavedCustomerModal";

export const options = [
  { value: 1234, label: "Chocolate" },
  { value: 2345, label: "Strawberry" },
  { value: 3456, label: "Vanilla" },
];

function CustomerBulkEdit() {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [defaultPaymentTerm, setDefaultPaymentTerm] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [initialValues, setInitialValues] = useState([
    {
      customerId: "",
      pricingProfile: {},
      defaultPaymentMethod: {},
      defaultPaymenterms: {},
    },
  ]);
  const [unSaved, setUnSaved] = useState(false);
  const backBtn = () => {
    setUnSaved(true);
    // navigate("/main/products/all-products");
  };

  const { values, errors, handleBlur, handleChange, touched, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: (values) => {},
    });

  const getDatafromLocal = () => {
    const data = localStorage.getItem("selectedCustomers");
    if (data) {
      const selectedData = JSON.parse(data);

      const selectedCustomersValue = selectedData.map((customer) => {
        const dpm = options.find(
          (item) => item.value === +customer?.defaultPaymentMethodId
        );
        const pp = options.find(
          (item) => item.value === +customer?.pricingProfileId
        );
        const dpt = options.find(
          (item) => item.value === customer?.defaultPaymentermId
        );

        return {
          customerId: customer?.buyerId,
          pricingProfile: pp || {},
          defaultPaymentMethod: dpm || {},
          defaultPaymenterms: dpt || {},
        };
      });
      setInitialValues(selectedCustomersValue);
      setValues(selectedCustomersValue);
    }
  };

  useEffect(() => {
    getDatafromLocal();

    axios
      .get(`${mastersUrl}/api/PaymentMethods`)
      .then((response) => {
        setPaymentMethods(
          response.data.map((method) => {
            return {
              label: method.name,
              value: method.paymentMethodId,
            };
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching PaymentMethods:", error);
      });

    axios
      .get(`${mastersUrl}/api/DefaultPaymentTerm`)
      .then((response) => {
        setDefaultPaymentTerm(
          response.data.map((payment) => {
            return {
              label: payment.paymentTermName,
              value: payment.id,
            };
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching DefaultPaymentTerm:", error);
      });
  }, []);

  const handleFieldChange = (customerId, title, value) => {
    setIsUpdate(true);
    setValues((values) => {
      const updatedCustomer = values.map((customer) => {
        if (customer.customerId === customerId && title === "pricingProfile") {
          return {
            ...customer,
            pricingProfile: value,
          };
        } else if (
          customer.customerId === customerId &&
          title === "defaultPaymentMethod"
        ) {
          return {
            ...customer,
            defaultPaymentMethod: value,
          };
        } else if (
          customer.customerId === customerId &&
          title === "defaultPaymenterms"
        ) {
          return {
            ...customer,
            defaultPaymenterms: value,
          };
        }
        return customer;
      });
      return updatedCustomer;
    });
  };

  const handleCancle = () => {
    setValues(initialValues);
    setIsUpdate(false);
  };

  return (
    <>
      {isUpdate && (
        <div className=" 2xl:mx-auto absolute z-50 top-0 right-0 left-0">
          <div className="bg-custom-extraDarkGreen shadow-lg py-1 px-7">
            <div className="block">
              <nav className="flex h-[65px] items-center justify-end gap-5 ">
                <button
                  className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                  onClick={handleCancle}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                >
                  Save
                </button>
              </nav>
            </div>
          </div>
          {/* <AlertModal show={show} setShow={(set) => setShow(set)} /> */}
        </div>
      )}
      <div className="padding-top-custom flex flex-col items-start justify-between px-6 gap-5">
        <div className="flex justify-start gap-3 items-center">
          <div
            onClick={backBtn}
            // onClick={() => navigate("/main/customers/all-customers")}
            className="cursor-pointer"
          >
            <img src="/assets/previousBtn.png" alt="" />
          </div>
          <div className="">
            <h4 className=" text-2xl font-semibold text-darkGreen">
              Customer Bulk edit
            </h4>
            <p className="text-gray font-normal text-sm">
              Editing {values.length} selected products
            </p>
          </div>
        </div>
        <div
          className={`relative overflow-x-auto overflow-y-auto custom-scroll-bar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white  w-full`}
          style={{ height: "530px" }}
        >
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className=" border-b">
              <tr>
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Pricing profile
                </th> */}

                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Default payment methods
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  Default payment terms
                </th>
              </tr>
            </thead>
            <tbody>
              {values.map((customer, index) => {
                return (
                  <tr
                    key={index.toString()}
                    className={`bg-white border-b  dark:border-gray-700   tableNo-${index}`}
                  >
                    {/* <td className={`px-6 py-4 selectId-${index}`}>
                      <div className="w-44">
                        <Select
                          name="colors"
                          options={options}
                          value={customer?.pricingProfile}
                          onChange={(e) =>
                            handleFieldChange(
                              customer.customerId,
                              "pricingProfile",
                              e
                            )
                          }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td> */}

                    <td className={`px-6 py-4 selectId-${index}`}>
                      <div className="w-44">
                        <Select
                          name="colors"
                          options={paymentMethods}
                          value={customer?.defaultPaymentMethod}
                          onChange={(e) =>
                            handleFieldChange(
                              customer.customerId,
                              "defaultPaymentMethod",
                              e
                            )
                          }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td>

                    <td className={`px-6 py-4 selectId-${index}`}>
                      <div className="w-44">
                        <Select
                          name="colors"
                          options={defaultPaymentTerm}
                          value={customer?.defaultPaymenterms}
                          onChange={(e) =>
                            handleFieldChange(
                              customer.customerId,
                              "defaultPaymenterms",
                              e
                            )
                          }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <UnSavedCustomerModal
        open={unSaved}
        onOk={() => {
          setUnSaved(false);
        }}
        onCancel={() => {
          setUnSaved(false);
        }}
        onStay={() => navigate("/main/customers/all-customers")}
      />
    </>
  );
}
export default CustomerBulkEdit;
