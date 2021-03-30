import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const guestLinks = (
    <ul>
      <li>
        <Link to='/all-student'>All Students</Link>
      </li>
      <li>
        <Link to='/all-subject'>All Subjects</Link>
      </li>
      <li>
        <Link to='/student'>Add Student</Link>
      </li>
      <li>
        <Link to='/subject'>Add Subject</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> Task Manager
        </Link>
      </h1>
      <Fragment>{guestLinks}</Fragment>
    </nav>
  );
};

export default Navbar;
