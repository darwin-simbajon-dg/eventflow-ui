import React from "react";

const FeedCard: React.FC = () => {
  const handleAddEvent = () => {
    // Logic for adding a new event can go here
    alert("Add New Event button clicked!");
  };

  return (
    <div className="feed-list">
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
        <div key={index} className="card h-100 mb-4">
          <div className="card-header d-flex align-items-center border-bottom py-3">
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <a href="#" className="text-dark font-weight-600 text-sm">
                  Event Title {index + 1}
                </a>
                <small className="d-block text-muted">3 days ago</small>
              </div>
            </div>
            <div className="text-end ms-auto">
              <button type="button" className="btn btn-xs btn-primary mb-0">
                <i className="fas fa-plus pe-2"></i> Register
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex">
              <div className="flex-shrink-0">
                <img
                  src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/activity-feed.jpg"
                  alt="activity"
                  className="img-fluid border-radius-lg shadow-lg max-height-500"
                />
              </div>
              <div className="flex-grow-1 ms-4">
                <p className="mb-4">
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