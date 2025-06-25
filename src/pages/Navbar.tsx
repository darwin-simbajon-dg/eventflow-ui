import React from "react";
import { eventBus } from "../service/eventBus";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl z-index-sticky" id="navbarBlur" data-scroll="false">
      <div className="container-fluid py-1 px-3">
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item d-flex align-items-center">
              <a href="#" className="nav-link text-white font-weight-bold px-0" onClick={() => {
                                                      eventBus.emit('updateUI', {
                                                        showLogin: true,
                                                        userAuthenticated: false,
                                                        showProfile: false,
                                                        showEvents: false,
                                                        data: { user: 'Darwin' },
                                                      });
                                                    }}>
                <i className="fa fa-user me-sm-1"></i>
                <span className="d-sm-inline d-none" style={{ position: "absolute", right: "0", marginRight: "20px" }}>Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
