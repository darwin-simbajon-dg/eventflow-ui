import React from "react";

const Configurator: React.FC = () => {
  return (
    <div className="fixed-plugin">
      {/* <a className="fixed-plugin-button text-dark position-fixed px-3 py-2">
        <i className="fa fa-cog py-2"></i>
      </a> */}
      <div className="card shadow-lg">
        <div className="card-header pb-0 pt-3 bg-transparent">
          <div className="float-start">
            <h5 className="mt-3 mb-0">Configurator</h5>
            <p>See our dashboard options.</p>
          </div>
          <div className="float-end mt-4">
            <button className="btn btn-link text-dark p-0 fixed-plugin-close-button">
              <i className="fa fa-close"></i>
            </button>
          </div>
        </div>
        <hr className="horizontal dark my-1" />
        <div className="card-body pt-sm-3 pt-0 overflow-auto">
          <div>
            <h6 className="mb-0">Sidebar Colors</h6>
            <div className="badge-colors my-2 text-start">
              {["primary", "dark", "info", "success", "warning", "danger"].map(color => (
                <span key={color} className={`badge filter bg-gradient-${color} mx-1`} data-color={color}></span>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <h6 className="mb-0">Sidenav Type</h6>
            <p className="text-sm">Choose between 2 different sidenav types.</p>
            <div className="d-flex">
              <button className="btn bg-gradient-primary w-100 px-3 mb-2 active me-2">White</button>
              <button className="btn bg-gradient-primary w-100 px-3 mb-2">Dark</button>
            </div>
          </div>
          <div className="d-flex my-3">
            <h6 className="mb-0">Navbar Fixed</h6>
            <div className="form-check form-switch ps-0 ms-auto my-auto">
              <input className="form-check-input mt-1 ms-auto" type="checkbox" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
