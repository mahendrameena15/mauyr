import React, { useState } from "react";
import { createTimeline } from "../../helpers/orderDetailsHelper";

const OrderDetailsTimeline = ({
  timeline,
  orderAdressDetails,
  success,
  error,
  asyncFunction,
  shortenName,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const handleShowComments = (e) => {
    const checked = e.target.checked;
    setShowComments(checked);
  };

  const postComment = async (comment) => {
    const response = await createTimeline(
      "comment",
      "",
      orderAdressDetails,
      "comment",
      comment
    );
    response && asyncFunction();
    response
      ? success("Comment has posted")
      : error("Some error has occurred, please try again");
    setComment("");
  };

  return (
    <div className="timeLine-section mt-8">
      <div className="flex justify-between py-2 border-b border-[#C4C4C4] ">
        <h4 className="text-lg font-semibold text-[#2B4447]">Timeline</h4>
        <div className="green-checkbox flex justify-start items-center gap-2">
          <input type="checkbox" onChange={handleShowComments} />

          <p className="text-base font-medium text-[#2B4447]">Show Comments</p>
        </div>
      </div>
      <div className="">
        <div className="box py-12 relative">
          <div className="absolute top-[50px] left-[18px] bg-[#C4C4C4] h-[90%] w-[1px]"></div>
          <ul className="relative flex justify-end ">
            <div className="flex justify-center items-center absolute top-0 left-0 h-[37px] w-[37px] rounded-[50%] border border-[#CCCCCC] bg-[#F1F1F1] text-base font-semibold text-[#2B4447]">
              {shortenName}
            </div>
            <li className=" w-[93%]">
              <textarea
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
                className="rounded-[8px] p-3 w-full"
                style={{ border: "1px solid #CDCED6" }}
              />
              <div className="flex justify-end">
                <button
                  onClick={() => postComment(comment)}
                  className="py-3 px-6 bg-[#147D73] rounded-[6px] text-base font-semibold text-white"
                >
                  Post
                </button>
              </div>
            </li>
          </ul>
          <div className="pt-4 ">
            {timeline?.map((item, index) => (
              <ul className=" flex justify-end " key={index}>
                <div className="w-[93%]">
                  <h4 className="text-lg font-bold text-[#212B36] mb-5">
                    {item?.actionDate}
                  </h4>
                  {item?.actions.map((actionItem, index) =>
                    actionItem.action !== "" ? (
                      <li
                        className="relative flex justify-between items-center mb-4 "
                        key={index}
                      >
                        <div className="absolute top-[4px] left-[-63px]  h-[18px] w-[18px] rounded-[50%] border border-[#CCCCCC] bg-[#FFFFFF]"></div>

                        <p className="text-base font-normal text-[#212B36]">
                          {actionItem?.action}
                        </p>

                        <p className="text-base font-normal text-[#212B36]">
                          {actionItem?.time}
                        </p>
                      </li>
                    ) : (
                      actionItem.comment !== "" &&
                      showComments && (
                        <li
                          className="relative flex justify-between items-center mb-4 "
                          key={index}
                        >
                          <div className="absolute top-[4px] left-[-63px]  h-[18px] w-[18px] rounded-[50%] border border-[#CCCCCC] bg-[#FFFFFF]"></div>

                          <p className="text-base font-normal text-[#212B36]">
                            {actionItem?.comment}
                          </p>

                          <p className="text-base font-normal text-[#212B36]">
                            {actionItem?.time}
                          </p>
                        </li>
                      )
                    )
                  )}
                </div>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTimeline;
