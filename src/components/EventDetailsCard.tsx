import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { deleteEvent, register } from '../service/api';
import { useAppStore } from '../store/useAppStore';
import QRCode from 'react-qr-code';


interface EventDetailsCardProps {
  eventId: string; // Assuming eventId is passed as a prop
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
  qrValue?: string; // QR code value, if applicable
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({
  eventId, // Assuming eventId is passed as a prop
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
// const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
// const [registered, setRegistered] = useState(isRegistered);



  const handleRegister = (eventId: string) => async () => {
      if (userData?.userId) {  
        // const qrCodeValue = `${eventId}:${userData.userId}`;
        register(userData.userId, eventId);

        // setRegistered(true);
        // setQrValue(`${eventId}:${userData.userId}`); 
    };
  }

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
   
  }

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
  }

  return (
    <main className="main-content">
      <div className="card mb-4 shadow-sm border-radius-lg overflow-hidden">
        <div className="position-relative">
          <img
            src={imageUrl || "https://dummyimage.com/1280x720/fff/aaa"}
            alt="Event Poster"
            className="w-100"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
          <div className="position-absolute top-0 end-0 p-3 d-flex flex-column align-items-end">
            {isStudent && !isRegistered && (
              <button
            type="button"
            className="btn btn-sm btn-primary mb-2"
            onClick={handleRegister(eventId)} // Replace with actual event ID
              >
            <i className="fas fa-plus pe-2"></i> Register
              </button>
            )}
            {isStudent && isRegistered && attended && (
              <span className="badge bg-info mb-2">
            <i className="fas fa-clipboard-user me-1"></i> Attended
              </span>
            )}
            {isStudent &&  isRegistered && !attended &&(
              <span className="badge bg-success mb-2">
            <i className="fas fa-check-circle me-1"></i> Registered
              </span>
            )}
             {isStudent && isRegistered && qrValue && (
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
              <button
            type="button"
            className="btn btn-sm btn-danger mb-2"       
            onClick={handleDeleteEvent(eventId)} // Replace with actual event ID
              >
            <i className="fas fa-trash pe-2"></i> Delete
              </button>
            )}
            {isAdmin && (
              <button
            type="button"
            className="btn btn-sm btn-warning"
            onClick={handleEditEvent(eventId)} // Replace with actual event ID
              >
            <i className="fas fa-edit pe-2"></i> Edit
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="card-body">
          <h4 className="text-dark font-weight-bold">{title}</h4>
          <h5 className="text-dark font-weight-bold">{headline}</h5>
          <p className="text-sm text-muted">{description}</p>

          <p className="text-sm">
            <strong>Date:</strong> {date}<br />
            <strong>Venue:</strong> {venue}<br />
            <strong>Time:</strong> {time}
          </p>

          <p className="text-sm text-secondary">
           {notes}
          </p>

          <a href={link} className="btn btn-sm btn-info mt-2">
            <i className="fas fa-arrow-right me-2"></i> Read More
          </a>       
        </div>
      </div>
    </main>
  );
};

export default EventDetailsCard;
