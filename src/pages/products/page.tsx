import { Input, Table, TableColumns, useTableFilter } from '@shared/ui';

import { products } from './data';

type Product = (typeof products)[number];

const columns: TableColumns<Product> = {
  id: {
    headerName: 'ID',
  },
  name: {
    headerName: 'Name',
    sortable: true,
  },
  options: {
    headerName: 'Options',
    renderCell: (val) => {
      return val.size;
    },
    sortable: true,
    sorter: (a, b) => a.size.localeCompare(b.size),
  },
  active: {
    headerName: 'Status',
    renderCell(value) {
      return value ? 'Active' : 'Inactive';
    },
    sortable: true,
  },
};

export const ProductsPage = () => {
  const { filteredData, filterVal, onFilter } = useTableFilter({
    data: products,
    column: { name: 'name' },
  });

  return (
    <>
      <Input
        value={filterVal}
        onChange={(e) => onFilter(e.target.value)}
        type="text"
        className="mb-4"
        placeholder="filter by name"
      />
      <Table data={filteredData} columns={columns} />
    </>
  );
};
