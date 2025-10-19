import { Link, NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
// component starts here
const Navbar = ({
  location,
  setDropDown,
  dropDown,
  turnOffLocation,
  handleLocation,
}) => {
  // location section
  const downRef = useRef();
  const mobileMenuRef = useRef();

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };
  // handle ouside dropdown
  useEffect(() => {
    const handleOutClick = (e) => {
      if (downRef.current && !downRef.current.contains(e.target)) {
        setDropDown((prev) => !prev);
      }
    };
    if (dropDown) document.addEventListener("mousedown", handleOutClick);
    return () => document.removeEventListener("mousedown", handleOutClick);
  }, [dropDown, setDropDown]);

  // menubar section
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMenubar = () => {
    console.log("menu clicked");
    setToggleMenu(!toggleMenu);
  };
  // handle ouside click toggleMenu
  useEffect(() => {
    const handleOutClick = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setToggleMenu((prev) => !prev);
      }
    };
    if (toggleMenu) document.addEventListener("mousedown", handleOutClick);
    return () => document.removeEventListener("mousedown", handleOutClick);
  }, [toggleMenu]);

  return (
    <header className="px-4 py-3 shadow-md ">
      <div className="flex justify-between items-center gap-20 sm:gap-0 max-w-[1300px] mx-auto">
        <div className="flex justify-between w-full items-center ">
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
            <div className="lg:flex gap-2 items-center relative justify-around  hidden ">
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
              {/* dropDown button */}
              <div onClick={toggleDropDown}>
                <i className="bx bx-caret-down font-semibold text-xl  cursor-pointer "></i>
              </div>
              {dropDown && (
                <div
                  ref={downRef}
                  className=" flex  flex-col items-center w-[250px] bg-white rounded-2xl shadow-md  h-max  p-5 text-md absolute top-14 -left-30"
                >
                  <span onClick={toggleDropDown}>
                    <IoIosClose className="font-semibold text-[2rem] absolute top-2 right-3" />
                  </span>
                  <h1 className="font-semibold ">Change Location </h1>
                  <div className=" flex gap-2">
                    <button
                      onClick={() => {
                        handleLocation();
                      }}
                      className="py-1 px-4  mt-4   text-white text-sm font-semibold bg-red-500 rounded-[30px]"
                    >
                      Turn on
                    </button>
                    <button
                      onClick={() => {
                        turnOffLocation();
                      }}
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
          <nav className="sm:flex gap-10 items-center hidden">
            <ul className="flex gap-7 items-center text-[1rem] font-semibold ">
              {["Home", "Products", "About", "Contact"].map((item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `activeEffect cursor-pointer ${isActive ? "active" : ""}`
                  }
                >
                  <li>{item}</li>
                </NavLink>
              ))}
            </ul>
            {/* cart button */}
            <Link to={"/cart"} className="relative">
              <IoCartOutline className="w-6 h-6" />
              <span className="absolute bg-red-500 rounded-full px-[6px] text-white text-[13px] -top-2 -right-2">
                0
              </span>
            </Link>
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

        {/* mobile layout */}
        <div className="flex gap-6 items-center ">
          {/* cart button moblie layout */}
          <Link to={"/cart"} className="relative sm:hidden">
            <IoCartOutline className="w-6 h-6" />
            <span className="absolute bg-red-500 rounded-full px-[6px] text-[13px]  text-white -top-2 -right-2">
              0
            </span>
          </Link>
          {/* sign in button  mobile layout*/}
          <div className="sm:hidden">
            <SignedOut>
              <SignInButton className="bg-red-500 text-white font-semibold rounded-md px-4 py-2" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {/* menu icons */}
          <button
            className="sm:hidden text-4xl  "
            onClick={() => handleMenubar()}
          >
            <HiOutlineMenuAlt1 className="text-[2rem]" />
          </button>
          {/* menu list */}
          <nav
            ref={mobileMenuRef}
            className={`sm:hidden fixed top-0 right-0 h-full w-[60%] bg-white/20 shadow-xl   backdrop-blur-md bg-opacity-30 z-40 
            duration-500 ease-in-out
            transform ${
              toggleMenu
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            {/* close button */}
            <div
              onClick={() => setToggleMenu((prev) => !prev)}
              className="absolute top-2 right-2 cursor-pointer"
            >
              <IoIosClose className="text-5xl font-bold" />
            </div>
            {/* nav items starts here */}
            <ul className="flex flex-col items-center gap-4 font-semibold text-[1.1rem] py-20 ">
              {["Home", "Products", "About", "Contact"].map((item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `activeEffect cursor-pointer ${isActive ? "active" : ""}`
                  }
                >
                  <li>{item}</li>
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
