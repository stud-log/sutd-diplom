import moment from 'moment';

//возвращает оставшееся время до дедлайна или false, если дедлайн просрочен
export function getRemainTime(deadline: string) {
  let remain_time = '';
  if (moment(deadline).isAfter(moment())) {
    const remain_actual_time = moment(deadline).diff(moment(), 'hours');
    remain_time =
      Math.floor(remain_actual_time / 24) > 0
        ? Math.floor(remain_actual_time / 24) + 'д ' + (remain_actual_time - (24 * Math.floor(remain_actual_time / 24))) + 'ч'
        : remain_actual_time - (24 * Math.floor(remain_actual_time / 24)) + 'ч';
  }
  return (remain_time = remain_time ? `Актуально еще ${remain_time}` : `Событие закончилось ${moment(deadline).format('D MMMM, HH:mm')}`);
}
export function getRemainDeadline(publishDate: any, deadline: any) {
  let progress = 0;
  let remainTime = '';
  let remainShort = '';

  if (deadline !== '0000-00-00') {
    const publicDate = moment(publishDate);
    const deadlineDate = moment(deadline);
    const wholeRopeWidth = deadlineDate.diff(publicDate, 'minutes');
    const fromStartToNow = moment().diff(publicDate, 'minutes');
    progress = Math.min((fromStartToNow / wholeRopeWidth) * 100, 100);
  }

  if (moment(deadline).isAfter(moment())) {
    const remain_actual_time = moment(deadline).diff(moment(), 'hours');
    const days = Math.floor(remain_actual_time / 24);
    const hours = remain_actual_time % 24;

    remainTime = days > 0 ? `${days}д ${hours}ч` : `${hours}ч`;
    remainShort = days > 0 ? `${days}д` : `${hours}ч`;
  }

  return { remainTime, progress, remainShort };
}
