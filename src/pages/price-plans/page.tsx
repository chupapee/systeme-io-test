import { Input, Table, useTableFilter } from '@shared/ui';

import { pricePlans } from './data';

const DEBOUNCE_TIME = 500;
export const PricePlansPage = () => {
  const { filteredData, filterVal, onFilter } = useTableFilter({
    data: pricePlans,
    column: { name: 'description' },
    debounceTime: DEBOUNCE_TIME,
  });

  return (
    <>
      <label className="flex flex-col mb-4">
        <span className="text-gray-400">debounce time: {DEBOUNCE_TIME}ms</span>
        <Input
          value={filterVal}
          onChange={(e) => onFilter(e.target.value)}
          type="text"
          placeholder="filter by description"
        />
      </label>

      <Table
        columns={{
          id: {
            headerName: 'ID',
          },
          description: {
            headerName: 'Description',
            sortable: true,
          },
          active: {
            headerName: 'Status',
            renderCell(value) {
              return value ? 'Active' : 'Inactive';
            },
          },
        }}
        data={filteredData}
        attributes={{
          tbody: {
            className: '[&>tr]:bg-gray-100',
          },
          tr: {
            className: 'even:bg-white',
          },
        }}
      />
    </>
  );
};
