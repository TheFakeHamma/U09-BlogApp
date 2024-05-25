// eslint-disable-next-line no-unused-vars
import React from "react";
import NavLink from "./NavLink";
import Button from "./Button";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-lg font-bold">
          BlogApp
        </NavLink>
        <div>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/create-blog">Create Blog</NavLink>
          {token ? (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="mx-2"
              >
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
