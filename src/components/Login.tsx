// src/pages/AuthLayout.tsx
import React, { useEffect, useState } from 'react';
import schoolLogo from '../assets/school-logo.png';
import { login } from '../service/api' // Assuming you have a service for authentication
// import { useAppStore } from '../store/useAppStore';
import { enqueueSnackbar } from "notistack";
import { useAppStore } from '../store/useAppStore';

const Login: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const userAuthenticated = useAppStore((state) => state.userAuthenticated);
  
  const loginUser = async () => {

    await login(userName, password);

    if (!userAuthenticated) {


      setUserName("");
      setPassword("");
    }

}

useEffect(() => {
  if (!userAuthenticated) {

    setUserName("");
    setPassword("");
  }

}, [userAuthenticated]);

    
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
                  <div className="card-header bg-transparent text-center">
                    {/* School Logo */}
                    <img
                      src={schoolLogo}
                      alt="School Logo"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                        marginBottom: "1rem",
                      }}
                    />

                    <h5 className="text-dark mt-2 mb-3">Sign in</h5>            
                  </div>

                </div>
                <div className="card-body px-lg-5 pt-0">
                  <form role="form" className="text-start">
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Email"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
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
                      <button type="button" className="btn btn-primary w-100 my-4 mb-2" onClick={loginUser}>
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

export default Login;
