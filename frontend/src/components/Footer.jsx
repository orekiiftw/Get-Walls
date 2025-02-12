import { LuTwitter } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";
import { LuGithub } from "react-icons/lu";
import logo from '../assets/react.svg';

function Footer() {
  return (
    <footer className="px-4 md:px-[50px] py-6 md:py-[40px] shadow-[0px_4px_10px_gray]">
      <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
        {/* Social Icons */}
        <div className="flex flex-row">
          <LuTwitter className="w-5 h-5 md:w-6 md:h-6 mr-5 hover:text-blue-400 cursor-pointer"/>
          <LuInstagram className="w-5 h-5 md:w-6 md:h-6 mr-5 hover:text-pink-500 cursor-pointer"/>
          <LuGithub className="w-5 h-5 md:w-6 md:h-6 hover:text-gray-600 cursor-pointer"/>
        </div>

        {/* Logo */}
        <div className="order-first md:order-none">
          <img src={logo} alt="React Logo" className="h-6 md:h-8" />
        </div>

        {/* Thank you text */}
        <div>
          <h4 className="text-sm md:text-base">Thank you</h4>
        </div>
      </div>
    </footer>
  );
}

export default Footer;