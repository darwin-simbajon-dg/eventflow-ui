// src/pages/DashboardPage.tsx
import React from 'react';
import Sidebar from '../pages/Sidebar';
import Navbar from '../pages/Navbar';
import { eventBus } from '../service/eventBus';
import { useEventSubscriber } from '../service/useEventSubscriber';
// import FeedCard from '../pages/FeedCard';
// import DataTable from '../pages/DataTable';
import Configurator from '../pages/Configurator';
import ProfileCard from './Profile';
import FeedCard from './FeedCard';

const DashboardPage: React.FC = () => {

const event = useEventSubscriber();

  return (
    <div className="g-sidenav-show bg-gray-100">
      <div className="min-height-300 bg-dark position-absolute w-100" />
      <Sidebar />
      <main className="main-content position-relative border-radius-lg">
        <Navbar />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-lg-12">
              {/* <FeedCard /> */}
              {event.showProfile && <ProfileCard/>}
              {event.showEvents && <FeedCard />}
            </div>
            {/* <div className="col-lg-7">
              <DataTable />
            </div> */}
          </div>
        </div>
      </main>
      <Configurator />
    </div>
  );
};

export default DashboardPage;
