import { useDisclosure } from '@shared/hooks';
import { Input, Modal, Table, useTableFilter } from '@shared/ui';

import { usePricePlans } from './api';
import { PricePlan } from './data';
import { EditPricePlanForm } from './edit-price-plan';

const DEBOUNCE_TIME = 500;
export const PricePlansPage = () => {
  const { pricePlans, loading } = usePricePlans();
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
          actions: {
            headerName: 'Actions',
            renderCell: (pricePlan) => (
              <EditPricePlanModal
                pricePlan={pricePlan}
                renderButton={(open) => <button onClick={open}>Edit</button>}
              />
            ),
          },
        }}
        data={filteredData}
        loading={loading}
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

export function EditPricePlanModal({
  pricePlan,
  renderButton,
}: {
  pricePlan: PricePlan;
  renderButton: (open: () => void) => JSX.Element;
}) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      {renderButton(open)}
      <Modal title="Edit PricePlan" opened={opened} close={close}>
        <EditPricePlanForm pricePlan={pricePlan} />
      </Modal>
    </>
  );
}
