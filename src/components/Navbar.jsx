import React from 'react';
import { Link } from 'react-router-dom';
import '../style/css/Navbar.scss';

function Navbar() {
  return (
    <nav className="navbar">
        <Link to='/'>Home</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/images">Images</Link>
      <Link to="/audio">Audio</Link>
    </nav>
  );
}

export default Navbar;
