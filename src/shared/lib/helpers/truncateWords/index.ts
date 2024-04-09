export function truncate(this: string, n: number, useWordBoundary: boolean) {
  if (this.length <= n) {
    return this;
  }
  const subString = this.substr(0, n - 1);
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + '...';
}