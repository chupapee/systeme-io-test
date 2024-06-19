import { useEffect, useState } from 'react';

import { DATA_KEYS, dataEmitter, getDataFx } from '@shared/config';

import { mockPricePlans, PricePlan } from './data';

export const usePricePlans = () => {
  const [pricePlans, setPricePlans] = useState<PricePlan[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDataFx<PricePlan>(DATA_KEYS.PRICE_PLANS, mockPricePlans)
      .then(setPricePlans)
      .finally(() => setLoading(false));
  }, []);

  dataEmitter.on(DATA_KEYS.PRICE_PLANS, () => {
    getDataFx<PricePlan>(DATA_KEYS.PRICE_PLANS, mockPricePlans).then(
      setPricePlans
    );
  });

  return {
    pricePlans,
    loading,
  };
};
