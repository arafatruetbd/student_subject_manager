import React, { Fragment, useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { editStudent, loadStudents } from '../../actions/student';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const initialState = {
    name: '',
    email: '',
    phone: '',
    subjects: [],
};

const EditStudent = ({ editStudent, loadStudents, student: { students, loading } }) => {
    const [formData, setFormData] = useState(initialState);

    const { id } = useParams();

    useEffect(() => {
        if(!students) {
            loadStudents();
        }
        if (!loading && students) {
            students.forEach((student) => {
                if (student._id === id) {
                    const profileData = { ...initialState };
                    for (const key in student) {
                        if (key in profileData) profileData[key] = student[key];
                    }
                    setFormData(profileData);
                }
            })
        }
    }, [loadStudents, id, loading, students])
    const [dateOfBirth, setStartDate] = useState(new Date());

    const { name, email, phone, subjects } = formData;


    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        editStudent({ name, email, phone, dateOfBirth, subjects, id });
    };

    const onSubjectRemove = (id) => {
        const updatedSubjects = subjects.filter((subject) => subject._id !== id)
        setFormData({ ...formData, subjects: updatedSubjects })
    }

    return (
        <Fragment>
            <p className="lead">
                <i className="fas fa-user" />Edit Student Profile
      </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        value={phone}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Subject Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td onClick={() => onSubjectRemove(subject._id)}>
                                    {subject.subjectName}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </div>

                <div className="form-group">
                    <DatePicker selected={dateOfBirth} onChange={date => setStartDate(date)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
        </Fragment>
    );
};

EditStudent.propTypes = {
    setAlert: PropTypes.func.isRequired,
    editStudent: PropTypes.func.isRequired,
    student: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    student: state.student
});

export default connect(mapStateToProps, { setAlert, editStudent, loadStudents })(EditStudent);
