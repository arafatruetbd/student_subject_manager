import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Student from './Student';
import { loadStudents } from '../../actions/student';

const AllStudent = ({ loadStudents, student: { students, loading } }) => {
  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  return (
    <Fragment>
      {loading ? (
        <div className="Loader">Loading...</div>
      ) : (
          <Fragment>
            <h1 className='large text-primary'>All Student</h1>
            <div className='profiles'>
              {students.length > 0 ? (
                students.map(student => (
                  <Student key={student._id} student={student} />
                ))
              ) : (
                  <h4>No Student found...</h4>
                )}
            </div>
          </Fragment>
        )}
    </Fragment>
  );
};

AllStudent.propTypes = {
  loadStudents: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  student: state.student
});

export default connect(
  mapStateToProps,
  { loadStudents }
)(AllStudent);
