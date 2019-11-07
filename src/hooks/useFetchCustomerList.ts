import { Action, State } from '../store/actions';

import axios from 'axios';
import { baseUrl } from '../config/const';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const shouldFetchCustomerList = (state: State) => {
  const { customers } = state;
  if (!customers) {
    return true;
  }
  if (customers.isFetching) {
    return false;
  }
  return false;
};

const useFetchCustomerList = () => {
  const dispatch = useDispatch<Action>();
  // const customers = useSelector((state: State) => state.customers);

  const fetchCustomerList = useCallback(async () => {
    dispatch({
      type: 'REQUEST_CUSTOMER_LIST'
    });
    try {
      const response = await axios({
        method: 'get',
        url: `/json/customers.json`,
        responseType: 'json'
      });
      const json = await response.data;
      if (!json) throw new Error('unexpected json format');
      dispatch({
        type: 'RECEIVE_CUSTOMER_LIST',
        items: json
      });
    } catch(error) {
      dispatch({
        type: 'REQUEST_CUSTOMER_ERROR',
        error: 'error.message'
      });
      console.log(error.message);
    }
  }, [dispatch]);
  return fetchCustomerList;
};

export default useFetchCustomerList;
