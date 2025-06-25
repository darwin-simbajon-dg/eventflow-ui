// src/pages/AuthLayout.tsx
import React from 'react';
import { eventBus } from '../service/eventBus';

const AuthLayout: React.FC = () => {
  return (
    <main className="main-content main-content-bg mt-0">
      <div
        className="page-header min-vh-100"
        style={{
          backgroundImage:
            "url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-basic.jpg')",
        }}
      >
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-7">
              <div className="card border-0 mb-0">
                <div className="card-header bg-transparent">
                  <h5 className="text-dark text-center mt-2 mb-3">Sign in</h5>
                  <div className="btn-wrapper text-center">
                    {/* <button className="btn btn-neutral btn-icon btn-sm mb-0">
                      <img
                        className="w-30"
                        src="/assets/img/logos/github.svg"
                        alt="github"
                      />
                      Github
                    </button>
                    <button className="btn btn-neutral btn-icon btn-sm mb-0">
                      <img
                        className="w-30"
                        src="/assets/img/logos/google.svg"
                        alt="google"
                      />
                      Google
                    </button> */}
                  </div>
                </div>
                <div className="card-body px-lg-5 pt-0">
                  {/* <div className="text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div> */}
                  <form role="form" className="text-start">
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Email"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                      />
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <div className="text-center">
                      <button type="button" className="btn btn-primary w-100 my-4 mb-2" onClick={() => {
                        eventBus.emit('updateUI', {
                          showLogin: false,
                          userAuthenticated: true,
                          data: { user: 'Darwin' },
                        });
                      }}>
                        Log in
                      </button>
                    </div>
                    <div className="mb-2 position-relative text-center">
                      <p className="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">
                        or
                      </p>
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn bg-gradient-dark w-100 mt-2 mb-4"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </main>
  );
};

export default AuthLayout;
