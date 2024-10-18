export function truncate(this: string, n: number, useWordBoundary: boolean) {
  if (this.length <= n) {
    return this;
  }
  const subString = this.substr(0, n - 1);
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + '...';
}

export const trimHtml = (html: string, maxLength: number): string => {
  // Обрезаем строку до нужного количества символов
  let truncated = html.slice(0, maxLength);

  // Проверяем, не оборвался ли тег и находим незакрытые теги
  const openTags: string[] = [];
  const tagRegex = /<\/?([a-zA-Z]+)(?:\s[^>]*)?>/g;
  let match: RegExpExecArray | null;

  // Находим все теги в обрезанной строке
  while ((match = tagRegex.exec(truncated)) !== null) {
    if (match[0][1] === '/') {
      // Если это закрывающий тег, удаляем последний открытый тег
      openTags.pop();
    } else {
      // Иначе добавляем в массив открытый тег
      openTags.push(match[1]);
    }
  }

  // Закрываем незакрытые теги
  for (let i = openTags.length - 1; i >= 0; i--) {
    truncated += `</${openTags[i]}>`;
  }

  return truncated;
};