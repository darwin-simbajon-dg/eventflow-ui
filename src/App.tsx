import './App.css';
import './assets/css/argon-dashboard.css';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { useEventSubscriber } from './service/useEventSubscriber';
import { SnackbarProvider } from 'notistack'
import { MaterialDesignContent } from 'notistack'
import { styled } from '@mui/material/styles';
import { LoadingProvider } from './service/LoadingContextType';
import GlobalSpinner from './components/Spinner';
import { useAppStore } from './store/useAppStore';
import Modal from './components/Modal';
import Login from './components/Login';
import { useSignalR } from './service/useSignalR';
import { fetchEventWithoutPreload } from './service/api';
import Register from './components/Register';
import { useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const userAuthenticated = useAppStore((state) => state.userAuthenticated);
  const showLogin = useAppStore((state) => state.showLogin);
  const userData = useAppStore((state) => state.userData);
  const showRegister = useAppStore((state) => state.showRegister);
  // const signalRUrl = useAppStore.getState().config?.signalRUrl;

  const signalRUrl = import.meta.env.VITE_SIGNALR_URL;

  // fetch('/config.json')
  // .then((res) => res.json())
  // .then((config) => {
  //   useAppStore.getState().setConfig(config);
  // });
  
   useSignalR(`${signalRUrl}`, async (message) => {
  
      if(message === "EventListUpdated") {
        // If you want to show a notification when e
        console.log("EventListUpdated received from SignalR");
        if (userData && userData.userId) {
          console.log("Fetching events for userId:", userData.userId);
          await fetchEventWithoutPreload(userData.userId);
        } else {
          console.warn("User data or userId is null");
        }
      }
    });

  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-success': {
      backgroundColor: '#045911',
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: '#970C0C',
    },
    '&.notistack-MuiContent-info': {
      backgroundColor: '#d6620f',
    }
  }));

  useEffect(() => {
    const storeData = localStorage.getItem('app-store');
    if (storeData) {
      const sizeInKB = new Blob([storeData]).size / 1024;
      console.log(`📦 app-store size: ${sizeInKB.toFixed(2)} KB`);
    }
  }, []);
  
  return (
    <>
    <LoadingProvider> 
    <GlobalSpinner />
    <Modal />
    <SnackbarProvider maxSnack={3} anchorOrigin={
      {
        vertical: 'top',
        horizontal: 'right'
      }} 
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent
      }}
       />
    <div className="app-container">
      {showLogin && <Login />}
      {userAuthenticated && <Dashboard />}
      {showRegister && <Register student={{
        studentNumber: '',
        firstname: '',
        lastname: '',
        college: '',
        email: '',
        alternativeEmail: '',
        password: ''
      }} />}
    </div>
    </LoadingProvider>
    </>
  );
}

export default App;
