import React from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import { useAppStore } from "../store/useAppStore";
import EventDetailsCard from "../components/EventDetailsCard";

const EventsList: React.FC = () => {
 const events = useAppStore((state) => state.events);
 const isAdmin = useAppStore((state) => state.isAdmin);
 const isStudent = useAppStore((state) => state.isStudent);

  const handleAddEvent = () => {
  
    const defaultEvent = {
      eventId: '',
      title: '',
      description: '',
      headline: '',
      notes: 'Don\'t forget your ID for verification. See you there!',
      date: '',
      location: '',
      time: '',
      imageUrl: '',
      link: '',
    };

    useAppStore.getState().setState({
      selectedEvent: defaultEvent,
      showEventForm: true,
      showEvents: false,
      isEdit: false
    });
};

  return (
    <div className="feed-list container-fluid px-3">
      {/* Admin Add Event Button */}
      <div className="d-flex justify-content-end mb-3">
        {isAdmin && (
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
        <EventDetailsCard
          eventId={ev.id}
          key={index}
          title={ev.title || "Event Title"}
          description={ev.description || "No description available."}
          date={ev.date || "TBD"}
          headline= {ev.headline || ""}
          notes={ev.notes || "Don't forget your ID for verification. See you there!"}
          venue={ev.venue || "TBD"}
          time={ev.time || "TBD"}
          imageUrl={ev.imageUrl}
          link={`/event-details/${ev.id}`}
          isStudent={isStudent}
          isAdmin={isAdmin}
          isRegistered={ev.isRegistered}
          attended={ev.attended}
          qrValue={
            ev.isRegistered
              ? JSON.stringify({
                  eventId: ev.id,
                  userId: useAppStore.getState().userData?.userId,
                })
              : undefined
          }
        />
      ))}
      
    </div>
  );
};

export default EventsList;
