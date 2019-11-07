import { Action } from '../store/actions';
import axios from 'axios';
import { baseUrl } from '../config/const'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useFetchCustomer = id => {
  const dispatch = useDispatch<Action>();
  // const customers = useSelector((state: State) => state.customers);

  const fetchCustomer = useCallback(async (id) => {
    dispatch({
      type: 'REQUEST_CUSTOMER'
    });
    try {
      const response = await axios({
				method: 'get',
        url: `/json/goal_${id}.json`,
				responseType: 'json'
			});
      const json = await response.data[0];
      if (!json) throw new Error('unexpected json format');
      dispatch({
        type: 'RECEIVE_CUSTOMER',
        item: json
      });
    } catch(error) {
      dispatch({
        type: 'RECEIVE_CUSTOMER',
        item: {},
        error: error.message
      });
      console.log(error.message);
    }
  }, [dispatch]);
  return fetchCustomer;
};

export default useFetchCustomer;
