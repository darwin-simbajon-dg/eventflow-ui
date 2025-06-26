import React, { useState, useEffect } from 'react';
import Sidebar from '../pages/Sidebar';
import Navbar from '../pages/Navbar';
import { eventBus } from '../service/eventBus';
import { useEventSubscriber } from '../service/useEventSubscriber';
import Configurator from '../pages/Configurator';
import ProfileCard from './Profile';
import FeedCard from './FeedCard';

const DashboardPage: React.FC = () => {
  const event = useEventSubscriber();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              {event.showEvents && <FeedCard />}
            </div>
          </div>
        </div>
      </main>

      <Configurator />
    </div>
  );
};

export default DashboardPage;
