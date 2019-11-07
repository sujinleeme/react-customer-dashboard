import * as React from 'react';

import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';

import CheckBoxDropDownMenu from './CheckBoxDropDownMenu';

const EnhancedTableHead = (props) => {
	const { classes,order,orderBy,numSelected,rowCount,onRequestSort,onRequestSelectOption,headCells,options } = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => 
					<TableCell
						key={`${headCell.id}-headcell`}
						align="center"
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={order}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? 
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							 : null}
						</TableSortLabel>
						{headCell.id === 'status' && 
							<CheckBoxDropDownMenu options={options} onChange={onRequestSelectOption}/>
						}
					</TableCell>
				)}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	// classes: PropTypes.object.isRequired,
	// numSelected: PropTypes.number.isRequired,
	// onRequestSort: PropTypes.func.isRequired,
	// order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	// orderBy: PropTypes.string.isRequired,
	// rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
