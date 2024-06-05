// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import NavLink from "./NavLink";
import Button from "./Button";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-lg font-bold">
          BlogApp
        </NavLink>
        <div>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/create-blog">Create Blog</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <Button onClick={logout} className="mx-2">
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
