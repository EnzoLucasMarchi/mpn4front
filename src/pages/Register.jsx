import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/fetchUser';

function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: registerUser,
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      setError(error.response?.data?.message);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;
    const data = { email, pass };

    await registerMutation.mutateAsync(data);
  };

  return (
    <main>
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Correo electrónico: <input type='email' name='email' required />
        </label>
        <br />
        <label>
          Contraseña: <input type='password' name='pass' required />
        </label>
        <br />
        <button type='submit'>Registrarse</button>
      </form>
      {error && <p>{error}</p>}
      <p>¿Ya tienes una cuenta? <a href='/'>Inicia sesión</a></p>
    </main>
  );
}

export default Register;