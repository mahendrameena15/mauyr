import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Select } from "antd";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { postInnerUnitMeasure } from "../helpers/postInnerUnitMeasure";
import { message } from "antd";
import { getInnerUnitMeasureList } from "../helpers/getUnitOfMeasures";
import { putInnerUnitMeasure } from "../helpers/putInnerUnitMeasure";
import { deleteInnerUnitMeasure } from "../helpers/deleteInnerUnitMeasure";

const InnerUnit = ({
  masterAsyncFunction,
  baseUnitMeasureTypeList,
  innerUnitTypeList,
  open,
  onOk,
  onCancel,
}) => {
  const [unit, setUnit] = useState([]);
  const [amount, setAmount] = useState("");
  const [iumUnit, setiumUnit] = useState(null);
  const [iumType, setIumType] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  let isPut = false;
  const success = (message) => {
    messageApi.open({
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">{message}</p>
        </div>
      ),
      className: "custom-class",
    });
  };

  const error = (message) => {
    messageApi.open({
      content: (
        <div className="flex justify-center gap-2 items-center">
          <CloseIcon style={{ fill: "#fff", width: "15px" }} />
          <p className="text-base font-semibold text-[#F8FAFC]">{message}</p>
        </div>
      ),
      className: "custom-class",
    });
  };
  useEffect(() => {
    asyncFunction();
  }, []);

  const asyncFunction = async () => {
    const innerUnitMeasure = await getInnerUnitMeasureList();
    isPut = innerUnitMeasure.length > 0;
    setUnit(
      innerUnitMeasure.map((item, index) => {
        const amount = item.unit.split(" ")[0];
        const iumUnit = item.unit.split(" ")[1];
        return {
          key: index,
          id: item._id,
          amount: amount,
          iumType: item.type,
          iumUnit: iumUnit,
          editable: false,
        };
      })
    );
  };

  const handleSelectUnit = (value) => {
    setiumUnit(value);
  };
  const handleSelectType = (value) => {
    setIumType(value);
  };

  const HandleAddUnit = async () => {
    setAmount("");
    setIumType(null);
    setiumUnit(null);

    const addInnerMeasureUnit = [
      {
        amount: amount,
        iumType: iumType,
        iumUnit: iumUnit,
        editable: false,
      },
    ];

    const response = await postInnerUnitMeasure(addInnerMeasureUnit);
    if (response.success) {
      let item = response.data;
      const match = item?.unit?.split(" ");
      if (match.length === 2) {
        const value = match[0];
        const unit = match[1];
        const formData = {
          id: item._id,
          amount: value,
          iumType: item.type,
          iumUnit: unit,
          editable: false,
        };
        setUnit((unit) => [...unit, formData]);
      }
      success("Base unit measure added!");
      masterAsyncFunction();
    } else {
      error("Some error occurred, please try again.");
    }
  };
  console.log(unit);

  const handleDelete = async (idx, innerUnitMeasureId) => {
    setUnit(unit.filter((item, itemIndex) => itemIndex !== idx));

    const response = await deleteInnerUnitMeasure(innerUnitMeasureId);
    if (response) {
      setUnit((unit) => {
        return unit.filter((item, itemIndex) => itemIndex !== idx);
      });
      success("Inner unit measure removed!");
      masterAsyncFunction();
    } else {
      error("Some error occurred while removing.");
    }
  };

  const handleIsEdit = (idx) => {
    setUnit((prev) =>
      prev.map((item, itemIndex) => {
        if (itemIndex === idx) {
          return {
            ...item,
            editable: true,
          };
        }
        return item;
      })
    );
  };

  const handleEdit = (idx, name, value) => {
    setUnit((prev) =>
      prev?.map((item, itemIndex) => {
        if (itemIndex === idx && name === "amount") {
          return {
            ...item,
            amount: value,
          };
        } else if (itemIndex === idx && name === "innerUnitMeasureUnit") {
          return {
            ...item,
            iumUnit: value,
          };
        } else if (itemIndex === idx && name === "innerUnitMeasureType") {
          return {
            ...item,
            iumType: value,
          };
        }
        return item;
      })
    );
  };

  const handleSaveEdit = async (idx, innerUnitMeasureId) => {
    setUnit((prev) =>
      prev?.map((item, itemIndex) => {
        if (itemIndex === idx) {
          return {
            ...item,
            editable: false,
          };
        }
        return item;
      })
    );

    const editedItem = [unit.find((item) => item.id === innerUnitMeasureId)];

    const response = await putInnerUnitMeasure(editedItem);
    response
      ? success("Inner unit measure updated!")
      : error("Some error occurred, please try again.");
    response && masterAsyncFunction();
  };

  const handleCancelEdit = async (idx) => {
    await asyncFunction();
    setUnit((prev) =>
      prev.map((item, itemIndex) => {
        if (itemIndex === idx) {
          return {
            ...item,
            editable: false,
          };
        }
        return item;
      })
    );
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <div className="flex justify-start items-center gap-3">
            <div className="bg-[#F8FAFC] h-[48px] w-[48px] rounded-full flex justify-center items-center ">
              <CategoryOutlinedIcon style={{ fill: "#147D73" }} />
            </div>
            <h5 className="text-[20px] font-medium text-[#2B4447]">
              Configure unit of measure
            </h5>
          </div>
        }
        open={open}
        footer={null}
        onOk={onOk}
        onCancel={onCancel}
      >
        <div>
          <p className="text-sm font-normal text-[#2B4447] leading-[24px] my-6">
            <span className="font-bold">Inner unit of measure</span> defines a
            specific packaging quantity within a product's overall
            configuration, allowing products to be grouped and sold in
            quantities beyond the base unit.
          </p>
          <div className="my-6">
            {unit.length > 0 && (
              <h5 className="text-base font-normal text-[#147D73]">
                Added units:
              </h5>
            )}
            <div className="min-h-[0px] max-h-[172px] overflow-y-auto custom-scroll-bar">
              {unit?.map((item, idx) => (
                <div
                  key={idx}
                  className="mt-4 py-4 flex justify-between items-center border-y border-y-[#E7E7E7]"
                >
                  {item.editable ? (
                    <div className="flex flex-nowrap  mb-5 relative">
                      <div className="w-full  px-3 relative">
                        <h5 className="text-base font-medium text-[#2B4447] mb-2">
                          Inner unit of measure
                        </h5>
                        <div className="flex items-center  justify-start border rounded-[6px] border-[#E0E0E0]">
                          <input
                            className="border-0 placeholder:text-[15px] placeholder:font-normal "
                            type="text"
                            value={item.amount}
                            placeholder="Enter amount"
                            style={{
                              width: "60%",
                              height: "32px",
                              marginTop: "0px ",
                              paddingRight: "18px",
                              paddingLeft: "18px",
                            }}
                            onChange={(e) =>
                              handleEdit(idx, "amount", e.target.value)
                            }
                            onKeyPress={(event) => {
                              const allowedCharacters = /^[0-9]*$/; // Regular expression to match only numbers and '+'
                              if (!allowedCharacters.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <Select
                            className="custom-border-none"
                            style={{
                              width: "40%",
                            }}
                            placeholder="Select unit"
                            value={item.iumUnit}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            onChange={(value) =>
                              handleEdit(idx, "baseUnitMeasureType", value)
                            }
                            options={baseUnitMeasureTypeList}
                          />
                        </div>
                      </div>
                      <div className="w-full  px-3 relative">
                        <h5 className="text-base font-medium text-[#2B4447] mb-2">
                          Type
                        </h5>
                        <div className="flex items-center">
                          <Select
                            showSearch
                            style={{
                              width: "100%",
                            }}
                            value={item.iumType}
                            placeholder="Select type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            onChange={(value) =>
                              handleEdit(idx, "innerUnitMeasureType", value)
                            }
                            options={innerUnitTypeList}
                          />
                          <div
                            onClick={() => handleSaveEdit(idx, item?.id)}
                            className="ml-[16px]"
                          >
                            <CheckCircleOutlineIcon
                              style={{ fill: "#147D73", cursor: "pointer" }}
                            />
                          </div>
                          <div
                            onClick={() => handleCancelEdit(idx, item?.id)}
                            className="ml-[16px]"
                          >
                            <CancelOutlinedIcon
                              style={{ fill: "#147D73", cursor: "pointer" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h5 className="text-base font-bold text-[#637381]">
                        {`${item?.amount} ${item?.iumUnit}`} {item?.iumType}{" "}
                      </h5>
                      <div className="flex items-center justify-end gap-3 pr-3">
                        <div
                          onClick={() => handleIsEdit(idx)}
                          className="border border-[#E7E7E7] rounded-[8px] h-[35px] w-[35px] bg-[#F8FAFC] flex justify-center items-center"
                        >
                          <EditRoundedIcon
                            style={{ fill: "#147D73", cursor: "pointer" }}
                          />
                        </div>
                        <div
                          onClick={() => handleDelete(idx, item?.id)}
                          className="border border-[#E7E7E7] rounded-[8px] h-[35px] w-[35px] bg-[#F8FAFC] flex justify-center items-center"
                        >
                          <DeleteIcon
                            style={{ fill: "#147D73", cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-nowrap  mb-5 relative">
            <div className="w-full  px-3 relative">
              <h5 className="text-base font-medium text-[#2B4447] mb-2">
                Inner unit of measure
              </h5>
              <div className="flex items-center  justify-start border rounded-[6px] border-[#E0E0E0]">
                <input
                  className="border-0 placeholder:text-[15px] placeholder:font-normal "
                  type="text"
                  style={{
                    width: "60%",
                    height: "32px",
                    marginTop: "0px ",
                    paddingRight: "18px",
                    paddingLeft: "18px",
                  }}
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onKeyPress={(event) => {
                    const allowedCharacters = /^[0-9]*$/; // Regular expression to match only numbers and '+'
                    if (!allowedCharacters.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <Select
                  className="custom-border-none"
                  style={{
                    width: "40%",
                  }}
                  placeholder="Enter amount"
                  value={iumUnit}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  onChange={handleSelectUnit}
                  options={baseUnitMeasureTypeList}
                />
              </div>
            </div>
            <div className="w-full  px-3 relative">
              <h5 className="text-base font-medium text-[#2B4447] mb-2">
                Type
              </h5>
              <div className="flex items-center">
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  placeholder="Select type"
                  value={iumType}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  onChange={handleSelectType}
                  options={innerUnitTypeList}
                />
                <AddCircleOutlineIcon
                  className=""
                  style={{
                    fill: "#147D73",
                    cursor: "pointer",
                    marginLeft: "16px",
                  }}
                  onClick={HandleAddUnit}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InnerUnit;
