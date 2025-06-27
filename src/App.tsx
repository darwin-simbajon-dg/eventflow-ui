import './App.css';
import './assets/css/argon-dashboard.css';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from './pages/AuthLayout';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { useEventSubscriber } from './service/useEventSubscriber';
import { SnackbarProvider } from 'notistack'
import { MaterialDesignContent } from 'notistack'
import { styled } from '@mui/material/styles';
import { LoadingProvider } from './service/LoadingContextType';
import GlobalSpinner from './components/Spinner';
import { useAppStore } from './store/useAppStore';

function App() {
  // const event = useEventSubscriber();

  const {
    showLogin, 
    userAuthenticated
  } = useAppStore();

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


  return (
    <>
    <LoadingProvider> 
    <GlobalSpinner />
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
      {showLogin && <AuthLayout />}
      {userAuthenticated && <Dashboard />}
    </div>
    </LoadingProvider>
    </>
  );
}

export default App;
