import * as React from 'react';

import { Avatar, CardHeader, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { useEffect } from 'react';
import useFetchCustomer from '../../hooks/useFetchCustomer';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  content: {
    display: 'cente'
  },
  avatar: {
    backgroundColor: red[500]
  },
  toolbar: {
    margin: 0
  }
}));

const CustomerDetailPage = () => {
  const fetchCustomer = useFetchCustomer();
  const classes = useStyles();
  const customers = useSelector((state: State) => state.customers);
  const customer = customers.currentItem;
  const { id } = useParams();

  useEffect(() => {
    id && fetchCustomer(id);
	},[fetchCustomer,id]);
  return (
		<>
			{/* {!customer && <Toolbar>No Customer Info</Toolbar>} */}
			{customer &&
				<>
					<Toolbar>
						<CardHeader
							className={classes.toolbar}
							avatar={
								<Avatar aria-label="recipe" className={classes.avatar}>
									R
								</Avatar>
							}
							title={customer.name}
							subheader={customer.customerId}
							/>
					</Toolbar>
					<Toolbar>
						<Typography variant="body1">
							Target Stock Ratio: {customer.targetStockRatio}
						</Typography>
						<Typography variant="body1">
							Target Stock Ratio: {customer.status}
						</Typography>
						<Typography variant="subtitle1">Plans</Typography>
					</Toolbar>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="center" />
								<TableCell align="center">Portfolio Name</TableCell>
								<TableCell align="center">Currency</TableCell>
								<TableCell align="center">
									Recurring Investment Schedule
								</TableCell>
								<TableCell align="center">Initial Investment Amount</TableCell>
								<TableCell>Create </TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{customer.plans &&
								customer.plans.map((row, i) => 
									<TableRow key={`${row.goalId}-${i}`}>
										<TableCell component="th" scope="row">
											{i+1}
										</TableCell>
										<TableCell align="center">
											{row.modelPortfolioName}
										</TableCell>
										<TableCell align="center">{row.planCcy}</TableCell>
										<TableCell align="center">
											{row.recurringInvestmentSchedule && 
												<span>
													{row.recurringInvestmentSchedule.interval} /{' '}
													{row.recurringInvestmentSchedule.startingFrom} /{' '}
													{row.recurringInvestmentSchedule.amount}
												</span>
											}
										</TableCell>
										<TableCell align="right">
											{row.initialInvestmentAmount}
										</TableCell>
										<TableCell align="right">{row.createdAt}</TableCell>
									</TableRow>
								)}
						</TableBody>
					</Table>
				</>
			}
		</>
	);
};

export default CustomerDetailPage;
