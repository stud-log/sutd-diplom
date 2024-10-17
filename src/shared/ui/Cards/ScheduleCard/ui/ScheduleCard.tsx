import { CustomActivity, Record, Timetable } from '@stud-log/news-types/models';

import { CalendarActivityType } from '@stud-log/news-types/enums';
import { FC } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './ScheduleCard.module.scss';
import moment from 'moment';
import { truncate } from '@/shared/lib/helpers/truncateWords';
import { Reactions } from '@/features/Reactions';
import { mutate as globalMutate } from 'swr';

interface ScheduleCardProps{
  record: Record;
  className?: string;
  calendarElement: Timetable | CustomActivity;
  startDate: string;
  endDate: string;
  type: keyof typeof CalendarActivityType;
}

export const ScheduleCard: FC<ScheduleCardProps> = ({ className, calendarElement, type, endDate, startDate, record }) => {
  const isTT = type == CalendarActivityType.timetable;
  const tt = calendarElement as Timetable;
  const ca = calendarElement as CustomActivity;
    
  const start = moment(startDate);
  const end = moment(endDate);
  const isActive = moment().isBetween(start, end);
  const isDO = isTT && tt.classroom == 'ДО';

  const globMutate = () => globalMutate((key: string) => key.includes('api/schedule'));

  return (
    <div>
      <div className={classNames(cls.ScheduleCard, { [cls.active]: isActive, [cls.DO]: isDO, [cls.custom]: !isTT }, [ className ])}>
        <div className={cls.leftSide}>
          <div className={cls.type}>{isTT ? `${tt.type}, ${tt.classroom}` : 'Событие'}</div>
          <div className={cls.title}>{truncate.apply(isTT ? `${tt.subject.shortTitle || tt.subject.title}` : ca.title, [ 22, false ])}</div>
        </div>
        <div className={cls.rightSide}>
          <div className={cls.start}>{start.format('HH:mm')}</div>
          <div className={cls.end}>{end.format('HH:mm')}</div>
        </div>
      </div>
      {isActive && <Reactions afterChange={globMutate} className={cls.reactions} meReacted={(record as any).meReacted} variant='expanded' reactions={record.reactions} recordId={record.id}/>}
    </div>
  );
};