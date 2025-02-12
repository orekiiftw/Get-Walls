import { LuTwitter } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";
import { LuGithub } from "react-icons/lu";
import logo from '../assets/react.svg';
function Footer() {
  return (
    <footer className="flex flex-row justify-between px-[50px] py-[40px] shadow-[0px_4px_10px_gray] ">
      <div className="flex flex-row">
        <LuTwitter className="w-6 h-6 mr-5 hover:text-blue-400 cursor-pointer"/>
        <LuInstagram className="w-6 h-6 mr-5 hover:text-pink-500 cursor-pointer"/>
        <LuGithub className="w-6 h-6 hover:text-gray-600 cursor-pointer"/>
      </div>
      <div>
        <img src={logo} alt="React Logo" className="h-8" />
      </div>
      <div>
        <h4>Thank you</h4>
      </div>
    </footer>
  );
}

export default Footer;