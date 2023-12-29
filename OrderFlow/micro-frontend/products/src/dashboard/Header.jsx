
import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }
  let arr = [true, false, false, false, false, false]
  const [style, setStyle] = useState(arr);
  const [dropDown, setDropDown] = useState(true);
  const [text, setText] = useState("");

  const selected = (props) => {
    let newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i] = false;
    }
    newArr[props] = true;
    setStyle(newArr);
  }

  const setSelectedText = (txt) => {
    setText(txt);
    setDropDown(true);
  }

  return (
    <div className="2xl:container 2xl:mx-auto">
      <div className="bg-custom-skyBlue  shadow-lg py-4 px-7">
        <div className="hidden md:block">

          <nav className="flex justify-between  ">
            <div className="">
              <h5 className="text-xl font-semibold text-white">Hello [first name] 👋</h5>
              <p className="text-sm font-normal text-lightGray text-start">Welcome back to FOBOH!</p>
            </div>
            <div className=" flex lg:gap-x-14 gap-x-6 items-center	 ">
              <div className="flex gap-4 ">
                <div
                  // onClick={toggleDropdown}
                  className="cursor-pointer"
                >
                  <div className="notification-icon 	">
                    {/* <NotificationsNoneIcon style={{fill:"#fff !important"}}/> */}
                    <>
                      {/* Hello world */}
                      <svg
                        width={46}
                        height={46}
                        viewBox="0 0 46 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width={45}
                          height={45}
                          rx="7.5"
                          fill="#F8FAFC"
                          stroke="#E7E7E7"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.0502 15.0503C19.363 13.7375 21.1434 13 23 13C24.8565 13 26.6369 13.7375 27.9497 15.0503C29.2625 16.363 30 18.1435 30 20C30 23.3527 30.717 25.4346 31.3779 26.6461C31.7096 27.2544 32.0327 27.6535 32.2572 27.8904C32.3696 28.0091 32.458 28.0878 32.5112 28.1322C32.5379 28.1544 32.5557 28.168 32.5634 28.1737C32.5646 28.1746 32.5656 28.1753 32.5663 28.1758C32.9248 28.4221 33.0834 28.8725 32.957 29.2898C32.8293 29.7115 32.4406 30 32 30H14C13.5593 30 13.1706 29.7115 13.0429 29.2898C12.9165 28.8725 13.0752 28.4221 13.4336 28.1758C13.4343 28.1753 13.4353 28.1746 13.4365 28.1737C13.4442 28.168 13.4621 28.1544 13.4887 28.1322C13.5419 28.0878 13.6303 28.0091 13.7428 27.8904C13.9672 27.6535 14.2903 27.2544 14.6221 26.6461C15.2829 25.4346 16 23.3527 16 20C16 18.1435 16.7375 16.363 18.0502 15.0503ZM13.4438 28.169C13.4438 28.1689 13.4439 28.1688 13.444 28.1688C13.444 28.1688 13.444 28.1688 13.444 28.1688L13.4438 28.169ZM16.1493 28H29.8506C29.7745 27.8753 29.6982 27.7434 29.6221 27.6039C28.7829 26.0654 28 23.6473 28 20C28 18.6739 27.4732 17.4021 26.5355 16.4645C25.5978 15.5268 24.326 15 23 15C21.6739 15 20.4021 15.5268 19.4644 16.4645C18.5267 17.4021 18 18.6739 18 20C18 23.6473 17.217 26.0654 16.3779 27.6039C16.3018 27.7434 16.2254 27.8753 16.1493 28Z"
                          fill="#637381"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.7682 32.135C21.2459 31.8579 21.8578 32.0205 22.1349 32.4983C22.2228 32.6498 22.349 32.7756 22.5008 32.863C22.6526 32.9505 22.8247 32.9965 22.9999 32.9965C23.1751 32.9965 23.3472 32.9505 23.4991 32.863C23.6509 32.7756 23.777 32.6498 23.8649 32.4983C24.1421 32.0205 24.754 31.8579 25.2317 32.135C25.7094 32.4122 25.8721 33.0241 25.5949 33.5018C25.3312 33.9564 24.9527 34.3338 24.4973 34.5961C24.0419 34.8584 23.5255 34.9965 22.9999 34.9965C22.4744 34.9965 21.958 34.8584 21.5026 34.5961C21.0472 34.3338 20.6687 33.9564 20.4049 33.5018C20.1278 33.0241 20.2904 32.4122 20.7682 32.135Z"
                          fill="#637381"
                        />
                        <circle cx={27} cy={14} r="3.5" fill="#DC3545" stroke="white" />
                      </svg>
                    </>


                  </div>
                </div>
                <div className="dropdown">
                  <div className="relative">
                    <div className=" cursor-pointer absolute msg-no bg-custom-purple rounded-full 	flex justify-center items-center">
                      <p className="text-xs text-white		font-medium	">4</p>
                    </div>
                    <div className="msg-icon">
                      <svg
                        width={46}
                        height={46}
                        viewBox="0 0 46 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width={45}
                          height={45}
                          rx="7.5"
                          fill="white"
                          stroke="#E7E7E7"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16 15C15.7348 15 15.4804 15.1054 15.2929 15.2929C15.1054 15.4804 15 15.7348 15 16V29.5858L17.2929 27.2929C17.4804 27.1054 17.7348 27 18 27H30C30.2652 27 30.5196 26.8946 30.7071 26.7071C30.8946 26.5196 31 26.2652 31 26V16C31 15.7348 30.8946 15.4804 30.7071 15.2929C30.5196 15.1054 30.2652 15 30 15H16ZM13.8787 13.8787C14.4413 13.3161 15.2044 13 16 13H30C30.7957 13 31.5587 13.3161 32.1213 13.8787C32.6839 14.4413 33 15.2043 33 16V26C33 26.7957 32.6839 27.5587 32.1213 28.1213C31.5587 28.6839 30.7957 29 30 29H18.4142L14.7071 32.7071C14.4211 32.9931 13.991 33.0787 13.6173 32.9239C13.2436 32.7691 13 32.4045 13 32V16C13 15.2044 13.3161 14.4413 13.8787 13.8787Z"
                          fill="#637381"
                        />
                      </svg>


                    </div>
                  </div>
                </div>
              </div>
              <div className="relative dropdown">
                <div
                  className="flex lg:gap-4 gap-2 items-center cursor-pointer	"
                  onClick={toggleDropdown}
                >
                  <div className="">
                    <h6 className="text-sm	 font-bold text-white">Tom Sheer</h6>
                    <p className="text-xs font-normal text-lightGray">Lo-Fi Wines</p>
                  </div>
                  <div className="">
                    <img src="/assets/user.png" alt="" className='h-11	w-11' />
                  </div>
                  <div className="">
                    <img src="/assets/arrow.png" alt="" />
                  </div>
                </div>
                {isOpen && (
                  <div
                    className=" z-10	   w-60 absolute user-dropdown bg-white	shadow-md rounded-lg	h-44	"
                  >
                    <ul className="dropdown-content 	 ">
                      <Link to="/profile">
                        <li className="py-2.5	px-4	">
                          <h6 className="text-sm font-medium		">Profile</h6>
                        </li>
                      </Link>
                      <Link to="#">
                        <Link to="/Organisation">
                          <li className="py-2.5	px-4	">

                            <h6 className="text-sm font-medium		">Settings</h6>
                          </li>
                        </Link>
                      </Link>
                      <Link to="#">
                        <li className="py-2.5	px-4 border-inherit		border-t-2	">
                          <h6 className="text-sm font-medium		">Help</h6>
                        </li>
                      </Link>
                      <Link to="#">
                        <li className="py-2.5	px-4 border-t border-inherit			">
                          <h6 className="text-sm font-medium		">Log out</h6>
                        </li>
                      </Link>
                    </ul>
                  </div>)}
              </div>
            </div>
          </nav>
        </div>
        {/* for smaller devcies */}
        <div className="block md:hidden w-full ">
          <div onClick={() => setDropDown(!dropDown)} className="cursor-pointer  text-white  rounded flex justify-end items-center w-full">

            {/* 
            <div className="flex space-x-2">
              <span id="s1" className={`${text.length != 0 ? '' : 'hidden'} font-semibold text-sm leading-3`}>Selected: </span>
              <p id="textClicked" className="font-normal text-sm leading-3 focus:outline-none hover:bg-gray-800 duration-100 cursor-pointer ">{text ? text : "Collections"}</p>
            </div> */}
            <div id="ArrowSVG"
              className="flex gap-4 items-center cursor-pointer	"
            // onClick={toggleDropdown}
            >
              <div className="">
                <h6 className="text-sm	 font-bold text-white">Tom Sheer</h6>
                <p className="text-xs font-normal text-white">Lo-Fi Wines</p>
              </div>
              <div className="">
                <img src="/assets/user.png" alt="" className='h-11	w-11' />
              </div>
              <div className="">
                <img src="/assets/arrow.png" alt="" />
              </div>
            </div>
            {/* <svg id="ArrowSVG" className={`${dropDown ? '' : 'rotate-180'} transform duration-100`} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg> */}
          </div>
          <div className=" relative">
            <ul id="list" className={`${dropDown ? 'hidden' : 'block'}  bg-white absolute top-8	right-0		shadow-md rounded-lg	h-44 w-64	`}>
              <Link to="/profile">
                <li className="py-2.5	px-4	">
                  <h6 className="text-sm font-medium		">Profile</h6>
                </li>
              </Link>

              <Link to="/Organisation">
                <li className="py-2.5	px-4	">

                  <h6 className="text-sm font-medium		">Settings</h6>
                </li>
              </Link>

              <Link to="#">
                <li className="py-2.5	px-4 border-inherit		border-t-2	">
                  <h6 className="text-sm font-medium		">Help</h6>
                </li>
              </Link>
              <Link to="#">
                <li className="py-2.5	px-4 border-t border-inherit			">
                  <h6 className="text-sm font-medium		">Log out</h6>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}
