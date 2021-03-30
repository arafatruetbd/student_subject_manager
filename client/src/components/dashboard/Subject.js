import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadStudents } from '../../actions/student';
import { deleteSubject } from '../../actions/subject';
const Subject = ({
    student: { students },
    subject: {
        _id,
        subjectName
    },
    deleteSubject,
    loadStudents
}) => {
    useEffect(() => {
        loadStudents();
    }, [loadStudents]);

    let studentName = [];
    students.forEach((student) => {
        if (student.subjects) {
            student.subjects.forEach((subject) => {
                if (subject.subjectName === subjectName)
                    studentName.push(student.name);
            })
        }
    })
    return (
        <div className='profile bg-light'>
            <div>
                <h2>Name: {subjectName}</h2>
                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteSubject(_id)}>
                        <i className="fas fa-user-minus" /> Delete Subject
            </button>
                </div>
            </div>
            <ul>
                <h1>Assigned Student</h1>
                {studentName.map((student, index) => (
                    <li key={index} className='text-primary'>
                        <i className='fas fa-check' /> {student}
                    </li>
                ))}
            </ul>
        </div>
    );
};

Subject.propTypes = {
    student: PropTypes.object.isRequired,
    subject: PropTypes.object.isRequired,
    deleteSubject: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    student: state.student
});

export default connect(mapStateToProps, { deleteSubject, loadStudents })(
    Subject
);
