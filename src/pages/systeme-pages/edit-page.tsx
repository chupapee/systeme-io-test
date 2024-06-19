import { useEffect, useState } from 'react';

import { DATA_KEYS, updateDataFx } from '@shared/config';
import { Input } from '@shared/ui';

import { mockPages, Page } from './data';

interface EditPageProps {
  page: Page;
}

export const EditPageForm = ({ page }: EditPageProps) => {
  const [localPage, setLocalPage] = useState(page);

  useEffect(() => {
    setLocalPage(page);
  }, [page]);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        updateDataFx<Page>(localPage, DATA_KEYS.PAGES, mockPages).then(close);
      }}
    >
      <Input
        value={localPage.title}
        onChange={(e) => setLocalPage({ ...localPage, title: e.target.value })}
        className="py-4"
      />
      <button className="bg-blue-600 text-white p-2" type="submit">
        Save
      </button>
    </form>
  );
};
