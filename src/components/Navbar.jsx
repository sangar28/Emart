import { Link, NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
// import { useState } from "react";

// component starts here
const Navbar = ({
  location,
  getLocation,
  setDropDown,
  dropDown,
  turnOffLocation,
}) => {
  // location section
  const downRef = useRef();

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  useEffect(() => {
    const handleOutClick = (e) => {
      if (downRef.current && !downRef.current.contains(e.target)) {
        setDropDown(false);
      }
    };
    if (dropDown) document.addEventListener("mousedown", handleOutClick);
    return () => document.removeEventListener("mousedown", handleOutClick);
  });

  return (
    <header className="px-4 py-3 shadow-2xl  ">
      <div className="flex justify-between items-center max-w-[1300px] mx-auto">
        <div className="flex gap-15 items-center">
          {/* logo section */}
          <div className="font-semibold text-4xl italic text-shadow-[2px_2px_rgba(0,0,0,0.3)]">
            <Link to="/">
              <span className=" italic font-semibold text-red-500 cursor-pointer">
                E
              </span>
              mart
            </Link>
          </div>
          {/* add location */}
          <div className="flex gap-2 items-center relative justify-around   ">
            <i className="bx bx-current-location font-semibold text-xl"></i>
            <span className="font-semibold relative">
              {location ? (
                <div className="-space-y-2">
                  <p>{location.state}</p>
                  <p>{location.state_district}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
            <div onClick={toggleDropDown} className="">
              <i className="bx bx-caret-down font-semibold text-xl  cursor-pointer "></i>
            </div>
            {dropDown && (
              <div
                ref={downRef}
                className=" flex  flex-col items-center w-[250px] bg-white rounded-2xl shadow-md  h-max  p-5 text-lg absolute top-14 -left-30"
              >
                <span onClick={toggleDropDown}>
                  <IoIosClose className="font-semibold text-[2rem] absolute top-2 right-3" />
                </span>
                <h1 className="font-semibold ">Change Location </h1>
                <div className=" flex gap-2">
                  <button
                    onClick={getLocation}
                    className="py-1 px-4  mt-4   text-white text-sm font-semibold bg-red-500 rounded-[30px]"
                  >
                    Turn on
                  </button>
                  <button
                    onClick={turnOffLocation}
                    className="py-1 px-4  mt-4   text-white text-sm font-semibold bg-red-500 rounded-[30px]"
                  >
                    Turn off
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* menu section */}
        <nav className="flex gap-10 items-center">
          <ul className="flex gap-7 items-center text-[1rem] font-semibold ">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `activeEffect cursor-pointer ${isActive ? "active" : ""}`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `activeEffect cursor-pointer ${isActive ? "active" : ""}`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `activeEffect cursor-pointer ${isActive ? "active" : ""}`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `activeEffect cursor-pointer ${isActive ? "active" : ""}`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="w-6 h-6" />
            <span className="absolute bg-red-500 rounded-full px-2 text-white -top-3 -right-3">
              0
            </span>
          </Link>
          {/* <Link className="px-5 py-2 bg-red-500 rounded-[5px] font-semibold text-white text-lg hover:bg-[#ef1111]">sign in</Link> */}
          <div>
            <SignedOut>
              <SignInButton className="bg-red-500 text-white font-semibold rounded-md px-4 py-2" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
