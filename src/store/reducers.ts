import { Action, State } from './actions';

import { combineReducers } from 'redux';

const customers = (
  state: State = {
    isFetching: false,
    items: [],
    currentItem: null,
    error: null
  },
  action: Action
): State => {
  switch (action.type) {
    case 'REQUEST_CUSTOMER_LIST':
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case 'REQUEST_CUSTOMER_LIST_ERROR':
      return {
        ...state,
        isFetching: false,
        items: [],
        error: action.error
      };
    case 'RECEIVE_CUSTOMER_LIST':
      return {
        ...state,
        isFetching: false,
        items: action.items,
      };
    case 'REQUEST_CUSTOMER':
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case 'REQUEST_CUSTOMER_ERROR':
      return {
        ...state,
        isFetching: false,
        currentItem: null,
        error: action.error
      };
    case 'RECEIVE_CUSTOMER':
      return {
        ...state,
        isFetching: false,
        currentItem: action.item,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers<State>({
  customers
});

export default rootReducer;
