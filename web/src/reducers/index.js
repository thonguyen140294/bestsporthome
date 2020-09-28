import { combineReducers } from 'redux';

import authen from './authen.reducer.js';
import ui from './ui.reducer.js'

const rootReducer = combineReducers({
  authen,
  ui
});

export default rootReducer;