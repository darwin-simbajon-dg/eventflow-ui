import React from "react";
import { useAppStore } from "../store/useAppStore";
import EventListWrapper from "../components/EventListWrapper"; // ✅ correct path
import type { EventDetailsCardProps } from "../components/EventDetailsCard";

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
      notes: 'Bring your ID for entry.',
      date: '',
      venue: '',
      time: '',
      imageUrl: '',
      link: '',
    };

    useAppStore.getState().setState({
      selectedEvent: defaultEvent,
      showEventForm: true,
      showEvents: false,
      isEdit: false,
    });
  };

  const formattedEvents: EventDetailsCardProps[] = events.map((ev) => ({
    eventId: ev.id,
    title: ev.title,
    description: ev.description,
    headline: ev.headline,
    notes: ev.notes,
    date: ev.date,
    venue: ev.venue,
    time: ev.time,
    imageUrl: ev.imageUrl,
    link: `/event-details/${ev.id}`,
    isStudent,
    isAdmin,
    isRegistered: ev.isRegistered,
    attended: ev.attended,
    qrValue: ev.isRegistered
      ? JSON.stringify({
          eventId: ev.id,
          userId: useAppStore.getState().userData?.userId,
        })
      : undefined,
  }));

  return (
    <div className="feed-list container-fluid px-3">
      {isAdmin && (
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary" onClick={handleAddEvent}>
            <i className="fas fa-plus pe-2"></i> Add New Event
          </button>
        </div>
      )}

      <EventListWrapper events={formattedEvents} />
    </div>
  );
};

export default EventsList;
