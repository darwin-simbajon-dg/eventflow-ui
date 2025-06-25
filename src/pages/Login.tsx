import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow border-0 p-4 mx-auto" style={{ maxWidth: 400 }}>
        <h2 className="text-success text-center mb-4">Login</h2>
        <form>
          <div className="form-group mb-3">
            <input type="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="form-group mb-3">
            <input type="password" className="form-control" placeholder="Password" required />
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;