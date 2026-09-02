import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Our Purpose", path: "#" },
  { name: "Our Training", path: "#" },
  { name: "Locations", path: "#" },
  { name: "Feedback", path: "/feedback" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md ">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Haj Committee"
            className="w-12 h-12 object-contain"
          />

          <div>
            <h2 className="text-lg font-bold text-green-800">
              Karnataka State Haj Committee
            </h2>

            <p className="text-xs text-gray-500">
              Hajj Feedback Portal 2026
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden lg:flex gap-8 ">
          {navLinks.map((item) => (
            <NavLink
              key={Math.random()}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-green-700 font-semibold"
                  : "text-gray-700 hover:text-green-700 duration-300"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}

        <Link
          to="/feedback"
          className="hidden lg:block bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full duration-300"
        >
          Give Feedback
        </Link>

        {/* Mobile Button */}

        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="bg-white border-t lg:hidden">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 border-b hover:bg-green-50"
            >
              {item.name}
            </NavLink>
          ))}

          <div className="p-5">
            <Link
              to="/feedback"
              className="block text-center bg-green-700 text-white py-3 rounded-lg"
            >
              Give Feedback
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;