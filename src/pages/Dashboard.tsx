import React, { useState, useEffect } from 'react';
import Sidebar from '../pages/Sidebar';
import Navbar from '../pages/Navbar';
import { useEventSubscriber } from '../service/useEventSubscriber';
import Configurator from '../pages/Configurator';
import ProfileCard from './Profile';
import EventsList from './EventsList';
import { eventBus, type EventPayload } from '../service/eventBus';
import { fetchEvents } from '../service/api';
import { useLoading } from "../service/LoadingContextType";
import { useSignalR } from '../service/useSignalR';
import { enqueueSnackbar } from "notistack";


const DashboardPage: React.FC = () => {
  const event = useEventSubscriber();
  const { setLoading } = useLoading();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);

  useSignalR("http://localhost:5064/hub/notifications", (message) => {
    enqueueSnackbar("Events is updated", {
          variant: "info"
        });

    const data = JSON.parse(message);

    console.log("Received data from SignalR:", data);

    const mappedEvents = data.map((event: any, index: number) => ({
      id: event.id ?? index.toString(),
      title: event.title,
      description: event.description,
      createdDate: event.createdDate, // custom formatter, or just event.createdAt
      imageUrl: event.imageUrl ?? "https://dummyimage.com/1280x720/fff/aaa",
    }));

    eventBus.emit({ events: [...mappedEvents] }); // As

  });

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();

        const mappedEvents = fetchedEvents.map((event: any, index: number) => ({
          id: event.id ?? index.toString(),
          title: event.title,
          description: event.description,
          createdDate: event.createdDate, // custom formatter, or just event.createdAt
          imageUrl: event.imageUrl ?? "https://dummyimage.com/1280x720/fff/aaa",
        }));

        eventBus.emit({ events: mappedEvents }); // Assuming isAdmin is true for this example});
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    loadEvents();
  
  }, []);

  useEffect(() => {
    if (event.loading !== undefined) {
      setLoading(event.loading);
    }
  }, [event.loading]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="g-sidenav-show bg-gray-100">
      <div className="min-height-300 bg-dark position-absolute w-100" />

      <Sidebar
        isOpen={isSidebarOpen}
        isDesktop={isDesktop}
        toggleSidebar={toggleSidebar}
      />

      <main className="main-content position-relative border-radius-lg">
        {/* Pass toggleSidebar to Navbar if you want hamburger there too */}
        <Navbar />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-lg-12">
              {event.showProfile && <ProfileCard />}
              {event.showEvents && <EventsList />}
            </div>
          </div>
        </div>
      </main>

      <Configurator />
    </div>
  );
};

export default DashboardPage;
