import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link className='navbar-logo' to='/'>
        Filmazon
      </Link>
      <div className='navbar-links'>
        <Link className='movies-link' to='/movies'>
          Movies
        </Link>
        <Link className='login-link' to='/signup'>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
