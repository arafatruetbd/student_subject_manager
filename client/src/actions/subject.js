import api from '../utils/api';
import { setAlert } from './alert';
import { loadStudents } from './student';
import {
    SUBJECTS_LOADED,
    SUBJECTS_LOADED_FAIL,
    ADD_SUBJECT_SUCCESS,
    ADD_SUBJECT_FAIL,
    ASSIGN_SUBJECT_SUCCESS,
    ASSIGN_SUBJECT_FAIL,
    DELETE_SUBJECT_FAIL
} from './types';

// Load Subjects
export const loadSubjects = () => async dispatch => {
    try {
        const res = await api.get('/subjects');

        dispatch({
            type: SUBJECTS_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SUBJECTS_LOADED_FAIL
        });
    }
};

// Add Subject
export const addSubject = formData => async dispatch => {
    try {
        const res = await api.post('/subjects', formData);
        dispatch({
            type: ADD_SUBJECT_SUCCESS,
            payload: res.data
        });
        dispatch(loadSubjects());
        dispatch(loadStudents());
        dispatch(setAlert('Subject Created Successfully', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: ADD_SUBJECT_FAIL
        });
    }
};

// Assign Subject
export const assignSubject = formData => async dispatch => {
    try {
        await api.post('/subjects/assign-subject', formData);
        dispatch({
            type: ASSIGN_SUBJECT_SUCCESS,
            // payload: res.data
        });
        dispatch(setAlert('Subject Assign Successfully', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: ASSIGN_SUBJECT_FAIL
        });
    }
};


// Delete subject
export const deleteSubject = (id) => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await api.delete(`/subjects/${id}`);
            dispatch(loadSubjects());
            dispatch(setAlert('subjects has been permanently deleted'));
        } catch (err) {
            dispatch({
                type: DELETE_SUBJECT_FAIL
            });
        }
    }
};