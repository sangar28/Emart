import { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import SignInBtn from "./SignInBtn";

const MobileNav = () => {
  const mobileMenuRef = useRef();

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
        setToggleMenu(false);
      }
    };
    if (toggleMenu) document.addEventListener("mousedown", handleOutClick);
    return () => document.removeEventListener("mousedown", handleOutClick);
  }, [toggleMenu]);

  return (
    <div className="flex gap-6 items-center ">
      {/* cart button moblie layout */}
      <Link to={"/cart"} className="relative sm:hidden">
        <IoCartOutline className="w-6 h-6" />
        <span className="absolute bg-red-500 rounded-full px-[6px] text-[13px]  text-white -top-2 -right-2">
          0
        </span>
      </Link>

      {/* menu icons */}
      <button className="sm:hidden text-4xl  " onClick={() => handleMenubar()}>
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
          onClick={() => setToggleMenu(false)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <IoIosClose className="text-5xl font-bold" />
        </div>
        {/* nav items starts here */}
        <ul className="flex flex-col items-center gap-4 font-semibold text-[1.1rem] py-20 ">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className={({ isActive }) =>
                `activeEffect cursor-pointer ${isActive ? "active" : ""}`
              }
            >
              <li>{item}</li>
            </NavLink>
          ))}
          <SignInBtn />
        </ul>
      </nav>
    </div>
  );
};
export default MobileNav;
