import { combineReducers } from 'redux';
import { State, Action } from './actions';

const customers = (
  state: State = {
    isFetching: false,
    items: [],
    currentItem: {}
  },
  action: Action
): State => {
  switch (action.type) {
    case 'REQUEST_CUSTOMER_LIST':
      return {
        ...state,
        isFetching: true
      };
    case 'RECEIVE_CUSTOMER_LIST':
      return {
        ...state,
        isFetching: false,
        items: action.items
      };
    case 'REQUEST_CUSTOMER':
      return {
        ...state
      };
    case 'RECEIVE_CUSTOMER':
      return {
				...state,
				currentItem: action.item
			};
    default:
      return state;
  }
};

const rootReducer = combineReducers<State>({
  customers
});

export default rootReducer;
