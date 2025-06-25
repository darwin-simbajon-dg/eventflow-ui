import React from "react";
import { eventBus } from "../service/eventBus";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4">
      <div className="sidenav-header">
        <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <a className="navbar-brand m-0" href="https://demos.creative-tim.com/argon-dashboard-pro/pages/dashboards/default.html" target="_blank" rel="noreferrer">
          <span className="ms-1 font-weight-bold">Event Manager</span>
        </a>
      </div>
      <hr className="horizontal dark mt-0" />
      <div className="collapse navbar-collapse w-auto h-auto" id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a data-bs-toggle="collapse" href="#accountExamples" className="nav-link" aria-controls="accountExamples" role="button" aria-expanded="false">
              <div className="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                <i className="ni ni-settings-gear-65 text-dark text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Account</span>
            </a>
            <div className="collapse" id="accountExamples">
              <ul className="nav ms-4">
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => {
                                        eventBus.emit('updateUI', {
                                          showLogin: false,
                                          userAuthenticated: true,
                                          showProfile: true,
                                          showEvents: false,
                                          data: { user: 'Darwin' },
                                        });
                                      }}>
                    <span className="sidenav-mini-icon">S</span>
                    <span className="sidenav-normal">Profile</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => {
                                        eventBus.emit('updateUI', {
                                          showLogin: false,
                                          userAuthenticated: true,
                                          showProfile: false,
                                          showEvents: true,
                                          data: { user: 'Darwin' },
                                        });
                                      }}>
                    <span className="sidenav-mini-icon">B</span>
                    <span className="sidenav-normal">Events</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
