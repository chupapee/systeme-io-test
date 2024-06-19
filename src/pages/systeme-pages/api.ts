import { useEffect, useState } from 'react';

import { DATA_KEYS, dataEmitter, getDataFx } from '@shared/config';

import { mockPages, Page } from './data';

export const usePages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDataFx<Page>(DATA_KEYS.PAGES, mockPages)
      .then(setPages)
      .finally(() => setLoading(false));
  }, []);

  dataEmitter.on(DATA_KEYS.PAGES, () => {
    getDataFx<Page>(DATA_KEYS.PAGES, mockPages).then(setPages);
  });

  return {
    pages,
    loading,
  };
};
