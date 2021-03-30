import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadStudents } from '../../actions/student';
import { addSubject, loadSubjects, assignSubject } from '../../actions/subject';

const Subject = ({ loadStudents, loadSubjects, addSubject, assignSubject, student: { students }, subject: { subjects } }) => {
    const [formData, setFormData] = useState({
        subjectName: '',
        subjectId: null,
        studentName: ''
    });

    useEffect(() => {
        loadStudents();
        loadSubjects();
    }, [loadStudents, loadSubjects, addSubject, assignSubject]);
    const { subjectName, subjectId, studentName } = formData;


    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitSubject = async (e) => {
        e.preventDefault();
        addSubject({ subjectName });
    };
    const onAssignSubject = async (e) => {
        e.preventDefault();
        assignSubject({ subjectId, studentName });
    };
    return (
        <Fragment>
            <h1 className="large text-primary">Add Subject</h1>
            <p className="lead">
                <i className="fas fa-user" /> Add Subject
      </p>
            <form className="form" onSubmit={onSubmitSubject}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="subjectName"
                        value={subjectName}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Add Subject" />
            </form>
            <form className="form" style={{ border: '1px solid gray', padding: '10px', marginTop: '20px' }} onSubmit={onAssignSubject}>
                {students && <div className="form-group">
                    <select name="studentName" value={studentName} onChange={onChange}>
                        <option>Select Student</option>
                        {students.map(item => <option key={item._id} value={item.name}>{item.name}</option>)}
                    </select>
                    <small className="form-text">
                        Assign Student
          </small>
                </div>}
                {subjects && <div className="form-group">
                    <select name="subjectId" value={subjectId} onChange={onChange}>
                        <option>Select Subject</option>
                        {subjects.map(item => <option key={item._id} value={item._id}>{item.subjectName}</option>)}
                    </select>
                    <small className="form-text">
                        Assign Student
          </small>
                </div>}
                <input type="submit" className="btn btn-primary" value="Assign Subject" />
            </form>
        </Fragment>
    );
};

Subject.propTypes = {
    loadStudents: PropTypes.func.isRequired,
    loadSubjects: PropTypes.func.isRequired,
    addSubject: PropTypes.func.isRequired,
    assignSubject: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    student: state.student,
    subject: state.subject
});

export default connect(mapStateToProps, { loadStudents, loadSubjects, addSubject, assignSubject })(Subject);
