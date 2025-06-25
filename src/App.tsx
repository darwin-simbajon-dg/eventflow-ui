import './App.css';
import './assets/css/argon-dashboard.css';
import AuthLayout from './pages/AuthLayout';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEventSubscriber } from './service/useEventSubscriber';

function App() {
  const event = useEventSubscriber();

  return (
    <div className="app-container">
      {event.showLogin && <AuthLayout />}
      {event.userAuthenticated && <Dashboard />}
    </div>
  );
}

export default App;
