import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-green-900 text-white ">
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-4 md:grid-cols-2 gap-10">

        {/* About */}

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Karnataka State Haj Committee
          </h2>

          <p className="text-gray-300 leading-7">
            Dedicated to serving Haj pilgrims through guidance,
            training and continuous improvement of Haj services.
          </p>
        </div>

        {/* Links */}

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <div className="space-y-3">

            <Link to="/">Home</Link><br />

            <Link to="#">Purpose</Link><br />

            <Link to="#">Training</Link><br />

            <Link to="#">Locations</Link><br />

            <Link to="/feedback">Feedback</Link>

          </div>
        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex gap-3">
              <FaMapMarkerAlt className="mt-1" />
              <span>Bengaluru, Karnataka</span>
            </div>

            <div className="flex gap-3">
              <FaPhone className="mt-1" />
              <span>+91 XXXXX XXXXX</span>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="mt-1" />
              <span>info@hajcommittee.in</span>
            </div>

          </div>

        </div>

        {/* Social */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-5 text-2xl">

            <FaFacebook className="cursor-pointer hover:text-yellow-400 duration-300"/>

            <FaInstagram className="cursor-pointer hover:text-yellow-400 duration-300"/>

            <FaYoutube className="cursor-pointer hover:text-yellow-400 duration-300"/>

          </div>

        </div>

      </div>

      <div className="border-t border-green-700 py-5 text-center text-gray-300">
        © {new Date().getFullYear()} Karnataka State Haj Committee • All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;