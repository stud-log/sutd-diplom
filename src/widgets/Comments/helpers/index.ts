import moment from "moment";
import { pluralize } from "shared/lib/helpers/dates";

export function formatDate(dateString:string) {
  const now = moment();
  const date = moment(dateString);
  const diffMinutes = now.diff(date, 'minutes');
  const diffHours = now.diff(date, 'hours');
  const diffDays = now.diff(date, 'days');

  if (diffMinutes < 1) {
    return 'только что';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} ${pluralize(diffMinutes, 'минуту', 'минуты', 'минут')} назад`;
  } else if (diffHours < 12) {
    return `${diffHours} ${pluralize(diffHours, 'час', 'часа', 'часов')} назад`;
  } else if (diffHours >= 12 && diffHours < 48) {
    return 'вчера';
  } else if (diffDays < 8) {
    return `${diffDays} ${pluralize(diffDays, 'день', 'дня', 'дней')} назад`;
  } else {
    return date.format('D MMM');
  }
}

