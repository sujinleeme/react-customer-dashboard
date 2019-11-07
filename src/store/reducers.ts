import { Action, State } from './actions';

import { combineReducers } from 'redux';

const customers = (
  state: State = {
    isFetching: false,
    items: [],
    currentItem: {},
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
    case 'RECEIVE_CUSTOMER_LIST':
      return {
        ...state,
        isFetching: false,
        items: action.items,
        error: action.error
      };
    case 'REQUEST_CUSTOMER':
      return {
        ...state,
        error: null,
      };
    case 'RECEIVE_CUSTOMER':
      return {
				...state,
        currentItem: action.item,
        error: action.error
			};
    default:
      return state;
  }
};

const rootReducer = combineReducers<State>({
  customers
});

export default rootReducer;
