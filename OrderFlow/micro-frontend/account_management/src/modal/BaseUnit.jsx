import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Select } from "antd";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { postBaseUnitMeasure } from "../helpers/postBaseUnitMeasure";
import { message } from "antd";
import { getbaseUnitMeasureList } from "../helpers/getUnitOfMeasures";
import { putBaseUnitMeasure } from "../helpers/putBaseUnitMeasure";
import { deleteBaseUnitMeasure } from "../helpers/deleteBaseUnitMeasure";

const BaseUnit = ({
  baseUnitMeasure,
  baseUnitMeasureTypeList,
  baseUnitMeasureUnitList,
  open,
  onOk,
  onCancel,
  masterAsyncFunction,
}) => {
  const [unit, setUnit] = useState([]);
  const cancelButtonRef = useRef(null);
  const [selectedBaseUnit, setSelectedBaseUnit] = useState(null);
  const [selectedBaseType, setSelectedBaseType] = useState(null);
  const [amount, setAmount] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [isPut, setIsPut] = useState(false);

  const handleSelectUnit = (value) => {
    setSelectedBaseUnit(value);
  };
  const handleSelectType = (value) => {
    setSelectedBaseType(value);
  };

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
    const baseUnitMeasure = await getbaseUnitMeasureList();
    setIsPut(unit.length > 0);

    setUnit(
      baseUnitMeasure.map((item) => {
        const bumUnitItem = splitValueAndUnit(item?.unit);
        return {
          id: item._id,
          amount: bumUnitItem?.value,
          type: item.type,
          bumUnit: bumUnitItem?.unit,
          editable: false,
        };
      })
    );

    function splitValueAndUnit(inputString) {
      const match = inputString.split(" ");
      if (match) {
        const value = match[0];
        const unit = match[1];
        return { value, unit };
      } else {
        return null;
      }
    }
  };

  const addBtn = async () => {
    setSelectedBaseType(null);
    setSelectedBaseUnit(null);
    setAmount("");

    const addBaseUnitMeasure = [
      {
        type: selectedBaseType,
        amount: amount,
        bumUnit: selectedBaseUnit,
        editable: false,
      },
    ];

    const response = await postBaseUnitMeasure(addBaseUnitMeasure);
    if (response.success) {
      let item = response.data;
      const match = item?.unit?.split(" ");
      if (match.length === 2) {
        const value = match[0];
        const unit = match[1];
        const formData = {
          id: item._id,
          amount: value,
          type: item.type,
          bumUnit: unit,
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

  const handleDelete = async (idx, baseUnitMeasureId) => {
    setUnit(unit.filter((item, itemIndex) => itemIndex !== idx));
    const response = await deleteBaseUnitMeasure(baseUnitMeasureId);
    if (response) {
      setUnit((unit) => {
        return unit.filter((item, itemIndex) => itemIndex !== idx);
      });
      success("Base unit measure removed!");
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
        } else if (itemIndex === idx && name === "baseUnitMeasureUnit") {
          return {
            ...item,
            bumUnit: value,
          };
        } else if (itemIndex === idx && name === "baseUnitMeasureTypeList") {
          return {
            ...item,
            type: value,
          };
        }
        return item;
      })
    );
  };

  const handleSaveEdit = async (idx, baseUnitMeasureId) => {
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

    const editedItem = [unit.find((item) => item.id === baseUnitMeasureId)];
    const response = await putBaseUnitMeasure(editedItem);
    response
      ? success("Base unit measure updated!")
      : error("Some error occurred, please try again.");
    response && masterAsyncFunction();
  };

  const handleCancelEdit = async (idx) => {
    await asyncFunction();
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
        onOk={onOk}
        footer={null}
        onCancel={onCancel}
      >
        <div>
          <p className="text-sm font-normal text-[#2B4447] leading-[24px] my-6">
            <span className="font-bold">Base unit of measure</span> is the
            foundational measurement unit that establishes the primary quantity
            for a product, forming the basis for ordering configurations.
          </p>
          {unit && (
            <div className="my-6">
              {unit.length > 0 && (
                <h5 className="text-base font-normal text-[#147D73]">
                  Added units:
                </h5>
              )}
              <div className="min-h-[0px] max-h-[172x] overflow-y-auto custom-scroll-bar">
                {unit?.map((item, idx) => (
                  <div
                    key={idx}
                    className="mt-4 py-4 flex justify-between items-center border-y border-y-[#E7E7E7] "
                  >
                    {item.editable ? (
                      <div className="flex flex-nowrap  mb-5 relative">
                        <div className="w-full  px-3 relative">
                          <h5 className="text-base font-medium text-[#2B4447] mb-2">
                            Base unit of measure
                          </h5>
                          <div className="flex items-center  justify-start border rounded-[6px] border-[#E0E0E0]">
                            <input
                              className="border-0 placeholder:text-[15px] placeholder:font-normal "
                              style={{
                                width: "70%",
                                height: "32px",
                                marginTop: "0px ",
                                paddingRight: "40px",
                              }}
                              placeholder="Enter amount"
                              value={item?.amount}
                              type="text"
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
                                width: "30%",
                              }}
                              placeholder="Enter amount"
                              value={item?.bumUnit}
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
                              options={baseUnitMeasureUnitList}
                              onChange={(value) =>
                                handleEdit(idx, "baseUnitMeasureUnit", value)
                              }
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
                              value={item?.type}
                              onChange={(value) =>
                                handleEdit(
                                  idx,
                                  "baseUnitMeasureTypeList",
                                  value
                                )
                              }
                              style={{
                                width: "100%",
                              }}
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
                              options={baseUnitMeasureTypeList}
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
                          {`${item?.amount} ${item?.bumUnit}`} {item?.type}
                        </h5>
                        <div className="flex items-center justify-end gap-3 pr-2">
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
                            className="border cursor-pointer border-[#E7E7E7] rounded-[8px] h-[35px] w-[35px] bg-[#F8FAFC] flex justify-center items-center"
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
          )}

          <div className="flex flex-nowrap -mx-3 mb-5 relative">
            <div className="w-full  px-3 relative">
              <h5 className="text-base font-medium text-[#2B4447] mb-2">
                Base unit of measure
              </h5>
              <div className="flex items-center justify-start border rounded-[6px] border-[#E0E0E0]">
                <input
                  className="border-0 placeholder:text-[15px] placeholder:font-normal "
                  style={{
                    width: "70%",
                    height: "32px",
                    marginTop: "0px ",
                    paddingRight: "40px",
                  }}
                  placeholder="Enter amount"
                  value={amount}
                  type="text"
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
                    width: "30%",
                  }}
                  placeholder="Enter amount"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  value={selectedBaseUnit}
                  options={baseUnitMeasureUnitList}
                  onChange={handleSelectUnit}
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
                  onChange={handleSelectType}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                  }}
                  placeholder="Select type"
                  value={selectedBaseType}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={baseUnitMeasureTypeList}
                />
                <AddCircleOutlineIcon
                  className=""
                  style={{
                    fill: "#147D73",
                    cursor: "pointer",
                    marginLeft: "16px",
                    cursor: "pointer",
                  }}
                  onClick={addBtn}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BaseUnit;
