import api from '../utils/api';
import { setAlert } from './alert';
import {
    STUDENTS_LOADED,
    STUDENTS_LOADED_FAIL,
    ADD_STUDENT_SUCCESS,
    ADD_STUDENT_FAIL,
    EDIT_STUDENT_SUCCESS,
    EDIT_STUDENT_FAIL,
    DELETE_STUDENT_FAIL
} from './types';

// Load Students
export const loadStudents = () => async dispatch => {
    try {
        const res = await api.get('/students');

        dispatch({
            type: STUDENTS_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: STUDENTS_LOADED_FAIL
        });
    }
};

// Add Student
export const addStudent = formData => async dispatch => {
    try {
        const res = await api.post('/students', formData);

        dispatch({
            type: ADD_STUDENT_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Student Created Successfully', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: ADD_STUDENT_FAIL
        });
    }
};

// Edit  Student
export const editStudent = formData => async dispatch => {
    try {
        const res = await api.put(`/students/`, formData);

        dispatch({
            type: EDIT_STUDENT_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Edited Successfully', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: EDIT_STUDENT_FAIL
        });
    }
};


// Delete student
export const deleteStudent = (id) => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await api.delete(`/students/${id}`);
            dispatch(loadStudents());
            dispatch(setAlert('student has been permanently deleted'));
        } catch (err) {
            dispatch({
                type: DELETE_STUDENT_FAIL
            });
        }
    }
};