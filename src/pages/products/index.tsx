import { routesMap } from '@shared/config';

import { ProductsPage } from './page';

export const productsRoute = {
  path: routesMap.products,
  element: <ProductsPage />,
};
