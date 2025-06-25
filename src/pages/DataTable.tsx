import React from "react";

const DataTable: React.FC = () => {
  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table align-items-center mb-0">
          <thead>
            <tr>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Function</th>
              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Technology</th>
              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th>
              <th className="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "John Michael", email: "john@creative-tim.com", role: "Manager", dept: "Organization", status: "Online", date: "23/04/18" },
              { name: "Alexa Liras", email: "alexa@creative-tim.com", role: "Programator", dept: "Developer", status: "Offline", date: "11/01/19" }
            ].map((user, idx) => (
              <tr key={idx}>
                <td>
                  <div className="d-flex px-2 py-1">
                    <div>
                      <img src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-2.jpg" className="avatar avatar-sm me-3" alt="avatar" />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="mb-0 text-xs">{user.name}</h6>
                      <p className="text-xs text-secondary mb-0">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="text-xs font-weight-bold mb-0">{user.role}</p>
                  <p className="text-xs text-secondary mb-0">{user.dept}</p>
                </td>
                <td className="align-middle text-center text-sm">
                  <span className={`badge badge-sm badge-${user.status === "Online" ? "success" : "secondary"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">{user.date}</span>
                </td>
                <td className="align-middle">
                  <a href="#" className="text-secondary font-weight-bold text-xs">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
