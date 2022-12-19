import {useState} from 'react';
import authService from '../features/authService';
import { redirect } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: ''
  });

  const {email, password, password2} = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(formData);
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
        <input type="text"
        id="password"
        name="password"
        value={password}
        placeholder="password"
        onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="password2">Confirm password</label>
        <input type="text"
        id="password2"
        name="password2"
        value={password2}
        placeholder="confirm password"
        onChange={handleChange}/>
      </div>
      <button type="submit">Register</button>
    </form>
    </>
  )
}

export default Register;