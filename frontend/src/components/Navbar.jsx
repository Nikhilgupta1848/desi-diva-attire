import { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  const handleDropdownToggle = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleDropdownClose = (e) => {
    if (
      e.target.closest('.dropdown-menu') ||
      e.target.closest('.profile-icon') ||
      e.target.closest('.profile-dropdown')
    ) return;
    setDropdownVisible(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    document.addEventListener('click', handleDropdownClose);
    return () => document.removeEventListener('click', handleDropdownClose);
  }, []);

  // Removed the previous useEffect that redirected to login if no token

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
        <div
          className="relative profile-icon"
          onMouseEnter={() => setDropdownVisible(true)} // Show dropdown on hover
        >
          <img
            onClick={handleDropdownToggle}
            className="w-4 sm:w-5 cursor-pointer z-10"
            src={assets.profile_icon}
            alt="Profile"
          />
          {/* Dropdown Menu */}
          <div
            className={`profile-dropdown absolute top-8 right-0 w-36 py-3 px-4 bg-slate-100 text-gray-500 rounded shadow-lg ${dropdownVisible ? 'block' : 'hidden'}`}
          >
            {token ? (
              // If token exists (user is logged in)
              <>
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => {
                    setDropdownVisible(false);
                    navigate('/orders');
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={() => {
                    setDropdownVisible(false);
                    logout();
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </>
            ) : (
              // If no token (user is not logged in)
              <p
                onClick={() => {
                  setDropdownVisible(false);
                  navigate('/login'); // Redirect to login/signup page
                }}
                className="cursor-pointer hover:text-black"
              >
                Login / Sign Up
              </p>
            )}
          </div>
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
        className={`fixed top-0 right-0 bottom-0 bg-white transition-all ${visible ? 'w-full' : 'w-0'} z-50 overflow-hidden`}
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