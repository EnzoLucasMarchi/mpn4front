import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
