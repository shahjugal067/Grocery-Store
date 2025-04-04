import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Heart,
  HomeIcon,
  LogIn,
  ShoppingBasket,
  ShoppingCart,
  User,
} from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userSlice";
import { logout } from "../../redux/features/Auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";


const Navigation = () => {
  const { userInfo } = useSelector(state =>state.auth)
  const { cartItems } = useSelector(state => state.cart)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ logoutApiCall ] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${showSidebar ? "hidden" : "flex"} 
     lg:flex md:hidden sm:hidden flex-col justify-between p-2 text-white bg-black/80 w-[4%] hover:w-[12%]
    h-[100vh] fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-1"
        >
          <HomeIcon className="w-5 h-5 text-yellow-400 -mr-2 lg:mr-2 mt-[1rem]" />
          <span className="hidden lg:block  mt-[1rem] text-yellow-400">
            Home
          </span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-1"
        >
          <ShoppingBasket className="w-5 h-5 text-yellow-400 -mr-2 lg:mr-2 mt-[1rem]" />
          <span className="hidden lg:inline mt-[1rem] text-yellow-400">
            Shop
          </span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-1"
        >
          <ShoppingCart className="w-5 h-5 text-yellow-400 -mr-2 lg:mr-2 mt-[1rem]" />
          <span className="hidden lg:inline mt-[1rem] text-yellow-400">
            Cart
          </span>
          <div className="absolute top-2">
              {cartItems.length > 0 && (
                <span>
                  <span className="px-1 text-sm bg-pink-500 rounded-full">
                    {cartItems.reduce((a, c)=>a + c.qty,0)}
                  </span>
                </span>
              )}
          </div>
        </Link>
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-1"
        >
          <Heart className="w-5 h-5 text-yellow-400 -mr-2 lg:mr-2 mt-[1rem]" />
          <span className="hidden lg:inline mt-[1rem] text-yellow-400">
            Favorite
          </span>{' '}
          <FavoritesCount />
        </Link>
      </div>
      <div className="relative">
        <button onClick={toggleDropdown} 
        className="flex items-center text-gray-800 focus:outline-none">
          {userInfo ? ( 
            <span className="text-yellow-400">{userInfo.username}</span> 
          ) : ( 
          <>
          <User className="w-5 h-5 text-yellow-400 mr-2 lg:mr-2 mt-[1rem]" />
          </>
          )}
          {userInfo && (
            <ChevronDown className={`h-5 w-5 mt-1 ml-1 cursor-pointer ${dropdownOpen ? "transform rotate-180" : ""}`} />
            
          )}
        </button>
        {dropdownOpen && userInfo && (
          <ul className={`absolute z-50 ml-4 space-y-1 bg-green-700 text-gray-900
          ${!userInfo.isAdmin ? '-top-20' : '-top-80'}`}>
            {userInfo.isAdmin && (
              <>
              <li>
                <Link to='/dashboard' className="block px-4 py-2 hover:bg-gray-200">
                Dashboard
                </Link>
              </li>
              <li>
                <Link to='/productlist' className="block px-4 py-2 hover:bg-gray-200">
                Products
                </Link>
              </li>
              <li>
                <Link to='/categorylist' className="block px-4 py-2 hover:bg-gray-200">
                Category
                </Link>
              </li>
              <li>
                <Link to='/orderlist' className="block px-4 py-2 hover:bg-gray-200">
                Orders
                </Link>
              </li>
              <li>
                <Link to='/userlist' className="block px-4 py-2 hover:bg-gray-200">
                Users
                </Link>
              </li>
              </>
            )}
        <li>
                <Link to='/profile' className="block px-4 py-2 hover:bg-gray-300">
                Profile
                </Link>
              </li>
              <li>
                <Link to='/logout' onClick={logoutHandler}
                className="block px-4 py-2 hover:bg-gray-200">
                Logout
                </Link>
              </li>
          </ul>
        )}
      </div>
      {!userInfo && (
 <ul>
 <li>
   <Link
     to="/login"
     className="flex items-center transition-transform transform hover:translate-x-1"
   >
     <LogIn className="w-5 h-5 text-yellow-400 -mr-2 lg:mr-2 mt-[1rem]" />
     <span className="hidden lg:inline mt-[1rem] text-yellow-400">
       Login
     </span>
   </Link>
 </li>
 <li>
   <Link
     to="/register"
     className="flex items-center transition-transform transform hover:translate-x-1"
   >
     <User className="w-5 h-5 text-yellow-400 -mr-2 lg:mr-2  mt-[1rem]" />
     <span className="hidden lg:inline  mt-[1rem] text-yellow-400">
       Register
     </span>
   </Link>
 </li>
</ul>
      )}
     
    </div>
  );
};

export default Navigation;
