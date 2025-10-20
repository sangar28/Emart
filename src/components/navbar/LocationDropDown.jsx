import { useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";

const LocationDropDown = ({
  getLocation,
  setLocation,
  dropDown,
  setDropDown,
}) => {
  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };
  const closeDropDown = () => {
    setDropDown(false);
  };

  const downRef = useRef();

  // handle ouside dropdown
  useEffect(() => {
    const handleOutClick = (e) => {
      if (downRef.current && !downRef.current.contains(e.target)) {
        setDropDown(false);
      }
    };
    if (dropDown) document.addEventListener("mousedown", handleOutClick);
    return () => document.removeEventListener("mousedown", handleOutClick);
  });

  const turnOffLocation = () => {
    setLocation(null);
  };

  const handleLocation = () => {
    getLocation();
  };

  return (
    <div ref={downRef}>
      <div onClick={toggleDropDown}>
        <i className="bx bx-caret-down font-semibold text-xl  cursor-pointer "></i>
      </div>
      {dropDown && (
        <div className=" flex  flex-col items-center w-[250px] bg-white rounded-2xl shadow-md  h-max  p-5 text-md absolute top-14 -left-[30px]">
          <span onClick={closeDropDown}>
            <IoIosClose className="font-semibold text-[2rem] absolute top-2 right-3 cursor-pointer" />
          </span>
          <h1 className="font-semibold ">Change Location </h1>
          <div className=" flex gap-2">
            <button
              onClick={() => {
                handleLocation();
                setDropDown(false);
              }}
              className="py-1 px-4  mt-4   text-white text-sm font-semibold bg-red-500 rounded-[30px] cursor-pointer"
            >
              Turn on
            </button>
            <button
              onClick={() => {
                turnOffLocation();
                setDropDown(false);
              }}
              className="py-1 px-4  mt-4   text-white text-sm font-semibold bg-red-500 rounded-[30px] cursor-pointer"
            >
              Turn off
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default LocationDropDown;
