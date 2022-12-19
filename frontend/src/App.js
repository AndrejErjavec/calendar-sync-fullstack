import {Routes, Route} from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
