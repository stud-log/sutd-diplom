/* eslint-disable no-useless-escape */
export function getFilenameAndExtension(filePath: string) {
  let filename = filePath.replace(/^.*[\\\/]/, ''); // Extract filename
  const fileExtension = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2); // Extract file extension
  filename = filename.slice(0, -(fileExtension.length + 1));
  return [ filename, fileExtension ];
}