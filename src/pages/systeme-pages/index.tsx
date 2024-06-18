import { lazy, Suspense } from 'react';

import { routesMap } from '@shared/config';
import { PageLoading } from '@shared/ui';

const SystemePagesPage = lazy(() =>
  import('./page').then(({ SystemePagesPage }) => ({
    default: SystemePagesPage,
  }))
);

export const systemePagesRoute = {
  path: routesMap.systemePages,
  element: (
    <Suspense fallback={<PageLoading />}>
      <SystemePagesPage />
    </Suspense>
  ),
};
