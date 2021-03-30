import {
    SUBJECTS_LOADED,
    ASSIGN_SUBJECT_SUCCESS,
    ASSIGN_SUBJECT_FAIL,
} from '../actions/types';

const initialState = {
    loading: true,
    subjects: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SUBJECTS_LOADED:
            return {
                ...state,
                loading: false,
                subjects: payload
            };
        case ASSIGN_SUBJECT_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false
            };
        case ASSIGN_SUBJECT_FAIL:
            return {
                ...state,
                loading: false,
                subjects: null
            };
        default:
            return state;
    }
}
