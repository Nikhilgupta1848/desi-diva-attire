import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
   localStorage.removeItem('token')
   setToken('')
   setCartItems({})
   

  }
  return (
    <div className="flex items-center justify-between py-6 font-medium relative z-20">
      {/* Logo */}
      <Link to="/" className="w-40 sm:w-60">
        <img src={assets.logo} alt="Logo" />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-md text-gray-700">
        {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item, index) => (
          <NavLink
            key={index}
            to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
            className="flex flex-col items-center gap-1"
          >
            <p>{item}</p>
            <hr className="w-2/4 border-none h-[2.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Search Icon */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-4 sm:w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile Icon */}
        <div className="group relative">
            <img
            onClick={()=> token ? null : navigate('/login')}
              className="w-4 sm:w-5 cursor-pointer z-10"
              src={assets.profile_icon}
              alt="Profile"
            />
          {/* dropdown menu  */}
          {token && 
          <div className="hidden group-hover:block absolute dropdown-menu top-8 right-0 pt-4 ">
            <div className="flex flex-col gap-2 w-36 sm:w-36 py-3 px-4 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-4 sm:w-5 min-w-4 sm:min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-4 sm:w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Sidebar for Small Screens */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        } z-50 overflow-hidden`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>
          {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item, index) => (
            <NavLink
              key={index}
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
