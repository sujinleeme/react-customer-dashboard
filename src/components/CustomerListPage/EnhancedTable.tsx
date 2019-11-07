import * as React from 'react';

import { LinearProgress, Paper, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { Route, Switch, useHistory } from 'react-router-dom';
import { getSorting, stableSort } from './Sortmethods';

import CustomerDetail from './CustomerDetail';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';

const EnhancedTable = ({ headCells, options, bodyCells, isLoading }) => {
  const classes = useStyles();
  const history = useHistory();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [rows,setRows] = React.useState([]);
  const [statusOptions,setStatusOptions] = React.useState(options.reduce((acc,elem) => {
    acc[elem] = true;
    return acc;
  },{}))

  // const { 'ACTIVE', 'REGISTERING' } = statusOptions;

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    event.preventDefault();
    return history.push({
      pathname: `/customer/${id}`,
      search: ''
    });
  };

  const handleRequestSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const handleSelectOption = option => (
    event: MouseEvent<HTMLButtonElement>,
  ): void => {
    setStatusOptions({ ...statusOptions, [option]: event.target.checked });
  };
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(() => {


    const filteredBySearchTerm = (items) => items.filter(
      item =>
        item.email.includes(searchTerm) ||
        item.name.includes(searchTerm)
    );

    if(bodyCells.length > 0) {
      
      // filter the customer list if email or name matches in search input.  

      if(searchTerm.length > 0) {
        setRows(filteredBySearchTerm(rows));
      }
          
      // else {
      //   setRows(filteredBySearchTerm(rows));
      // }

      // filter the customer list if email or name matches in search input.  
      if(!statusOptions['ACTIVE'] && !statusOptions['REGISTERING']) {
        setRows([])
      }
      
      else {
        const filteredByStatus = bodyCells.filter(item => statusOptions[item.status])
        setRows(filteredBySearchTerm(filteredByStatus))
      }
    }
    
  },[bodyCells,searchTerm,statusOptions]);

  return (
    <div className={classes.root}>
      {isLoading && <LinearProgress />}
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          handleRequestSearch={handleRequestSearch}
          />
        <div className={classes.tableWrapper}>
          <Switch>
            <Route path="/customer/:id">
              <CustomerDetail />
            </Route>
            <Route exact path="/">
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="enhanced table"
                >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  options={statusOptions}
                  orderBy={orderBy}
                  headCells={headCells}
                  onRequestSort={handleRequestSort}
                  onRequestSelectOption={handleSelectOption}
                  rowCount={rows.length}
                />
                {rows && 
                  <TableBody>
                    {stableSort(rows, getSorting(order, orderBy))
                      .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            onClick={event => handleClick(event, row.id)}
                            key={`${row.id}-row`} >
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              align="center" >
                              {row.name}
                            </TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="center">{row.createdAt}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && 
                      <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    }
                  </TableBody>
                }
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{ 'aria-label': 'previous page' }}
                nextIconButtonProps={{ 'aria-label': 'next page' }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Route>
          </Switch>
        </div>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

export default EnhancedTable;