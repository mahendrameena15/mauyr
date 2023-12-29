import React from "react";
import dollarImg from "../../image/dollarImg.png"
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

function SalesCard() {
    return (
        <>
           
            <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                <div className="bg-white dark:bg-gray-800 rounded-lg py-3 px-2  shadow">
                    <div className="text-gray-700 dark:text-gray-400 px-2 py-2">
                        <img src={dollarImg}
                            alt="dollar"
                        />
                    </div>
                    <div className="p-3 max-w-[250px] ">

                        <div className="flex items-start flex-col mt-2">
                            <h2 className="text-[#2B4447] text-2xl leading-normal font-bold">$12,489</h2>
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium leading-4 text-[#637381] text-sm ">Total revenue</h3>
                            <div className="text-green-400 flex justify-between items-center">
                                <p className="text-green-400 text-sm tracking-wide font-medium leading-normal ">0.43% </p>
                                <ArrowUpward
                                    className="w-[6px] h-[4px]"
                                />

                            </div>

                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg py-3 px-2  shadow">
                    <div className="text-gray-700 dark:text-gray-400 px-2 py-2">
                        <img src={dollarImg}
                            alt="dollar"

                        />
                    </div>
                    <div className="p-3 max-w-[250px] ">

                        <div className="flex items-start flex-col mt-2">
                            <h2 className="text-[#2B4447] text-2xl leading-normal font-bold">$2,572</h2>
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium leading-4 text-[#637381] text-sm ">Gross profit</h3>
                            <div className="text-green-400 flex justify-between items-center">
                                <p className="text-green-400 text-sm tracking-wide font-medium leading-normal ">4.35% </p>
                                <ArrowUpward
                                    className="w-[6px] h-[4px]"
                                />

                            </div>

                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg py-3 px-2  shadow">
                    <div className="text-gray-700 dark:text-gray-400 px-2 py-2">

                        <img src={dollarImg}
                            alt="dollar"

                        />
                    </div>
                    <div className="p-3 max-w-[250px] ">

                        <div className="flex items-start flex-col mt-2">
                            <h2 className="text-[#2B4447] text-2xl leading-normal font-bold">585</h2>
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium leading-4 text-[#637381] text-sm ">Total orders</h3>
                            <div className="text-green-400 flex justify-between items-center">
                                <p className="text-green-400 text-sm tracking-wide font-medium leading-normal ">2.59% </p>
                                <ArrowUpward
                                    className="w-[6px] h-[4px]"
                                />

                            </div>

                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg py-3 px-2  shadow">
                    <div className="text-gray-700 dark:text-gray-400 px-2 py-2">

                        <img src={dollarImg}
                            alt="dollar"

                        />
                    </div>
                    <div className="p-3 max-w-[250px] ">

                        <div className="flex items-start flex-col mt-2">
                            <h2 className="text-[#2B4447] text-2xl leading-normal font-bold">120</h2>
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium leading-4 text-[#637381] text-sm ">Active customers</h3>
                            <div className="text-[#DC3545] flex justify-between items-center">

                                <p className="text-[#DC3545] text-sm tracking-wide font-medium leading-normal ">0.95% </p>
                                <ArrowDownward
                                    className="w-[6px] h-[4px]"
                                />

                            </div>

                        </div>
                    </div>
                </div>




            </div>
            {/* Card code block end */}
        </>
    );
}
export default SalesCard;
