import axios from '../config/axios';

const AUTH_URL = '/api/auth'

const login = async ({email, password}) => {
  const response = await axios.post(AUTH_URL + '/login', {email, password});
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const register = async ({email, password}) => {
  const response = await axios.post(AUTH_URL + '/register', {email, password});
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
}

const logout = () => {
  localStorage.removeItem('user');
}

const authService = {
  register,
  login,
  logout
}

export default authService;
