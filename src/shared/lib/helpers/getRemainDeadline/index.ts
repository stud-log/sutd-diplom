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
  let wholeRopeWidth: any = '';
  let progress: any = '';
  let fromStartToNow: any = '';
  let remainTime = '';
  let remainShort = '';
  const publicDate = moment(publishDate);
  const pubicDate_startPoint = moment(publishDate);

  if (deadline !== '0000-00-00') {
    deadline = moment(deadline);
    wholeRopeWidth = deadline.diff(publicDate, 'minutes');
    fromStartToNow = moment().diff(pubicDate_startPoint, 'minutes');
    progress = Math.min((fromStartToNow / wholeRopeWidth) * 100, 100);
  }
  if (moment(deadline).isAfter(moment())) {
    const remain_actual_time = moment(deadline).diff(moment(), 'hours');
    remainTime =
      Math.floor(remain_actual_time / 24) > 0
        ? Math.floor(remain_actual_time / 24) + 'д ' + (remain_actual_time - (24 * Math.floor(remain_actual_time / 24))) + 'ч'
        : remain_actual_time - (24 * Math.floor(remain_actual_time / 24)) + 'ч';
    remainShort =
      Math.floor(remain_actual_time / 24) > 0
        ? Math.floor(remain_actual_time / 24) + 'д'
        : remain_actual_time - (24 * Math.floor(remain_actual_time / 24)) + 'ч';
  }
  return { remainTime, progress, remainShort };
}
