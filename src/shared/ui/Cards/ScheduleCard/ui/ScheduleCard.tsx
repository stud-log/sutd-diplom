import { CustomActivity, Record, Timetable } from '@stud-log/news-types/models';

import { CalendarActivityType } from '@stud-log/news-types/enums';
import { FC, useState } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './ScheduleCard.module.scss';
import moment from 'moment';
import { truncate } from '@/shared/lib/helpers/truncateWords';
import { Reactions } from '@/features/Reactions';
import { mutate as globalMutate } from 'swr';
import { motion } from 'framer-motion';
import { store } from 'app/providers/ReduxProvider/ui/ReduxProvider';
import { customActivityModalActions } from 'widgets/Modals/CustomActivityModal/slice';

interface ScheduleCardProps{
  record: Record;
  className?: string;
  calendarElement: Timetable | CustomActivity;
  startDate: string;
  endDate: string;
  type: keyof typeof CalendarActivityType;
}

export const ScheduleCard: FC<ScheduleCardProps> = ({ className, calendarElement, type, endDate, startDate, record }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const toggleOpen = () => { setIsOpen(!isOpen); };

  const isTT = type == CalendarActivityType.timetable;
  const tt = calendarElement as Timetable;
  const ca = calendarElement as CustomActivity;
    
  const start = moment(startDate);
  const end = moment(endDate);
  const isActive = moment().isBetween(start, end);
  const isDO = isTT && tt.classroom == 'ДО';

  const globMutate = () => globalMutate((key: string) => key.includes('api/schedule'));
  const conditionalClasses = { [cls.active]: isActive, [cls.DO]: isDO, [cls.custom]: !isTT, [cls.open]: isOpen };

  return (
    <div>
      <motion.div
        onClick={toggleOpen}
        initial={false}
        animate={{ height: isOpen ? 'auto' : '58px' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.div className={classNames(cls.ScheduleCard, conditionalClasses, [ className, cls.state ])}>
          <div className={cls.leftSide}>
            <div className={cls.type}>{isTT ? `${tt.type}, ${tt.classroom}` : 'Событие'}</div>
            <div className={cls.title}>{truncate.apply(isTT ? `${tt.subject.shortTitle || tt.subject.title}` : ca.title, [ 22, false ])}</div>
          </div>
          <div className={cls.rightSide}>
            <div className={cls.start}>{start.format('HH:mm')}</div>
            <div className={cls.end}>{end.format('HH:mm')}</div>
          </div>
        </motion.div>
        {isOpen && (
          <motion.div
            className={cls.extraContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={classNames(cls.extraContentInner, conditionalClasses, [ cls.state ])}>
              <div className={cls.extraContentTeacher}>{isTT && tt.subject.teacherName}</div>
              {isDO && isTT && tt.link && <a className="event-desc__button event-desc__button_do" target="_blank" href={tt.link} rel="noreferrer">Зайти на пару</a>}
              {!isTT && <button className="event-desc__button event-desc__button_do" id={`custom-${record.id}`} onClick={() => store.dispatch(customActivityModalActions.openModal({ recordId: record.id }))}>Открыть</button>}
            </div>
          </motion.div>
        )}
      </motion.div>
      {isActive && <Reactions afterChange={globMutate} className={cls.reactions} meReacted={(record as any).meReacted} variant='expanded' reactions={record.reactions} recordId={record.id}/>}
    </div>
  );
};