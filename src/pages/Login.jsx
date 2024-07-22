import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/fetchUser';
import { useEffect } from 'react';

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
    <main>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email: <input type='email' name='email' required />
        </label>
        <br />
        <label>
          Contraseña: <input type='password' name='pass' required />
        </label>
        <br />
        <button type='submit'>Ingresar</button>
      </form>
      <p>¿No tienes una cuenta? <Link to='/register'>Regístrate</Link></p>
    </main>
  );
}

export default Login;