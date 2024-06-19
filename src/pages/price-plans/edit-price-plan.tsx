import { useEffect, useState } from 'react';

import { DATA_KEYS, updateDataFx } from '@shared/config';
import { Input } from '@shared/ui';

import { mockPricePlans, PricePlan } from './data';

interface EditPricePlanProps {
  pricePlan: PricePlan;
}

export const EditPricePlanForm = ({ pricePlan }: EditPricePlanProps) => {
  const [localPricePlan, setLocalPricePlan] = useState(pricePlan);

  useEffect(() => {
    setLocalPricePlan(pricePlan);
  }, [pricePlan]);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        updateDataFx<PricePlan>(
          localPricePlan,
          DATA_KEYS.PRICE_PLANS,
          mockPricePlans
        ).then(close);
      }}
    >
      <Input
        value={localPricePlan.description}
        onChange={(e) =>
          setLocalPricePlan({ ...localPricePlan, description: e.target.value })
        }
        className="py-4"
      />
      <button className="bg-blue-600 text-white p-2" type="submit">
        Save
      </button>
    </form>
  );
};
