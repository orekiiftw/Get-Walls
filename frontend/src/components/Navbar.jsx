import { Link } from 'react-router-dom';
import logo from '../assets/react.svg';
import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-light py-4 md:py-[40px] px-4 md:px-[70px]">
      <div className="flex flex-wrap justify-between items-center">
        {/* Logo and Brand */}
        <div className='flex items-center'>
          <img src={logo} alt="React Logo" className="h-6 md:h-8" />
          <span className='ml-[12px] text-[20px] md:text-[24px] mb-[2px] bg-gradient-to-r from-[#0077b6] to-[#0096c7] text-transparent bg-clip-text'>
            GetWalls
          </span>
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-700 hover:text-gray-900"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full md:block md:w-auto mt-4 md:mt-0`}
        >
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <Link
              to="/api-docs"
              className="no-underline px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition duration-300 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Api Docs
            </Link>
            <Link
              to="/about"
              className="no-underline px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition duration-300 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/about"
              className="no-underline px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition duration-300 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;