import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/fetchUser';
import { useEffect } from 'react';

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

  return (
    <main>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <h1>¡Bienvenido, {query.data.email}!</h1>
    </main>
  );
}

export default Profile;