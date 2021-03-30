import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Task Management</h1>
          <div className='buttons'>
            <Link to='/student' className='btn btn-primary'>
              Add Student
            </Link>
            <Link to='/subject' className='btn btn-light'>
              Add Subject
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Landing;
