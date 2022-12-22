import './Header.css';
import {MdLogout} from 'react-icons/md';
import authService from '../../features/authService';
import { useNavigate } from 'react-router-dom';

const Header = ({user}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  }

  return (
    <header className="header">
      <h2>Calendar Sync</h2>
      <div className="header-right">
        {user && <p>{user.email.split('@')[0]}</p>}
        <MdLogout onClick={handleLogout}></MdLogout>
      </div>
    </header>
  )
}

export default Header;