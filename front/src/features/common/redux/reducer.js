// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as changeLoginInputReducer } from './changeLoginInput';
import { reducer as loginReducer } from './login';
import { reducer as loadFromTokenReducer } from './loadFromToken';
import { reducer as getTravelsReducer } from './getTravels';
import { reducer as getUsersReducer } from './getUsers';
import { reducer as searchEntityReducer } from './searchEntity';
import { reducer as createAccountReducer } from './createAccount';

const reducers = [
  changeLoginInputReducer,
  loginReducer,
  loadFromTokenReducer,
  getTravelsReducer,
  getUsersReducer,
  searchEntityReducer,
  createAccountReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
