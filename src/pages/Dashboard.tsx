import React, { useState, useEffect } from 'react';
import Sidebar from '../pages/Sidebar';
import Navbar from '../pages/Navbar';
import Configurator from '../pages/Configurator';
import ProfileCard from './Profile';
import EventsList from './EventsList';
import { fetchEvents } from '../service/api';
import { useLoading } from "../service/LoadingContextType";
import { useSignalR } from '../service/useSignalR';
import { enqueueSnackbar } from "notistack";
import { useAppStore } from '../store/useAppStore';

const DashboardPage: React.FC = () => {
  const loading = useAppStore((state) => state.loading);
  const showEvents = useAppStore((state) => state.showEvents);
  const showProfile = useAppStore((state) => state.showProfile);

  const { setLoading } = useLoading();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);

  useSignalR("http://localhost:5064/hub/notifications", (message) => {
    enqueueSnackbar("Events are updated", {
          variant: "info"
        });

    const data = JSON.parse(message);

    console.log("Received data from SignalR:", data);

    const mappedEvents = data.map((event: any, index: number) => ({
      id: event.EventId ?? index.toString(),
      title: event.Title,
      description: event.Description,
      createdDate: event.DateCreated, // custom formatter, or just event.createdAt
      imageUrl: event.ImageUrl ?? "https://dummyimage.com/1280x720/fff/aaa",
    }));

    useAppStore.getState().setState({ events: mappedEvents });
  });

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const loadEvents = async () => {
      try {

        await fetchEvents('14F12131-C9E4-4DB1-B868-731EA432BBB7');
        //await fetchEvents('C6C4831F-323C-4FB8-8F1B-C15391132C25');

      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    loadEvents();
  
  }, []);

  useEffect(() => {
    if (loading !== undefined) {
      setLoading(loading);
    }
  }, [loading]);

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
              {showProfile && <ProfileCard />}
              {showEvents && <EventsList />}
            </div>
          </div>
        </div>
      </main>

      <Configurator />
    </div>
  );
};

export default DashboardPage;
