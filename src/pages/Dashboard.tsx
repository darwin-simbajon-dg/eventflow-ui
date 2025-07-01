import React, { useState, useEffect } from 'react';
import Sidebar from '../pages/Sidebar';
import Navbar from '../pages/Navbar';
import Configurator from '../pages/Configurator';
import ProfileCard from './Profile';
import EventsList from './EventsList';
import EventForm from '../components/EventForm';
import { fetchEvents } from '../service/api';
import { useLoading } from "../service/LoadingContextType";
import { useAppStore } from '../store/useAppStore';
import QRScanner from '../components/QRScanner';

const DashboardPage: React.FC = () => {
  const loading = useAppStore((state) => state.loading);
  const showEvents = useAppStore((state) => state.showEvents);
  const showProfile = useAppStore((state) => state.showProfile);
  const showEventForm = useAppStore((state) => state.showEventForm);
  const showScanner = useAppStore((state) => state.showScanner);
  const userData = useAppStore((state) => state.userData);

  const { setLoading } = useLoading();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);
  const selectedEvent = useAppStore((state) => state.selectedEvent);

  const defaultEvent = {
    eventId: '',
    title: '',
    description: '',
    date: '',
    venue: '',
    time: '',
    imageUrl: '',
    link: '',
  };

  useEffect(() => {
    const storeData = localStorage.getItem('app-store');
    if (storeData) {
      const sizeInKB = new Blob([storeData]).size / 1024;
      console.log(`📦 app-store size: ${sizeInKB.toFixed(2)} KB`);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const loadEvents = async () => {
      try {
        if (userData && userData.userId) {
          await fetchEvents(userData.userId);
        } else {
          console.warn("User data or userId is null");
        }
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
              {showEventForm && <EventForm event={selectedEvent || defaultEvent} />}
              {showScanner && 
              <QRScanner />}
          </div>
        </div>
        </div>
      </main>

      <Configurator />
    </div>
  );
};

export default DashboardPage;
