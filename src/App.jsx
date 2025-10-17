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
  const [location, setLocation] = useState();
  const [dropDown, setDropDown] = useState(false);

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
        setDropDown(false);
        // console.log(location);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  const turnOffLocation = () => {
    setLocation(null);
  };

  return (
    <BrowserRouter>
      <Navbar
        location={location}
        getLocation={getLocation}
        dropDown={dropDown}
        setDropDown={setDropDown}
        turnOffLocation={turnOffLocation}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
