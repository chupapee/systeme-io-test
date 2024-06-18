import { Input, Table, useTableFilter } from '@shared/ui';

import { pages } from './data';

export const SystemePagesPage = () => {
  const { filteredData, filterVal, onFilter } = useTableFilter({
    data: pages,
    column: { name: 'title' },
  });

  return (
    <>
      <Input
        value={filterVal}
        onChange={(e) => onFilter(e.target.value)}
        type="text"
        className="mb-4"
        placeholder="filter by title"
      />
      <Table
        columns={{
          id: {
            headerName: 'ID',
          },
          title: {
            headerName: 'Title',
            sortable: true,
          },
          active: {
            headerName: 'Status',
            renderCell(value) {
              return value ? 'Active' : 'Inactive';
            },
          },
          publishedAt: {
            headerName: 'Published date',
            renderCell(value) {
              return new Date(value).toLocaleDateString();
            },
          },
        }}
        data={filteredData}
        attributes={{
          tr: {
            className: 'even:bg-blue-100',
          },
        }}
      />
    </>
  );
};
