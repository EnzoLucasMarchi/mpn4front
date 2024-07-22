import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/fetchUser';
import { useEffect } from 'react';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem('tokenLog');

  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!token) {
        throw new Error('Token no disponible');
      }
      return getUser(token);
    },
    enabled: !!token
  });

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  if (query.isLoading) {
    return <div>Cargando...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('tokenLog');
    navigate('/');
  };

  console.log(query.data)
  return (
    <div className='body-container'>
      <nav className='nav-bar'>
        <button className='logout' onClick={handleLogout}>Log Out</button>
      </nav>
      <main className='content'>
        <h2>Personal Info</h2>
              <div className='info-container'>
                  <div className='info-header'>
                      <h2> Profile</h2>
                      <button className='btn-edit'>Edit</button>
                  </div>
                   <div className='list-container'>
                         <ul className='grill'>
                         <li><p>Nombre </p>{query.data.name}</li>
                         <li><p>Bio </p>{query.data.bio}</li>
                          <li><p>Tel </p>{query.data.phone}</li>
                         <li><p>Correo </p>{query.data.email}</li>
                        </ul>
                   </div>
               </div>
      </main>
    </div>

  );
}

export default Profile;