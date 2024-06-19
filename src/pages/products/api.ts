import { useEffect, useState } from 'react';

import { DATA_KEYS, dataEmitter, getDataFx } from '@shared/config';

import { mockProducts, Product } from './data';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDataFx<Product>(DATA_KEYS.PRODUCTS, mockProducts)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  dataEmitter.on(DATA_KEYS.PRODUCTS, () => {
    getDataFx<Product>(DATA_KEYS.PRODUCTS, mockProducts).then(setProducts);
  });

  return {
    products,
    loading,
  };
};
