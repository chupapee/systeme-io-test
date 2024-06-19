import { useEffect, useState } from 'react';

import { useDebounced } from '../../hooks/use-debounced';
import { TableColumnFilter, TableColumnSorter, TableData } from './types';

export interface TableSortState<Data> {
  column: string;
  direction: 'asc' | 'desc';
  data: Data;
}

export function useTableSorter<Data extends Array<TableData>>(data: Data) {
  const [sortState, setSortState] = useState<TableSortState<Data>>({
    column: '',
    direction: 'asc',
    data,
  });

  const sortFx = (column: string, sorter?: TableColumnSorter<Data[number]>) => {
    const isAsc = sortState.direction === 'asc';

    const sortedData = data.sort((a, b) => {
      const x = isAsc ? a : b;
      const y = isAsc ? b : a;

      if (sorter) return sorter(x[column], y[column]);
      return String(x[column]).trim().localeCompare(String(y[column]).trim());
    });

    setSortState({
      column,
      direction: isAsc ? 'desc' : 'asc',
      data: sortedData,
    });
  };

  return {
    sortFx,
    sortState,
  };
}

interface TableFilterParams<Data extends Array<TableData>> {
  data: Data;
  column: {
    name: StringKeys<Data[number]>;
    filter?: TableColumnFilter<Data[number]>;
  };
  debounceTime?: number;
}

export function useTableFilter<Data extends Array<TableData>>({
  data,
  column,
  debounceTime = 0,
}: TableFilterParams<Data>) {
  const [localData, setLocalData] = useState(data);
  const [filterVal, setFilterVal] = useState('');
  const [debouncedVal] = useDebounced(filterVal, debounceTime);

  const onFilter = (val: string) => {
    setFilterVal(val);
  };

  useEffect(() => {
    const res = data.filter((x) => {
      const colName = x[column.name as keyof typeof x];
      // custom filter
      if (column.filter) {
        return column.filter(colName);
      }

      // default filter
      return String(colName).toLowerCase().includes(filterVal.toLowerCase());
    });

    setLocalData(res as Data);
  }, [debouncedVal]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  return { filterVal, onFilter, filteredData: localData };
}
