import { createNanoEvents } from 'nanoevents';

export enum DATA_KEYS {
  PRODUCTS = 'products',
  PRICE_PLANS = 'price-plans',
  PAGES = 'pages',
}

export const dataEmitter = createNanoEvents();

export async function getDataFx<Data extends Record<'id', Uuid>>(
  STORAGE_KEY: DATA_KEYS,
  mockData: Data[]
) {
  let data: Data[] | null = JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? '[]'
  );

  if (!data?.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
    data = mockData;
  }

  return Promise.resolve(data);
}

export async function updateDataFx<Data extends Record<'id', Uuid>>(
  updatedData: Data,
  STORAGE_KEY: DATA_KEYS,
  mockData: Data[]
) {
  const data = await getDataFx<Data>(STORAGE_KEY, mockData);

  const updatedDataList = data.map((prev) => {
    if (prev.id === updatedData.id) {
      return updatedData;
    }
    return prev;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDataList));
  dataEmitter.emit(STORAGE_KEY);
  return Promise.resolve(updatedDataList);
}
