export const getEmailSiteUrl = (email: string) => {
  const emailRegex = /@([a-z0-9-]+)\.([a-z]{2,})$/i;
  const match = email.match(emailRegex);

  if (match) {
    const domain = match[1];
    switch (domain) {
      case 'gmail':
        return 'https://mail.google.com/';
    
      case 'yahoo':
        return 'https://mail.yahoo.com/';
       
      case 'outlook':
        return 'https://outlook.live.com/';

      case 'mail':
        return 'https://mail.ru/';
       
      case 'yandex':
        return 'https://mail.yandex.ru/';

      case 'icloud':
        return 'https://www.icloud.com/mail/';
        
      default:
        return 'https://mail.ru/';
        
    }
  }
  return 'https://mail.ru/';
};