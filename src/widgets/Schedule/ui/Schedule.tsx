import { FC, useEffect, useRef } from 'react';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { CalendarActivityType } from '@stud-log/news-types/enums';
import { GetSchedule } from '@stud-log/news-types/server/schedule.response';
import { Layout } from 'shared/ui/Layout';
import { ScheduleCard } from 'shared/ui/Cards/ScheduleCard';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Schedule.module.scss';
import { groupByDay } from '../helpers';
import moment from 'moment';
import userService from 'services/user.service';

interface ScheduleProps {
  className?: string;
}

export const Schedule: FC<ScheduleProps> = ({ className }) => {
  const { id } = userService.getGroup();
  const scheduleContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: schedule,
    error,
    mutate,
  }: SWRResponse<GetSchedule[]> = useSWR(
    `/api/schedule/${id}`,
    $apiGet,
  );

  useEffect(() => {
    
    if(schedule) {
   
      const today = moment().format('ddd');
      const todayElement = document.getElementById(today);
      if(!scheduleContainerRef.current) return;
      if (todayElement) {
        const offset = todayElement.offsetTop - scheduleContainerRef.current.offsetTop;
        scheduleContainerRef.current.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }

    }
    
  }, [ schedule ]); // Run this effect only once after component mount

  const groupedData = schedule ? groupByDay(schedule) : {};
  const weekParity = moment().week() % 2;

  const isMobile = window.innerWidth <= 576;
  
  if(isMobile) {
    return <div>
      {Object.keys(groupedData).map(day => (
        <div key={day} className={cls.weekdayWrapper} id={moment(day).format('ddd')}>
          <div className={cls.weekday}>
            <div className={cls.weekdayName}>{moment(day).format('dddd')}</div>
            <div className={cls.weekdayDate}>{moment(day).format('DD MMMM')}</div>
          </div>
          <div className={cls.elementsWrapper}>
            {groupedData[day].map((item, idx) => (
              <ScheduleCard
                key={idx}
                startDate={item.calendar.startDate}
                endDate={item.calendar.endDate}
                type={item.calendar.activityType}
                calendarElement={item.calendar.activityType == CalendarActivityType.custom ? item.calendar.customActivity[0] : item.calendar.timetable[0]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>;
  }
  return (
    <div className={classNames(cls.Schedule, {}, [ className ])}>
      <Layout.Sticky>
        <Layout.StickyHeader slots={{
          start: <h2 className={classNames(cls.header, {}, [ 'h1' ])}>
            <span>Расписание</span>
            <span className={cls.headerWeekparity}>{weekParity ? 'Неч.' : 'Чет.'}</span>
          </h2>
        }}/>
        <Layout.StickyContent innerRef={scheduleContainerRef} loading={!schedule} emptyData={schedule && schedule.length == 0 ? 'Здесь пока ничего нет' : undefined}>
          
          {Object.keys(groupedData).map(day => (
            <div key={day} className={cls.weekdayWrapper} id={moment(day).format('ddd')}>
              <div className={cls.weekday}>
                <div className={cls.weekdayName}>{moment(day).format('dddd')}</div>
                <div className={cls.weekdayDate}>{moment(day).format('DD MMMM')}</div>
              </div>
              <div className={cls.elementsWrapper}>
                {groupedData[day].map((item, idx) => (
                  <ScheduleCard
                    key={idx}
                    startDate={item.calendar.startDate}
                    endDate={item.calendar.endDate}
                    type={item.calendar.activityType}
                    calendarElement={item.calendar.activityType == CalendarActivityType.custom ? item.calendar.customActivity[0] : item.calendar.timetable[0]}
                  />
                ))}
              </div>
            </div>
          ))}
          
        </Layout.StickyContent>
      </Layout.Sticky>
    </div>
  );
};