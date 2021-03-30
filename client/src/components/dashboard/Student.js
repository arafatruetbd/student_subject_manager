import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment'
import { deleteStudent } from '../../actions/student';
const Student = ({
    student: {
        _id,
        subjects,
        name,
        email,
        phone,
        dateOfBirth
    },
    deleteStudent
}) => {
    return (
        <div className='profile bg-light'>
            <div>
                <h2>Name: {name}</h2>
                <p>
                   Email: {email}
                </p>
                <p>
                   Phone: {phone}
                </p>
                <p>
                   Date Of Birth: {moment(dateOfBirth).format('YYYY-MM-DD')}
                </p>
                <Link to={`/student/${_id}`} className='btn btn-primary'>
                    Edit Student Profile
        </Link>
                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteStudent(_id)}>
                        <i className="fas fa-user-minus" /> Delete Student
            </button>
                </div>
            </div>
          
            <ul>
            <h1>Assigned Subject</h1>
                {subjects.map((subject, index) => (
                    <li key={index} className='text-primary'>
                        <i className='fas fa-check' /> {subject.subjectName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

Student.propTypes = {
    student: PropTypes.object.isRequired,
    deleteStudent: PropTypes.func.isRequired,
};

export default connect(null, { deleteStudent })(
    Student
  );
  