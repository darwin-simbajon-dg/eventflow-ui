import React from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import { enqueueSnackbar } from "notistack";
import { useLoading } from "../service/LoadingContextType";
import { useEventSubscriber } from "../service/useEventSubscriber";


const EventsList: React.FC = () => {
  const { setLoading } = useLoading();
  const event = useEventSubscriber();
  const events = event.events || []; // Default to an empty array if events are not available

  const handleAddEvent = () => {
    enqueueSnackbar("Add Event button clicked!", {
      variant: "info"
    });

    //create a delay to simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      enqueueSnackbar("Event added successfully!", { variant: "success" });
    }, 2000); // Simulate a 2-second loading time
};

  return (
    <div className="feed-list container-fluid px-3">
      {/* Admin Add Event Button */}
      <div className="d-flex justify-content-end mb-3">
        {event.isAdmin && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddEvent}
          >
            <i className="fas fa-plus pe-2"></i> Add New Event
          </button>
        )}
      </div>

      {events.map((ev, index) => (
        <div key={index} className="card h-100 mb-4 shadow-sm">
          <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-2 py-3">
            <div>
              <a href="#" className="text-dark fw-bold text-sm">
              {ev.title || "Event Name"}
              </a>
              <small className="d-block text-muted">{ev.createdDate}</small>
            </div>
            <div>
            {event.isStudent && (<button type="button" className="btn btn-sm btn-primary" onClick={() => enqueueSnackbar("Register button clicked!", { variant: "success" })}>
                <i className="fas fa-plus pe-2"></i> Register
              </button>
            )}
            {event.isAdmin && (<button
                type="button"
                className="btn btn-sm btn-danger ms-2"
                onClick={() => enqueueSnackbar("Delete button clicked!", { variant: "error" })}
              >
                <i className="fas fa-trash pe-2"></i> Delete
              </button>
            )}
             {event.isAdmin && ( <button
                type="button"
                className="btn btn-sm btn-warning ms-2"
                onClick={() => enqueueSnackbar("Edit button clicked!", { variant: "info" })}
              >
                <i className="fas fa-edit pe-2"></i> Edit
              </button>)}
            </div>
          </div>

          {/* Card Body */}
          <div className="card-body">
            <div className="row g-3">
              {/* Image */}
              <div className="col-12 col-md-4">
                <img
                  src={ev.imageUrl || "https://via.placeholder.com/300"}                   
                  alt="activity"
                  className="img-fluid border-radius-lg shadow-sm w-100"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
              {/* Text */}
              <div className="col-12 col-md-8">
                <p className="mb-0">
                  {ev.description} 
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsList;
