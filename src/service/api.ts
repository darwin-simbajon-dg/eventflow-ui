import axios from 'axios';
import { eventBus } from './eventBus';

export const fetchEvents = async () => {

    eventBus.emit({ loading: true });
    const response = await axios.get('http://localhost:5064/api/events');
    eventBus.emit({ loading: false });
    return response.data;
}