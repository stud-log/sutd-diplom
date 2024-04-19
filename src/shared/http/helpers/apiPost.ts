import { $api } from '../host';

export const $apiPost = async (apiURL: string, data?: any) =>
  await $api.post(apiURL, data).then(res => {
    return res.data;
  });
