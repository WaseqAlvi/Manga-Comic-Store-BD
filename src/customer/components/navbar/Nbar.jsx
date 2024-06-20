import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { Navigate, useNavigate } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProductCard from "../ProductCard";
import { useState } from "react";
import useLocalStorageUser from "../useLocalStorageUser";
const Nbar = ({ loggedIn, Premier, setLoggedIn, setPremier, admin_status }) => {
  //         const getUser = () => {
  //           const userString = localStorage.getItem('user');
  //           return userString ? JSON.parse(userString) : null;
  //         };

  // const [user, setUser] = useState(getUser());

  const admin = localStorage.getItem("admin");

  const [input, setinput] = React.useState("");

  // const admin = localStorage.getItem('admin')

  // const [input, setinput] = React.useState('');

  const [result, setresult] = React.useState([]);

  console.log("admin", admin);

  const navigate = useNavigate();

  function SignOut() {
    admin_status(false);
    setLoggedIn(false);
    setPremier(false);
    localStorage.setItem("LOGIN", false);
    localStorage.setItem("admin", false);
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("USER_PREMIER", false);
    navigate("/customerView");
  }

  // const { user, setUser, clearUser } = useLocalStorageUser();
  const fetchData = (value) => {
    fetch("http://localhost:8080/products/getAll")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((product) => {
          return (
            product &&
            product.productName.toLowerCase().includes(value.toLowerCase())
          );
        });
        console.log(results);
        setresult(results);

        // Logging inside this scope to access the filtered results
        // Perform further actions with 'results' here, if needed
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value) => {
    setinput(value);
    fetchData(value);
  };

  return (
    <nav className="bg-black text-white flex justify-between items-center px-20 py-6">
      {/* Logo */}
      <div className="ml-4 flex lg:ml-0 lg:items-center ">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <Link to="/customerView">
                    <img
                      className="  pb-3 rounded-full h-20 w-18 flex items-center justify-center "
                      
                      src="https://seeklogo.com/images/M/Manga-logo-000566115A-seeklogo.com.png"
                      alt=""
                    />
                  </Link>
                </a>
              </div>

      {admin === "true" ? (
        <div>
          <Link to={"/faq_admin"}>FAQ Admin</Link>
        </div>
      ) : (
        <div>
          <Link to={"/faq"}>FAQ</Link>
        </div>
      )}

      {/* CART */}
      <Link to="/Cart" className="group -m-2 flex items-center p-2">
        <svg
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 1.92 1.61h10.8a2 2 0 0 0 1.92-1.61L23 6H6" />
        </svg>
        {/* You can replace the static '0' with the actual count of items in the cart */}
        {/* <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
        0
      </span> */}
        <span className="sr-only">items in cart, view bag</span>
      </Link>
      {/* CART */}

      

      <div className="flex flex-wrap justify-center">
        <input
          placeholder="Search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className="bg-gray-200 px-3 py-1 rounded-md focus:outline-none text-black"
        />
        

        {/* {result.length >1 && result.length <4
          ? result.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : input && (
              <p className="text-center text-xl text-gray-600 mt-4">
                No products found
              </p>
            )} */}
        <div className="flex flex-col items-center w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50"></thead>
            <tbody>
              {result.length > 1 && result.length < 4
                ? result.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))
                : ""}
            </tbody>
          </table>
        
        </div>
      </div>
      <Link to="/wishlist" className="group -m-2 flex items-center p-2">
        <FavoriteIcon />
      </Link>
      {/* Left section */}
      <div className="flex items-center space-x-4">
        {/* Display GO PRO button if not a Premier user and logged in */}
        {!Premier && loggedIn && (
          <Link
            to={`/PRO/`}
            className="px-4 py-2 hover:bg-gray-700 bg-blue-500 text-white rounded-md transition duration-300 ease-in-out"
          >
            GO PRO
          </Link>
        )}

        {/* Display message for Premier users with enhanced styling */}
        {loggedIn && Premier && (
          <p className="text-yellow-500 font-semibold">PREMIUM</p>
        )}

        {/* Buttons/Links based on login status */}
        {loggedIn ? (
          <>
            {/* <p>HELLO</p> */}
            <Link to="/userProfile">
              <Button className="bg-gray-900">Hello! </Button>
            </Link>
            <Button onClick={SignOut}>SignOut</Button>
          </>
        ) : (
          <>
            <Link to="/addUsers">REGISTER</Link>
            <Link to="/loginUser">Login</Link>
          </>
        )}

        {admin === "true" && (
          <>
            <Link to={"/admin"}>ADMIN PANEL</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nbar;
