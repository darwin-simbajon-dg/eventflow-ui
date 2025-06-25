import React from "react";
import { eventBus } from "../service/eventBus";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-main navbar-expand-lg px-3 shadow-none border-radius-xl z-index-sticky bg-dark" id="navbarBlur">
      <div className="container-fluid py-2 d-flex justify-content-between align-items-center">
        {/* Optional: Logo or page title could go here */}

        {/* Right section: Log out */}
        <ul className="navbar-nav d-flex align-items-center ms-auto">
          <li className="nav-item">
            <a
              href="#"
              className="nav-link text-white font-weight-bold d-flex align-items-center"
              onClick={() => {
                eventBus.emit("updateUI", {
                  showLogin: true,
                  userAuthenticated: false,
                  showProfile: false,
                  showEvents: false,
                  data: { user: "Darwin" },
                });
              }}
            >
              <i className="fa fa-user me-1"></i>
              <span className="d-inline">Log out</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
