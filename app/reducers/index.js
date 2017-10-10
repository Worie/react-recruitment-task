import { combineReducers } from 'redux';
import * as types from '../actions/types';

//  const initialState = {
//    visibleContent: 'opt1'
//  };

const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};

const tabId = (state = 'posts', action) => {
  switch (action.type) {
    case types.SHOW_CONTENT:
//      return Object.assign({}, state, {
//        visibleContent: action.value
//      });
      return action.value;
    default:
      return state;
  }
};

const pagination = (state = 0, action) => {
  switch (action.type) {
    case types.PAGE:
      return action.value;
    default:
      return state;
  }
};

const elPerPage = (state = 5, action) => {
  switch (action.type) {
    case types.NUM_OF_ELS:
      return action.value;
    default:
      return state;
  }
};


const sortBy = (state = 'id', action) => {
  switch (action.type) {
    case types.SORT_CONTENT:
      return action.value;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  filter,
  tabId,
  pagination,
  elPerPage,
  sortBy
});

export default rootReducer;
