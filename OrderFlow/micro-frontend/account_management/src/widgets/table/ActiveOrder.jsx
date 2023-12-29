import React, { useState } from "react";

function ActiveOrder() {
    const [show, setShow] = useState(null)
    return (
        <>
            <div className="w-full">
                <div className="sm:flex items-center justify-between my-4">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Active Orders</p>
                </div>

                <div className="flex bg-white mb-3 rounded-md border" >
                    <div className=" flex justify-start items-center   px-2 mb-4   relative ">
                        <input
                            className="text-sm leading-none text-left text-gray-600 px-4 py-3 w-full border rounded border-gray-300  outline-none"
                            type="text"
                            placeholder="Search"
                        />
                        <svg
                            className="absolute  right-3 mt-4  z-10 cursor-pointer"
                            width={24}
                            height={22}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                                stroke="#4B5563"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M21 21L15 15"
                                stroke="#4B5563"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-base leading-none text-[#2B4447]">
                                <th className="font-medium text-left pl-16">Order ID</th>
                                <th className="font-medium text-left pl-16">Customer</th>
                                <th className="font-medium  text-left pl-16">Amount</th>
                                <th className="font-medium  text-left pl-16">Delivery Date</th>
                                <th className="font-medium  text-left pl-16">Status</th>
                                <th className="font-medium  text-left pl-16">Action Required</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                <td className="pl-4 cursor-pointer">
                                    <p className="text-[#637381] text-base font-normal">4</p>
                                </td>
                                <td className="pl-16">
                                    <div className="flex items-center text-[#637381]">
                                        <div className="w-10 h-10">
                                            <p className="text-base  font-medium ">The Union Hotel</p>
                                            <span className="text-sm font-normal">jack@union.com</span>
                                        </div>
                                    </div> 
                                </td>
                                <td className="pl-16">
                                    <p className="font-medium text-[#637381] text-base">$450.10</p>

                                </td>
                                <td className="pl-16">
                                    <p className="font-medium text-base text-[#637381]">25 Dec 2023</p>

                                </td>
                                <td className="pl-16">
                                    <div className="bg-[#4A6CF714] h-8 w-20 mb-4 md:mb-0 rounded-3xl flex items-center justify-center">
                                        <div className="flex items-center">
                                            <div className="h-1 w-1 rounded-full bg-blue-500 mr-1" />
                                            <span className="text-sm font-medium text-[#4A6CF7] ">New</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-16">
                                    <button className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-[#147D73] hover:text-[#147D73]  rounded border border-[#147D73] text-[#147D73] px-6 py-2 text-base">Review Order</button>
                                </td>

                            </tr>

                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                <td className="pl-4 cursor-pointer">
                                    <p className="text-[#637381] text-base font-normal">#LF1001023</p>
                                </td>
                                <td className="pl-16">
                                    <div className="flex items-center text-[#637381]">
                                        <div className="w-10 h-10">
                                            <p className="text-base  font-medium ">The Union Hotel</p>
                                            <span className="text-sm font-normal">jack@union.com</span>
                                        </div>
                                    </div> 
                                </td>
                                <td className="pl-16">
                                    <p className="font-medium text-[#637381] text-base">$350.60</p>

                                </td>
                                <td className="pl-16">
                                    <p className="font-medium text-base text-[#637381]">25 Dec 2023</p>

                                </td>
                                <td className="pl-16">
                                    <div className="bg-[#FFA70B14] h-8 w-28 mb-4 md:mb-0 rounded-3xl flex items-center justify-center">
                                        <div className="flex items-center">
                                            <div className="h-1 w-1 rounded-full bg-yellow-500 mr-1" />
                                            <span className="text-sm font-medium text-[#FFA70B] ">Panding</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-16">
                                    <button className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-[#147D73] hover:text-[#147D73]  rounded border border-[#147D73] text-[#147D73] px-6 py-2 text-base">Confirm Order</button>
                                </td>

                            </tr>

                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                <td className="pl-4 cursor-pointer">
                                    <p className="text-[#637381] text-base font-normal">#LF1001022</p>
                                </td>
                                <td className="pl-16">
                                    <div className="flex items-center text-[#637381]">
                                        <div className="w-10 h-10">
                                            <p className="text-base  font-medium ">Red Bottle</p>
                                            <span className="text-sm font-normal">orders@redbottle.com</span>
                                        </div>
                                    </div> 
                                </td>
                                <td className="pl-16">
                                    <p className="font-medium text-[#637381] text-base">$1000.60</p>

                                </td>
                                <td className="pl-16">
                                    <p className="font-medium text-base text-[#637381]">25 Dec 2023</p>

                                </td>
                                <td className="pl-16">
                                    <div className="bg-[#FFA70B14] h-8 w-28 mb-4 md:mb-0 rounded-3xl flex items-center justify-center">
                                        <div className="flex items-center">
                                            <div className="h-1 w-1 rounded-full bg-yellow-500 mr-1" />
                                            <span className="text-sm font-medium text-[#FFA70B] ">Panding</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-16">
                                    <button className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-[#147D73] hover:text-[#147D73]  rounded border border-[#147D73] text-[#147D73] px-6 py-2 text-base">Confirm  Order</button>
                                </td>

                            </tr>

                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                <td className="pl-4 cursor-pointer w">
                                    <p className="text-[#637381] text-base font-normal">#LF1001024</p>
                                </td>
                                <td className="pl-16">
                                    <div className="flex items-center text-[#637381]">
                                        <div className="w-10 h-10">
                                            <p className="text-base  font-medium ">Red Bottle</p>
                                            <span className="text-sm font-normal">orders@redbottle.com</span>
                                        </div>
                                    </div> 
                                </td>
                                <td className="pl-16">
                                    <p className="font-medium text-[#637381] text-base">$1000.60</p>

                                </td>
                                <td className="pl-16">
                                    <p className="font-medium text-base text-[#637381]">25 Dec 2023</p>

                                </td>
                                <td className="pl-16">
                                    <div className="bg-[#D3405314] h-8 w-28 mb-4 md:mb-0 rounded-3xl flex items-center justify-center">
                                        <div className="flex items-center">
                                            <div className="h-1 w-1 rounded-full bg-red-500 mr-1" />
                                            <span className="text-sm font-medium text-[#D34053]">Cancelled</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="pl-16">
                                    <p></p>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ActiveOrder;
