import axios from 'axios';
// import { eventBus } from './eventBus';
import { useAppStore } from '../store/useAppStore';

export const fetchEvents = async (userId: string) => {

    useAppStore.getState().setState({ loading: true });

    const response = await axios.get(`http://localhost:5064/api/events/${userId}`);

    useAppStore.getState().setState({ loading: false });

    const mappedEvents = response.data.map((event: any, index: number) => ({
          id: event.id ?? index.toString(),
          title: event.title,
          description: event.description,
          timeline: event.timeline, // custom formatter, or just event.createdAt
          imageUrl: event.imageUrl ?? "https://dummyimage.com/1280x720/fff/aaa",
          isRegistered: event.isRegistered ?? false,
          attended: event.attended ?? false,
    }));

    useAppStore.getState().setState({events: mappedEvents});

    return;
}