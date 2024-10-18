export function downloadFile(url: string, filename: string, ext: string){
  const fileUrl = import.meta.env.VITE_APP_API_URL + '/static' + url.replaceAll('\\', '/');
    
  // Создаем ссылку на скачивание
  const link = document.createElement('a');
  link.href = fileUrl;
    
  // Устанавливаем атрибут загрузки и скрываем элемент
  link.setAttribute('download', filename);
  if(ext == 'png' || ext == 'jpg' || ext == 'jpeg' || ext == 'gif' || ext == 'webp') {
    link.setAttribute('target', '_blank');
  }
  link.style.display = 'none';
    
  // Добавляем ссылку в DOM и эмулируем клик по ней
  document.body.appendChild(link);
  link.click();
    
  // Удаляем ссылку из DOM
  document.body.removeChild(link);
}