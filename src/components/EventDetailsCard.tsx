//import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { deleteEvent, register } from '../service/api';
import { useAppStore } from '../store/useAppStore';
import QRCode from 'react-qr-code';
import React, { useState } from 'react';

interface EventDetailsCardProps {
  eventId: string;
  title: string;
  description: string;
  headline: string;
  notes: string;
  date: string;
  venue: string;
  time: string;
  imageUrl?: string;
  link?: string;
  isStudent: boolean;
  isAdmin: boolean;
  isRegistered: boolean;
  attended: boolean;
  qrValue?: string;
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({
  eventId,
  title,
  description,
  date,
  venue,
  headline,
  notes,
  time,
  imageUrl = "https://via.placeholder.com/800x400",
  link = "#",
  isStudent,
  isAdmin,
  isRegistered,
  attended,
  qrValue
}) => {
  const userData = useAppStore((state) => state.userData);
  const [showMore, setShowMore] = useState(false);

  const handleRegister = (eventId: string) => async () => {
    if (userData?.userId) {
      register(userData.userId, eventId);
    }
  };

  const handleDeleteEvent = (eventId: string) => async () => {
    useAppStore.getState().openModal({
      title: "Delete Event",
      message: "Are you sure you want to delete this event?",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      showCancel: true,
      onConfirm: () => {
        deleteEvent(eventId);
        console.log("Event deleted");
      }
    });
  };

  const handleEditEvent = (eventId: string) => async () => {
    useAppStore.getState().setState({
      selectedEvent: {
        eventId,
        title,
        description,
        headline,
        notes,
        date,
        venue,
        time,
        imageUrl,
        link,
      },
      showEventForm: true,
      showEvents: false,
      isEdit: true
    });
  };

  return (
    <main className="main-content">
      <div
        className={`card mb-4 shadow-sm border-radius-lg overflow-hidden ${attended ? 'bg-success text-white' : ''
          }`}
      >
        <div className="position-relative">
          <img
            src={imageUrl}
            alt="Event Poster"
            className="w-100"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
          <div className="position-absolute top-0 end-0 p-3 d-flex flex-column align-items-end">
            {isStudent && !isRegistered && (
              <button
                type="button"
                className="btn btn-sm btn-primary mb-2"
                onClick={handleRegister(eventId)}
              >
                <i className="fas fa-plus pe-2"></i> Register
              </button>
            )}

            {isStudent && isRegistered && attended && (
              <span className="badge bg-info mb-2">
                <i className="fas fa-clipboard-user me-1"></i> Attended
              </span>
            )}

            {isStudent && isRegistered && !attended && (
              <span className="badge bg-success mb-2">
                <i className="fas fa-check-circle me-1"></i> Registered
              </span>
            )}

            {isStudent && isRegistered && qrValue && !attended && (
              <div
                className="position-absolute mt-2"
                style={{
                  top: '90px',
                  right: '12px',
                  background: 'white',
                  padding: '4px',
                  borderRadius: '8px',
                  zIndex: 5,
                }}
              >
                <QRCode value={qrValue} size={200} />
              </div>
            )}

            {isAdmin && (
              <>
                <button
                  type="button"
                  className="btn btn-sm btn-danger mb-2"
                  onClick={handleDeleteEvent(eventId)}
                >
                  <i className="fas fa-trash pe-2"></i> Delete
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-warning"
                  onClick={handleEditEvent(eventId)}
                >
                  <i className="fas fa-edit pe-2"></i> Edit
                </button>
              </>
            )}
          </div>
        </div>

        <div className="card-body">
          <h4 className="font-weight-bold">{title}</h4>
          <h5 className="font-weight-bold">{headline}</h5>
          <p className="text-sm">{description}</p>

          <p className="text-sm">
            <strong>Date:</strong> {date}<br />
            <strong>Venue:</strong> {venue}<br />
            <strong>Time:</strong> {time}
          </p>

          <p className="text-sm">{notes}</p>

          {/* Uncomment if you want to show the link button*/}
          {/*<a href={link} className={`btn btn-sm ${attended ? 'btn-light' : 'btn-info'} mt-2`}>
            <i className="fas fa-arrow-right me-2"></i> Read More
          </a>*/}

          <button
            className="btn btn-sm btn-info mt-2"
            onClick={() => setShowMore(!showMore)}
          >
            <i className="fas fa-arrow-right me-2"></i> {showMore ? 'Show Less' : 'Read More'}
          </button>

          {showMore && (
            <div className="mt-4 p-3 bg-white text-dark border rounded shadow-sm">
              <h5 className="text-primary fw-bold mb-2">Why Should You Join?</h5>
              <p>
                ✨ This is more than just an event — it's a chance to grow, network, and be inspired. <br />
                🧠 Learn from professionals, ask questions, and get firsthand experience that textbooks can't provide.<br />
                🤝 Meet fellow students and industry experts who share your passion and drive.<br />
                🎯 Whether you're aiming to enhance your skills or just want to explore new opportunities, this is your moment!
              </p>
              <blockquote className="blockquote text-success fst-italic mt-3">
                “Opportunities don’t happen. You create them.”
              </blockquote>
              <p className="mt-2 mb-0">Don’t miss out. Be part of something meaningful.</p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
};

export type { EventDetailsCardProps };
export default EventDetailsCard;
