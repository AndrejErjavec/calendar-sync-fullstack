import axios from '../config/axios';

const CALENDAR_URL = '/api/calendar';

const getIcal = async () => {
    const response = await axios.get(CALENDAR_URL);
    return response.data;
}

const getCalendarUrls = async () => {
    const response = await axios.get(CALENDAR_URL + '/calendars');
    return response.data;
}

const getSubjects = async () => {
    const response = await axios.get(CALENDAR_URL + '/titles');
    return response.data;
}

const getUserSubjects = async () => {
    const response = await axios.get(CALENDAR_URL + '/subjects');
    return response.data;
}

const addCalendar = async (url) => {
    const response = await axios.post(CALENDAR_URL + '/calendars', {url: url});
    return response.data;
}

const addSubject = async (subject) => {
    const response = await axios.post(CALENDAR_URL + '/subjects', {subject: subject});
    return response.data;
}

const deleteCalendar = async (url) => {
    const response = await axios.delete(`${CALENDAR_URL}/calendars/${url}`);
    return response.data;
}

const deleteSubject = async (subject) => {
    const response = await axios.delete(`${CALENDAR_URL}/subjects/${subject}`);
    return response.data;
}

const calendarService = {
    getIcal,
    getCalendarUrls,
    getSubjects,
    getUserSubjects,
    addCalendar,
    addSubject,
    deleteCalendar,
    deleteSubject
}

export default calendarService;