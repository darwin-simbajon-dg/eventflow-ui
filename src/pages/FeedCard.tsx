import React from "react";
import { enqueueSnackbar } from "notistack";

const FeedCard: React.FC = () => {
  const handleAddEvent = () => {
    enqueueSnackbar("Add Event button clicked!", {
      variant: "info"
    });
};

  return (
    <div className="feed-list container-fluid px-3">
      {/* Admin Add Event Button */}
      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddEvent}
        >
          <i className="fas fa-plus pe-2"></i> Add New Event
        </button>
      </div>

      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="card h-100 mb-4 shadow-sm">
          {/* Card Header */}
          <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-2 py-3">
            <div>
              <a href="#" className="text-dark fw-bold text-sm">
                Event Title {index + 1}
              </a>
              <small className="d-block text-muted">3 days ago</small>
            </div>
            <div>
              <button type="button" className="btn btn-sm btn-primary" onClick={() => enqueueSnackbar("Register button clicked!", { variant: "success" })}>
                <i className="fas fa-plus pe-2"></i> Register
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="card-body">
            <div className="row g-3">
              {/* Image */}
              <div className="col-12 col-md-4">
                <img
                  src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/activity-feed.jpg"
                  alt="activity"
                  className="img-fluid border-radius-lg shadow-sm w-100"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
              {/* Text */}
              <div className="col-12 col-md-8">
                <p className="mb-0">
                  Personal profiles are the perfect way for you to grab
                  attention and persuade readers why they should work with you.
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedCard;
