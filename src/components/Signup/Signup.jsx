import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match!');
    }

    try {
      setError('');
      setLoading(true);

      await signup(email, password);
      navigate('/login');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  };

  return (
    <div className='signup__container'>
      <div className='signup__body'>
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
        <form className='signup__form' onSubmit={handleSubmit}>
          <div className='signup-field' id='email'>
            <label>Email</label>
            <input type='email' required onChange={handleEmail} />
          </div>
          <div className='signup-field' id='password'>
            <label>Password</label>
            <input type='password' required onChange={handlePassword} />
          </div>
          <div className='signup-field' id='password-confirm'>
            <label>Password Confirmation</label>
            <input type='password' required onChange={handlePasswordConfirm} />
          </div>
          <button disabled={loading}>Sign Up</button>
          <p>
            Need an account?{' '}
            <Link to='/login' className='signup__form-link'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
