import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import SignInBtn from "./SignInBtn";

const DesktopNav = () => {
  return (
    <nav className="sm:flex gap-10 items-center hidden">
      <ul className="flex gap-7 items-center text-[1rem] font-semibold ">
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
      </ul>
      {/* cart button */}
      <Link to={"/cart"} className="relative">
        <IoCartOutline className="w-6 h-6" />
        <span className="absolute bg-red-500 rounded-full px-[6px] text-white text-[13px] -top-2 -right-2">
          0
        </span>
      </Link>
      <SignInBtn />
    </nav>
  );
};
export default DesktopNav;
