import { useEffect, useState } from 'react';

import { DATA_KEYS, updateDataFx } from '@shared/config/api';
import { Input } from '@shared/ui';

import { mockProducts, Product } from './data';

interface EditProductProps {
  product: Product;
}

export const EditProductForm = ({ product }: EditProductProps) => {
  const [localProduct, setLocalProduct] = useState(product);

  useEffect(() => {
    setLocalProduct(product);
  }, [product]);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        updateDataFx<Product>(
          localProduct,
          DATA_KEYS.PRODUCTS,
          mockProducts
        ).then(close);
      }}
    >
      <Input
        value={localProduct.name}
        onChange={(e) =>
          setLocalProduct({ ...localProduct, name: e.target.value })
        }
        className="py-4"
      />
      <button className="bg-blue-600 text-white p-2" type="submit">
        Save
      </button>
    </form>
  );
};
