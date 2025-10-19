import "boxicons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Cart from "./pages/Cart";
import axios from "axios";

const App = () => {
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
        console.log(exactLocation);
        setLocation(exactLocation);
        setDropDown(false);
        // console.log(location);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleLocation = () => {
    getLocation();
  };

  useEffect(() => {
    localStorage.setItem("location", JSON.stringify(location));
  }, [location]);

  const turnOffLocation = () => {
    setLocation(null);
  };

  return (
    <BrowserRouter>
      <Navbar
        location={location}
        dropDown={dropDown}
        setDropDown={setDropDown}
        turnOffLocation={turnOffLocation}
        handleLocation={handleLocation}
      />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
