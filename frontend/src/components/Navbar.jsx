// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import NavLink from "./NavLink";
import Button from "./Button";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-lg font-bold text-white">
          BlogApp
        </NavLink>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
        <div className={`hidden lg:flex lg:space-x-4`}>
          <NavLink
            to="/blogs"
            className="block mt-4 lg:mt-0 text-white hover:text-gray-400"
          >
            Blogs
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/create-blog"
              className="block mt-4 lg:mt-0 text-white hover:text-gray-400"
            >
              Create Blog
            </NavLink>
          )}
          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className="block mt-4 lg:mt-0 text-white hover:text-gray-400"
              >
                Profile
              </NavLink>
              <Button onClick={logout} className="mx-2">
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block mt-4 lg:mt-0 text-white hover:text-gray-400"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block mt-4 lg:mt-0 text-white hover:text-gray-400"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-gray-800 p-4">
          <NavLink
            to="/blogs"
            className="block mt-4 lg:mt-0 text-white hover:text-gray-400"
            onClick={handleLinkClick}
          >
            Blogs
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/create-blog"
              className="block mt-4 lg:mt-0 text-white hover:text-gray-400"
              onClick={handleLinkClick}
            >
              Create Blog
            </NavLink>
          )}
          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className="block mt-4 lg:mt-0 text-white hover:text-gray-400"
                onClick={handleLinkClick}
              >
                Profile
              </NavLink>
              <Button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block mt-4 lg:mt-0 text-white hover:text-gray-400"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block mt-4 lg:mt-0 text-white hover:text-gray-400"
                onClick={handleLinkClick}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block mt-4 lg:mt-0 text-white hover:text-gray-400"
                onClick={handleLinkClick}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
