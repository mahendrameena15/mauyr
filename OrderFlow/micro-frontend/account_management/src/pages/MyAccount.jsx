import React from 'react';


const MyAccount = () => {
    return (

        <div className="px-2  ">
            <div className="flex flex-no-wrap items-start">
                <div className="w-full ">
                    <div className="">
                        <div className="bg-white rounded shadow mt-2 py-4">


                            {/* end */}
                            <div className="mt-10 px-7">
                                <p className="text-xl font-semibold leading-tight text-gray-800">
                                    Profile
                                </p>
                                <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
                                    <div>
                                        <p className="text-xl font-semibold leading-tight text-gray-800 px-8 mb-4 pt-6 ">
                                            Business
                                        </p>
                                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                            <div className='grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7'>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="Trading-name">
                                                        Trading Name
                                                    </label>
                                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="TradingName" type="text" placeholder="name" />
                                                </div>
                                                <div className="mb-6">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ABN">
                                                        ABN
                                                    </label>
                                                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="ABN" type="text" placeholder="Number" />

                                                </div>
                                            </div>
                                            <div className="grid w-full">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                        Business Name
                                                    </label>
                                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="BusinessName" type="text" placeholder="name" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div>
                                        <p className="text-xl font-semibold leading-tight text-gray-800 px-8 mb-4 pt-6 ">
                                            Account
                                        </p>
                                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                    Email
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                                            </div>
                                            <div className="mb-4 mt-9">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                                                    Password
                                                </label>
                                                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Name" />
                                            </div>

                                        </form>
                                    </div>
                                    <div>
                                        <p className="text-xl font-semibold leading-tight text-gray-800 px-8 mb-4 pt-6 ">
                                            Address
                                        </p>
                                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Address">
                                                    Address
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Address" type="text" placeholder="Name" />
                                            </div>
                                            <div className="mb-6">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Address">
                                                    Address line 2
                                                </label>
                                                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="Address" type="text" placeholder="Address" />

                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-7">
                                                <div className="sm:col-span-2 sm:col-start-1">
                                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                        City
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            id="city"
                                                            autoComplete="address-level2"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 mt-4 sm:mt-0">
                                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                        State
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            id="state"
                                                            autoComplete="address-level1"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 mt-4 sm:mt-0">
                                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Country
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            name="postal-code"
                                                            id="postal-code"
                                                            autoComplete="postal-code"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid w-full pt-4">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                        Business Name
                                                    </label>
                                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="BusinessName" type="text" placeholder="name" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div>
                                        <p className="text-xl font-semibold leading-tight text-gray-800 px-8 mb-4 pt-6 ">
                                            Billing Address
                                        </p>
                                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Address">
                                                    Address
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Address" type="text" placeholder="Name" />
                                            </div>
                                            <div className="mb-6">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Address">
                                                    Address line 2
                                                </label>
                                                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="Address" type="text" placeholder="Address" />

                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-7">
                                                <div className="sm:col-span-2 sm:col-start-1">
                                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                        City
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            id="city"
                                                            autoComplete="address-level2"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 mt-4 sm:mt-0">
                                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                        State
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            id="state"
                                                            autoComplete="address-level1"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 mt-4 sm:mt-0">
                                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Country
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            name="postal-code"
                                                            id="postal-code"
                                                            autoComplete="postal-code"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid w-full pt-4">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                        Business Name
                                                    </label>
                                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="BusinessName" type="text" placeholder="name" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-start md:justify-start gap-x-4 gap-y-4">

                                <button className="bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[144px] w-full ">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
