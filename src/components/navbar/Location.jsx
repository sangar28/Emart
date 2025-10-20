import { useEffect, useState } from "react";
import axios from "axios";
import LocationDropDown from "./LocationDropDown";

const Location = () => {
  const [dropDown, setDropDown] = useState(false);
  const [location, setLocation] = useState(() => {
    try {
      const item = localStorage.getItem("location");
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  // getlocation section

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      // console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        // console.log(exactLocation);
        setLocation(exactLocation);
        // console.log(location);
      } catch (error) {
        throw new error("unable to find the location", error);
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("location", JSON.stringify(location));
  }, [location]);

  return (
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
      {/* dropDown button  */}

      <LocationDropDown
        getLocation={getLocation}
        setLocation={setLocation}
        dropDown={dropDown}
        setDropDown={setDropDown}
      />
    </div>
  );
};
export default Location;
