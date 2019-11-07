import { Customer } from '../types';

export type State = {
  isFetching: boolean;
  customers: Customer[];
};

type RequestCustomerListAction = {
  type: 'REQUEST_CUSTOMER_LIST';
};

type RequestCustomerListErrorAction = {
  type: 'REQUEST_CUSTOMER_LIST_ERROR';
};
type ReceiveCustomerListAction = {
  type: 'RECEIVE_CUSTOMER_LIST';
  items: Customer[];
};

type RequestCustomerAction = {
  type: 'REQUEST_CUSTOMER';
  items: Customer[];
};

type RequestCustomerErrorAction = {
  type: 'REQUEST_CUSTOMER_ERROR';
  currentItem: Customer;
};

type ReceiveCustomerAction = {
  type: 'RECEIVE_CUSTOMER';
  currentItem: Customer;
};


export type Action =
  | ReceiveCustomerListAction
  | RequestCustomerListAction
  | RequestCustomerListErrorAction
  | ReceiveCustomerAction
  | RequestCustomerAction
  | RequestCustomerErrorAction
