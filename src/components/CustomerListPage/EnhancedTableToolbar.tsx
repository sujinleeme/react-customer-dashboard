import * as React from 'react';

import { Toolbar, Typography } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import SearchField from './SearchField';
import clsx from 'clsx';

const useToolbarStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1)
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85)
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark
			  },
	title: {
		flex: '1 1 100%'
	}
}));

const EnhancedTableToolbar = props => {
	const classes = useToolbarStyles();
	const { numSelected, handleRequestSearch } = props;

	return (
		<Toolbar className={clsx(classes.root, {})}>
			<Link to="/">
				<Typography className={classes.title} variant="h6" id="tableTitle">
					Customer Dashboard
				</Typography>
			</Link>
			<SearchField onChange={handleRequestSearch} />
		</Toolbar>
	);
};

export default EnhancedTableToolbar;
EnhancedTableToolbar.propTypes = {};
