import {
    ADD_STUDENT_SUCCESS,
    ADD_STUDENT_FAIL,
    STUDENTS_LOADED,
} from '../actions/types';

const initialState = {
    loading: true,
    students: [],
    student: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case STUDENTS_LOADED:
            return {
                ...state,
                students: payload,
                loading: false
            };
        case ADD_STUDENT_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false
            };
        case ADD_STUDENT_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
