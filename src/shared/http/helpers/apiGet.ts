import { $api } from '../host';

export const $apiGet = async (apiURL: string, params?: any) =>
  await $api.get(apiURL, { params }).then(res => {
    return res.data;
  });
