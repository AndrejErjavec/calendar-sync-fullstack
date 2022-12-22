import {useState} from 'react';
import authService from '../features/authService';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

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
      navigate('/dashboard');
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
      <button type="submit">Login</button>
    </form>
    </>
  )
}

export default Login;