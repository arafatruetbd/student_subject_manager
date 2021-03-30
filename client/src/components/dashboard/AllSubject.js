import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Subject from './Subject'
import { loadSubjects } from '../../actions/subject'


const AllSubject = ({ loadSubjects, subject: { subjects, loading } }) => {
    useEffect(() => {
        loadSubjects();
    }, [loadSubjects]);

    return (
        <Fragment>
            {loading ? (
                <div className="Loader">Loading...</div>
            ) : (
                    <Fragment>
                        <h1 className='large text-primary'>All Subject</h1>
                        <div className='profiles'>
                            {subjects.length > 0 ? (
                                subjects.map(subject => (
                                    <Subject key={subject._id} subject={subject} />
                                ))
                            ) : (
                                    <h4>No Subject found...</h4>
                                )}
                        </div>
                    </Fragment>
                )}
        </Fragment>
    );
};

// AllSubject.propTypes = {
//     loadSubjects: PropTypes.func.isRequired,
// };

const mapStateToProps = state => ({
    subject: state.subject
});

export default connect(mapStateToProps, { loadSubjects })(AllSubject);
