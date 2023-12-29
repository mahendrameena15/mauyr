import React from "react";
import { Link } from "react-router-dom";
function DetailsHeader() {
  return (
    <>
      <div className="pb-6 sm:flex grid items-center justify-between px-6 gap-5 2xl:container 2xl:mx-auto">
        <div className="flex justify-start gap-3 items-center">
          <Link to="/main/customers/all-customers">
            <div className="">
              <img src="/assets/previousBtn.png" alt="" />
            </div>
          </Link>
          <h4 className=" text-2xl font-semibold text-darkGreen">
            Add customer{" "}
          </h4>
        </div>
      </div>
    </>
  );
}

export default DetailsHeader;
