
export const getStaticLink = (url: string) => {
  return process.env.API_URL as string + '/static' + url.replaceAll('\\', '/');
};