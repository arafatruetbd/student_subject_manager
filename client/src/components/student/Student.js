import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addStudent } from '../../actions/student'
import { connect } from 'react-redux';

const Student = ({ addStudent, }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [dateOfBirth, setStartDate] = useState(new Date());

    const { name, email, phone } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        addStudent({ name, email, phone, dateOfBirth });
    };

    return (
        <Fragment>
            <p className="lead">
                <i className="fas fa-user" /> Add a Student
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
                    <DatePicker selected={dateOfBirth} onChange={date => setStartDate(date)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Create Student" />
            </form>
        </Fragment>
    );
};

Student.propTypes = {
    addStudent: PropTypes.func.isRequired,
};



export default connect(null, { addStudent })(Student);
