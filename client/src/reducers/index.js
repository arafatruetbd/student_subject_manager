import { combineReducers } from 'redux';
import alert from './alert';
import student from './student';
import subject from './subject';

export default combineReducers({
  alert,
  student,
  subject
});
