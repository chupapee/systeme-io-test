import { useDisclosure } from '@shared/hooks';
import { Input, Modal, Table, useTableFilter } from '@shared/ui';

import { usePages } from './api';
import { Page } from './data';
import { EditPageForm } from './edit-page';

export const SystemePagesPage = () => {
  const { pages, loading } = usePages();
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
          actions: {
            headerName: 'Actions',
            renderCell: (page) => (
              <EditPageModal
                page={page}
                renderButton={(open) => <button onClick={open}>Edit</button>}
              />
            ),
          },
        }}
        data={filteredData}
        loading={loading}
        attributes={{
          tr: {
            className: 'even:bg-blue-100',
          },
        }}
      />
    </>
  );
};

export function EditPageModal({
  page,
  renderButton,
}: {
  page: Page;
  renderButton: (open: () => void) => JSX.Element;
}) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      {renderButton(open)}
      <Modal title="Edit Page" opened={opened} close={close}>
        <EditPageForm page={page} />
      </Modal>
    </>
  );
}
