import { useDisclosure } from '@shared/hooks';
import { Input, Modal, Table, TableColumns, useTableFilter } from '@shared/ui';

import { useProducts } from './api';
import { Product } from './data';
import { EditProductForm } from './edit-product';

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
  actions: {
    headerName: 'Actions',
    renderCell: (product) => (
      <EditProductModal
        product={product}
        renderButton={(open) => <button onClick={open}>Edit</button>}
      />
    ),
  },
};

export const ProductsPage = () => {
  const { products, loading } = useProducts();

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
      <Table data={filteredData} loading={loading} columns={columns} />
    </>
  );
};

export function EditProductModal({
  product,
  renderButton,
}: {
  product: Product;
  renderButton: (open: () => void) => JSX.Element;
}) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      {renderButton(open)}
      <Modal title="Edit Product" opened={opened} close={close}>
        <EditProductForm product={product} />
      </Modal>
    </>
  );
}
