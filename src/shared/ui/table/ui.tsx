import { PropsWithChildren, useEffect, useState } from 'react';

import { TableSortState, useTableFilter, useTableSorter } from './lib';
import {
  TableAttributes,
  TableColumnOptions,
  TableColumns,
  TableColumnSorter,
  TableData,
} from './types';

export interface TableProps<
  Data extends Array<TableData>,
  Cols extends TableColumns<Data[number]>,
> {
  data: Data;
  columns: Cols;
  attributes?: TableAttributes;
  loading?: boolean;
}

const defaultAttributes: TableAttributes = {
  table: {
    className: 'w-full border-2',
  },
  tr: {
    className: 'even:bg-gray-100',
  },
  th: {
    className: 'p-2 border-2 text-left',
  },
  td: {
    className: 'p-5',
  },
};

export const Table = <Data extends Array<TableData>>(
  props: TableProps<Data, TableColumns<Data[number]>>
) => {
  const { attributes = {}, data } = props;
  const [localData, setLocalData] = useState(data);
  const sorterOptions = useTableSorter(localData);

  useEffect(() => {
    if (Array.isArray(data)) {
      setLocalData(data);
    }
  }, [data]);

  return (
    <div>
      <table {...defaultAttributes.table} {...attributes.table}>
        <TableHeader {...props} {...sorterOptions} />
        <TableBody {...props} />
      </table>
    </div>
  );
};

type TableHeader<Data extends TableData[]> = TableProps<
  Data,
  TableColumns<Data[number]>
> & {
  sortState: TableSortState<Data>;
  sortFx: (column: string, sorter?: TableColumnSorter) => void;
};

function TableHeader<Data extends Array<TableData>>({
  columns,
  attributes = {},
  sortState,
  sortFx,
}: TableHeader<Data>) {
  return (
    <thead {...defaultAttributes.thead} {...attributes.thead}>
      <tr {...defaultAttributes.tr} {...attributes.tr}>
        {Object.entries(columns).map(
          ([key, opts]: [string, TableColumnOptions]) => (
            <th key={key} {...defaultAttributes.th} {...attributes.th}>
              <span>{opts.headerName}</span>

              {opts.sortable && (
                <button
                  className="ml-2"
                  onClick={() => sortFx(key, opts.sorter)}
                >
                  {sortState.column !== key
                    ? '▶️'
                    : sortState.direction === 'asc'
                      ? '▲'
                      : '▼'}
                </button>
              )}
            </th>
          )
        )}
      </tr>
    </thead>
  );
}

function TableBody<Data extends Array<TableData>>({
  columns,
  attributes = {},
  data,
  loading,
}: TableProps<Data, TableColumns<Data[number]>>) {
  if (loading) return 'loading...';
  if (data.length === 0) return 'Empty';

  const Row = ({ children }: PropsWithChildren) => (
    <td {...defaultAttributes.td} {...attributes.td}>
      {children}
    </td>
  );

  return (
    <tbody {...attributes.tbody} {...defaultAttributes.tbody}>
      {data.map((x) => (
        <tr key={x.id} {...defaultAttributes.tr} {...attributes.tr}>
          {Object.entries(x).map(([key, val]) => {
            const col = columns[key as keyof typeof columns];
            if (!col) return null;
            if ('renderCell' in col) {
              return <Row key={key}>{col.renderCell?.(val)}</Row>;
            }

            return <Row key={key}>{val.toString()}</Row>;
          })}
        </tr>
      ))}
    </tbody>
  );
}
