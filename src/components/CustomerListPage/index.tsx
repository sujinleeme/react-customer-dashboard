import * as React from 'react';

import { useEffect, useState } from 'react';

import EnhancedTable from './EnhancedTable';
import { useSelector } from 'react-redux';

const CustomerListPage: React.FC = () => {
  const customers = useSelector((state: State) => state.customers);
  const { items, isFetching } = customers;

  const [dataTable, setDataTable] = useState([]);

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'E-mail',
    },
    {
      id: 'phone',
      numeric: true,
      disablePadding: false,
      label: 'Phone',
    },
    {
      id: 'createdAt',
      numeric: false,
      disablePadding: false,
      label: 'Resgistration Date'
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Status'
    },
  ];

  useEffect(() => {
    if (items.length > 0) {
      const createDataTable = items.reduce((acc, item) => {
        const {
          id,
          status,
          createdAt,
          email,
          personalDetails,
          phoneDetails,
        } = item;
        const newData = {
          id,
          status,
          createdAt,
          name: personalDetails ? personalDetails.legalName : '',
          email: email || '',
          phone: phoneDetails ? phoneDetails.number : '',
        };
        acc.push(newData);
        return acc;
      }, []);
      setDataTable(createDataTable);
    }
  }, [items]);


  return (
    <EnhancedTable
      isLoading={isFetching}
      bodyCells={dataTable}
      headCells={headCells}
      options={['ACTIVE','REGISTERING']}
      ></EnhancedTable>
  );
};

export default CustomerListPage;