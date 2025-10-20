import { Link } from "react-router-dom";
import Location from "./Location";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
// component starts here
const Navbar = () => {
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
            <Location location={location} />
          </div>
          {/* menu section */}
          <DesktopNav />
        </div>

        {/* mobile layout */}
        <MobileNav />
      </div>
    </header>
  );
};
export default Navbar;
