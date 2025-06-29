import React from "react";
// import { eventBus } from "../service/eventBus";
// import { fetchEvents } from "../service/api";
import { useAppStore } from "../store/useAppStore";

interface SidebarProps {
  isOpen: boolean;
  isDesktop: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isDesktop, toggleSidebar }) => {
  const shouldShowSidebar = isDesktop || isOpen;
  const isAdmin = useAppStore((state) => state.isAdmin);
  const showEvents = async () => { 
    useAppStore.getState().setState({
      showProfile: false,
      showEvents: true, 
      showEventForm: false,
      showScanner: false
    });
  };

  const showProfile = async () => { 
    useAppStore.getState().setState({
      showProfile: true,
      showEvents: false, 
      showEventForm: false,
      showScanner: false
    });
  };

  const showScanner = async () => { 
    useAppStore.getState().setState({
      showProfile: false,
      showEvents: false, 
      showEventForm: false,
      showScanner: true
    });
  };


  return (
    <>
      {/* Hamburger Button - visible on small screens */}
      <button
        className="btn btn-primary d-xl-none position-fixed top-0 start-0 m-3"
        onClick={toggleSidebar}
        style={{ zIndex: 1050 }}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Backdrop on mobile/tablet */}
      {!isDesktop && isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1039,
          }}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl fixed-start p-3 shadow ${
          isOpen || isDesktop ? "sidebar-open" : "sidebar-closed"
        }`}
        style={{
          width: "250px",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 1040,
          position: "fixed",
          transition: "transform 0.3s ease-in-out",
          transform: isOpen || isDesktop ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="sidenav-header d-flex justify-content-between align-items-center mb-3">
          <a className="navbar-brand m-0" href="#">
            <span className="ms-1 font-weight-bold">Event Manager</span>
          </a>
          {!isDesktop && (
            <button className="btn btn-link text-dark" onClick={toggleSidebar}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <hr className="horizontal dark mt-0 mb-3" />

        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              data-bs-toggle="collapse"
              href="#accountExamples"
              className="nav-link"
              aria-controls="accountExamples"
              role="button"
              aria-expanded="false"
            >
              <div className="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                <i className="ni ni-settings-gear-65 text-dark text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Account</span>
            </a>

            <div className="collapse" id="accountExamples">
              <ul className="nav ms-4">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={showProfile}
                  >
                    <span className="sidenav-mini-icon">S</span>
                    <span className="sidenav-normal">Profile</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={showEvents}
                    >
                    <span className="sidenav-mini-icon">B</span>
                    <span className="sidenav-normal">Events</span>
                    
                  </a>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={showScanner}
                    >
                    <span className="sidenav-mini-icon">V</span>
                    <span className="sidenav-normal">Scan Invitation</span>
                    
                  </a>
                </li>
                )}
              </ul>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
