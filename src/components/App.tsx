import '../styles/index.css';
import '../styles/normalize.css';

import * as React from 'react';

import { Link, MemoryRouter, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

import CustomerListPage from './CustomerListPage';
import {
	Grid
} from "@material-ui/core";
import { State } from '../store/actions';
import { createBrowserHistory } from "history";
import useFetchCustomerList from '../hooks/useFetchCustomerList';
import { useSelector } from 'react-redux';

const history = createBrowserHistory();

const App: React.FC = () => {
	const customers = useSelector((state: State) => state.customers);
	const { isFetching } = customers;
	const fetchCustomerList = useFetchCustomerList();
	useEffect(() => {
		fetchCustomerList();
	}, [fetchCustomerList]);

	return (
    <Router history={history}>
			<Grid container>
				<Grid item xs={false} md={1} />
				<Grid item xs={12} md={10}>
					<CustomerListPage />
				</Grid>
				<Grid item xs={false} md={1} />
			</Grid>
		</Router>
	);
};
export default App;
