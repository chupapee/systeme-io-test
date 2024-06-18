import { createBrowserRouter, Navigate } from 'react-router-dom';

import { pricePlansRoute } from '@pages/price-plans';
import { productsRoute } from '@pages/products';
import { systemePagesRoute } from '@pages/systeme-pages';
import { routesMap } from '@shared/config';
import { MainLayout } from '@shared/ui/layouts';

export const router = createBrowserRouter([
  {
    path: routesMap.main,
    element: <MainLayout />,
    children: [
      {
        path: routesMap.main,
        element: <Navigate to={routesMap.products} />,
      },
      productsRoute,
      pricePlansRoute,
      systemePagesRoute,
    ],
  },
]);
