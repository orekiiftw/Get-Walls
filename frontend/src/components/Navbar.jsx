
import { Link } from 'react-router-dom'; 
import logo from '../assets/react.svg'; 

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light flex flex-row justify-between items-center py-[40px] px-[70px]">
      
      <div className='flex'>
        <img src={logo} alt="React Logo" className="h-8" />
        <span className='ml-[12px] text-[24px] mb-[2px] bg-gradient-to-r from-[#0077b6] to-[#0096c7] text-transparent bg-clip-text'>GetWalls</span>
      </div>

      
      <div className="flex space-x-4">
        <Link
          to="/api-docs"
          className="no-underline px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition duration-300"
        >
          Api Docs
        </Link>
        <Link
          to="/about"
          className="no-underline px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition duration-300"
        >
          About
        </Link>
      <Link
        to="/about"
        className="no-underline px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition duration-300"
      >
        Favorites
      </Link>
      </div>
    </nav>
  );
}

export default Navbar;