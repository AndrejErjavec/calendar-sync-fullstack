import {useState} from 'react';
import { redirect } from 'react-router-dom';
import authService from '../features/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(formData);
      console.log(response);
      redirect('/dashboard');
    }
    catch (err){
      console.log(err);
    }
  }

  return(
    <>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input type="email"
        id="email"
        name="email"
        value={email}
        placeholder="email"
        onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password"
        id="password"
        name="password"
        value={password}
        placeholder="password"
        onChange={handleChange}/>
      </div>
      <button type="submit">Register</button>
    </form>
    </>
  )
}

export default Login;