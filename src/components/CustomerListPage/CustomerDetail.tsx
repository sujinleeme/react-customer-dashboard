import * as React from 'react';

import { Avatar, Breadcrumbs, CardHeader, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { useEffect } from 'react';
import useFetchCustomer from '../../hooks/useFetchCustomer';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const headCells = ['No.', 'Portfolio Name',' Currency', 'recurring Investment Schedule', 'Initial Investment Amount']

const CustomerDetailPage = () => {
  const fetchCustomer = useFetchCustomer();
  const classes = useStyles();
  const customers = useSelector((state: State) => state.customers);
	const { currentItem,error } = customers
  const { id } = useParams();

  useEffect(() => {
    id && fetchCustomer(id);
	}, [fetchCustomer,id]);

  return (
		<>
			{error &&
				<Toolbar>
					<Typography>No customer's detail info. :(</Typography>
				</Toolbar>}
			{currentItem &&
				<>
					<Toolbar>
						<CardHeader
							className={classes.toolbar}
							avatar={
								<Avatar aria-label="recipe" className={classes.avatar}>
									{currentItem['name'].charAt(0)}
								</Avatar>
							}
						title={currentItem.name}
						subheader={`ID: ${currentItem.customerId}`}
							/>
				</Toolbar>
				<Toolbar className={classes.planTitleBar}>
					<Typography variant="subtitle1">Plans</Typography>
					<Breadcrumbs>
						<Typography variant="body2">
							Target Stock Ratio: {currentItem.targetStockRatio}
						</Typography>
						<Typography variant="body2">
							Target Stock Ratio: {currentItem.status}
						</Typography>
					</Breadcrumbs>
				</Toolbar>
					<Table>
					<TableHead >
						<TableRow >
							{headCells.map((cell,i) => <TableCell align="center" key={`${cell}-${i}-0`} className={classes.tableHead}>{cell}</TableCell>)}
						</TableRow>
						</TableHead>
						<TableBody>
						{currentItem.plans &&
							currentItem.plans.map((row, i) => 
									<TableRow key={`${row.goalId}-${i}`}>
										<TableCell align="center">
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
									</TableRow>
								)}
						</TableBody>
					</Table>
				</>
			}
		</>
	);
};

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 345
	},
	content: {
		display: 'center'
	},
	avatar: {
		backgroundColor: red[500]
	},
	toolbar: {
		margin: 0
	},
	planTitleBar: {
		justifyContent: 'space-between',
		borderBottom: '1px solid rgba(224, 224, 224, 1)'
	},
	tableHead: {
		fontWeight: "bolder"
	}
}));

export default CustomerDetailPage;
