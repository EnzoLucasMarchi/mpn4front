import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
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
    <main className='page'>
      <div className='container'>
        <h2>Registrarse</h2>
        <form className='formu' onSubmit={handleSubmit}>
          <input type='email' name='email' required placeholder='Correo'/>
          <input type='password' name='pass' required placeholder='Contraseña'/>
          <button type='submit'>Registrarse</button>
        </form>
        {error && <p>{error}</p>}
        <p>¿Ya tienes una cuenta? Inicia sesión <Link className='enlace' to='/'>aquí</Link></p>
      </div>

    </main>
  );
}

export default Register;