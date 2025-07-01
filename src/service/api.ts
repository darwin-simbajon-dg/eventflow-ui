import axios from 'axios';
// import { eventBus } from './eventBus';
import { useAppStore } from '../store/useAppStore';
import  {tokenService}  from './tokenService';
import { enqueueSnackbar } from 'notistack';

const apiBaseUrl = useAppStore.getState().config?.apiBaseUrl;

export const fetchEvents = async (userId: string) => {



    useAppStore.getState().setState({ loading: true });

    
    const response = await axios.get(`${apiBaseUrl}/api/events/${userId}`);

    useAppStore.getState().setState({ loading: false });

    const mappedEvents = response.data.map((event: any) => {
        const formatTime = (time: string) => {
            const [hours, minutes] = time.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM/PM format
            return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
        };

        return {
            id: event.eventId ?? "",
            title: event.title,
            description: event.description,
            headline: event.headline ?? "",
            notes: event.notes ?? "Don't forget your ID for verification. See you there!",
            time: event.time ? formatTime(event.time) : "TBD",
            date: event.date ?? "TBD",
            timeline: event.timeline, // custom formatter, or just event.createdAt
            imageUrl: event.imageUrl ?? "https://dummyimage.com/1280x720/fff/aaa",
            isRegistered: event.isRegistered ?? false,
            attended: event.attended ?? false,
            venue: event.venue ?? "TBD",
        };
    });

    useAppStore.getState().setState({events: mappedEvents});

    return;
}

export const createEvent = async (eventData: any) => {
    useAppStore.getState().setState({ loading: true });
    try {
        const response = await axios.post(`${apiBaseUrl}/api/event`, eventData);

        if (response.status === 200) {
            enqueueSnackbar("Event created successfully", { variant: "success" });
            useAppStore.getState().setState({ showEvents: true, showEventForm: false });
        } else {
            enqueueSnackbar("Failed to create event", { variant: "error" });
        }
    } catch (error) {
        console.error("Error creating event:", error);
        enqueueSnackbar("Failed to create event", { variant: "error" });
    } finally {
        useAppStore.getState().setState({ loading: false });
    }
}

export const login = async (username: string, password: string) => {
    useAppStore.getState().setState({ loading: true });

    try {

        const response = await axios.post(`${apiBaseUrl}/api/auth/login`, {
            username,
            password
        });

        if (response.status === 200 && response.data) {
            // Save the token to localStorage
            const userData = response.data;
            localStorage.setItem("user-data", JSON.stringify(userData));
            const data = tokenService.getUserDataFromToken();
    
            if (!data) {
                throw new Error("Invalid user data");
            }
    
            useAppStore.getState().setState({
                userAuthenticated: true,
                showLogin: false,
                userData: data,
                isAdmin: data?.role === 'Admin',
                isStudent: data?.role === 'Student',
                showProfile: false,
                showEvents: true,
                showScanner: false
            });
            enqueueSnackbar("Login successful", { variant: "success" });
        } else {
            throw new Error("Login failed");
        }

        if(response.status !== 200) {         
            enqueueSnackbar("Login failed. Please check your credentials.", {
                variant: "error"
            });
        }

    } catch (error) {
        enqueueSnackbar("Login failed. Please check your credentials.", {
            variant: "error"
        });
        console.error("Login failed:", error);
        return false;
    } finally {
        useAppStore.getState().setState({ loading: false });
    }
}

export const register = async (userId: string, eventId: string) => {
    useAppStore.getState().setState({ loading: true });
    try {  
        const response = await axios.post(`${apiBaseUrl}/api/event/register`, {
            userId,
            eventId
        });

        if (response.status === 200) {
            // Registration successful
            console.log("Registration successful:", response.data);
            enqueueSnackbar("Registration successful", { variant: "success" });
        } else {
            // Handle unexpected response status
            console.error("Unexpected response status:", response.status);
            enqueueSnackbar("Registration failed. Please try again.", { variant: "error" });
        }
    } catch (error) {
        console.error("Registration failed:", error);
        return false;
    } finally {
        useAppStore.getState().setState({ loading: false });
    }
}

export const signUp = async (formData: any) => {
       try {

        useAppStore.getState().setState({ loading: true });
        
        const response = await axios.post(`${apiBaseUrl}/api/auth/register`, formData)

        if(response.status === 200){
            console.log("Profile updated successfully:", response.data);
            useAppStore.getState().setState({
                showRegister: false,
                showLogin: true,
                userAuthenticated: false
            })
            enqueueSnackbar("Profile created successfully", {variant: "success"});
        }

       } catch(error){
        enqueueSnackbar("Failed to create profile. Please try again.", { variant: "error" });
        console.error("Failed to create profile:", error);
        throw error;
       }
       finally {
        useAppStore.getState().setState({ loading: false });
       }
};

export const updateProfile = async (userId: string, formData: any, base64Image: string | null) => {
    try {
 
      useAppStore.getState().setState({ loading: true });

      const payload = {
        ...formData,
        imageBase64: base64Image, // base64 string if changed, or null
      };
  
      const response = await axios.put(`${apiBaseUrl}/api/profile/${userId}`, payload);
      
      if(response.status === 200) {
        // Update successful
        console.log("Profile updated successfully:", response.data);
        enqueueSnackbar("Profile updated successfully", { variant: "success" });
           
      }
      else {
            // Handle unexpected response status
            console.error("Unexpected response status:", response.status);
            enqueueSnackbar("Failed to update profile. Please try again.", { variant: "error" });
     }
    } catch (error) {
      enqueueSnackbar("Failed to update profile. Please try again.", { variant: "error" });
      console.error("Failed to update profile:", error);
      throw error;
    }
    finally {
        useAppStore.getState().setState({ loading: false });
    }
  };

export const deleteEvent = async (eventId: string) => {
    const response = await axios.delete(`${apiBaseUrl}/api/event/${eventId}`)

    if (response.status === 200) {
        enqueueSnackbar("Event deleted successfully", { variant: "success" });
        useAppStore.getState().setState({ showEvents: true, showEventForm: false });
    } else {
        enqueueSnackbar("Failed to delete event", { variant: "error" });
    }
};

export const updateEvent = async (eventData: any) => {
    useAppStore.getState().setState({ loading: true });
    try {
        const response = await axios.put(`${apiBaseUrl}/api/event`, eventData);

        if (response.status === 200) {
            enqueueSnackbar("Event updated successfully", { variant: "success" });
            useAppStore.getState().setState({ showEvents: true, showEventForm: false });
        } else {
            enqueueSnackbar("Failed to update event", { variant: "error" });
        }
    } catch (error) {
        console.error("Error updating event:", error);
        enqueueSnackbar("Failed to update event", { variant: "error" });
    } finally {
        useAppStore.getState().setState({ loading: false });
    }
}

export const handleQRCodeResult = async (qrData: string) => {
    try {
      const payload = JSON.parse(qrData); // or parse manually if it's not JSON
      const { eventId, userId } = payload;
  
      const res = await axios.post(`${apiBaseUrl}/api/event/confirm-attendance`, {
        eventId,
        userId,
      });
  
      if (res.data.success) {
        enqueueSnackbar("Attendance confirmed!", { variant: "success" });
      } else {
        enqueueSnackbar("Invalid or already confirmed.", { variant: "warning" });
      }
    } catch (error) {
      enqueueSnackbar("Failed to confirm attendance.", { variant: "error" });
      console.error("QR processing error:", error);
    }
  };



  
  
