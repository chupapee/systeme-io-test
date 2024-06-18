import { DetailedHTMLProps, TableHTMLAttributes } from 'react';

export interface TableData {
  id: Uuid;
  [key: string]: any;
}

export type TableColumnSorter<Value = unknown> = (a: Value, b: Value) => number;
export type TableColumnFilter<Value = unknown> = (x: Value) => boolean;

export interface TableColumnOptions<Value = unknown> {
  headerName: string | React.ReactNode;
  renderCell?: (value: Value) => React.ReactNode;

  sorter?: TableColumnSorter<Value>;
  sortable?: boolean;
}

export type TableColumns<Col extends TableData> = {
  [K in keyof Col]?: TableColumnOptions<Col[K]>;
};

export type TableAttributes = Partial<{
  table: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >;
  thead: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;
  tbody: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;
  tr: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >;
  th: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >;
  td: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >;
}>;
