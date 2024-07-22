import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/fetchUser';
import { useEffect } from 'react';
import './Forms.css'

function Login() {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('tokenLog', data.token);
      navigate('/profile');
    },
    onError: (error) => alert(error.response.data.message)
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;
    const data = {
      email,
      pass,
    };

    await loginMutation.mutateAsync(data);
  };

  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate('/profile');
    }
  }, [loginMutation.isSuccess, navigate]);

  return (
    <main className='page'>
    <div className='container'>
    <h2>Iniciar sesión</h2>
      <form className='formu' onSubmit={handleSubmit}>
        <input type='email' name='email' required placeholder='Correo'/>
        <input type='password' name='pass' required placeholder='Contraseña'/>
        <button type='submit'>Ingresar</button>
      </form>
      <p>¿No tienes una cuenta? Regístrate <Link className='enlace' to='/register'>aquí</Link></p>
    </div>

    </main>
  );
}

export default Login;