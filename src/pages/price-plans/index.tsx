import { Suspense } from 'react';

import { routesMap } from '@shared/config';
import { PageLoading } from '@shared/ui';

import { PricePlansPage } from './page';

export const pricePlansRoute = {
  path: routesMap.pricePlans,
  element: (
    <Suspense fallback={<PageLoading />}>
      <PricePlansPage />
    </Suspense>
  ),
};
