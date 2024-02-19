import { $api } from '../host';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const $apiPost = async (apiURL: string, data?: any) =>
  await $api.post(apiURL, data).then(res => {
    return res.data;
  });
