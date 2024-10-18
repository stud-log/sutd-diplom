
export const getStaticLink = (url: string) => {
  return import.meta.env.VITE_APP_API_URL as string + '/static' + url.replaceAll('\\', '/');
};