import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      await login(email, password);
      navigate('/');
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  };

  return (
    <div className='login__container'>
      <div className='login__body'>
        <h2>Log In</h2>
        {error && <p>{error}</p>}
        <form className='login__form' onSubmit={handleSubmit}>
          <div className='login-field' id='email'>
            <label>Email</label>
            <input type='email' required onChange={handleEmail} />
          </div>
          <div className='login-field' id='password'>
            <label>Password</label>
            <input type='password' required onChange={handlePassword} />
          </div>
          <button>Log In</button>
          <p>
            Already have an account?{' '}
            <Link to='/signup' className='login__form-link'>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
