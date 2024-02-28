import { $api } from '../host';

export const $apiGet = async (apiURL: string) =>
  await $api.get(apiURL).then(res => {
    return res.data;
  });
