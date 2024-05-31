import { FC, useEffect, useMemo, useRef, useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { Button } from 'shared/ui/Button';
import { FCEvent } from '../types';
import FullCalendar from '@fullcalendar/react';
import { GetSchedule } from '@stud-log/news-types/server/schedule.response';
import { Layout } from 'shared/ui/Layout';
import { Schedule } from 'widgets/Schedule';
import { Segmented } from 'antd';
import { TooltipTemplate } from '../helpers/tooltip';
import { ViewMountArg } from '@fullcalendar/core';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './SchedulePage.module.scss';
import { constructCalendar } from '../helpers';
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from '@fullcalendar/list';
import moment from 'moment';
import ruLocalce from '@fullcalendar/core/locales/ru';
import { scheduleModalActions } from 'widgets/Modals/ProfileModals/ScheduleModal/slice';
import timeGridPlugin from "@fullcalendar/timegrid";
import tippy from 'tippy.js';
import { useDispatch } from 'react-redux';
import userService from 'services/user.service';
import { store } from 'app/providers/ReduxProvider/ui/ReduxProvider';
import { customActivityModalActions } from 'widgets/Modals/CustomActivityModal/slice';

const SchedulePage: FC = () => {
  const { group, role } = userService.getUser();
  const calendar = useRef<FullCalendar | null>(null);
  const [ currentDatesRange, setCurrentDatesRange ] = useState('');

  const dispatch = useDispatch();

  const weekParity = moment().week() % 2;

  const {
    data: schedule,
    error,
    mutate,
  }: SWRResponse<GetSchedule[]> = useSWR(
    `/api/schedule/${group.id}?wholeTable=true`,
    url => $apiGet(url).then(r => {
      
      return r;
    }),
  );
  
  const updateCurrentViewDataRange = (viewProps?: ViewMountArg) => {
    const myView = viewProps?.view ?? calendar.current?.getApi().view;
    setCurrentDatesRange(`${moment(myView?.activeStart).format('D MMM')} - ${moment(myView?.activeEnd).format('D MMM')}`);
  };
  
  const go = (to: 'back' | 'next') => {
    const api = calendar.current?.getApi();
    if (to == 'back') {
      api?.prev();
    } else {
      api?.next();
    }
    updateCurrentViewDataRange();
  };

  const changeView = (view: 'Месяц' | 'Неделя' | 'День') => {
    const api = calendar.current?.getApi();
    switch (view) {
      case 'День':
        api?.changeView('timeGridDay');
        break;
      case 'Неделя':
        api?.changeView('timeGridWeek');
        break;
      case 'Месяц':
        api?.changeView('dayGridMonth');
        break;
    }
  };

  if(window.innerWidth <= 576) {

    return <Layout.Base className={cls.SchedulePage}>
      <Layout.BaseHeader slots={{
        start: <h1 className={cls.header}>
          <span>Расписание</span>
          <span className={cls.headerWeekparity}>{weekParity ? 'Неч.' : 'Чет.'}</span>
          <span className={cls.mobileEdit}>{role.permissions.canEdit && <Button outline size='md' purpose='edit' onClick={() => {dispatch(scheduleModalActions.openModal());}} />}</span>
        </h1>
      }}/>
      <Layout.BaseContent loading={!schedule} className={cls.mobileContent}>
        <Schedule />
      </Layout.BaseContent>;
    </Layout.Base>;
  }
  
  return (
    <Layout.Base className={cls.SchedulePage}>
      <Layout.BaseHeader slots={{
        start: <h1 className={cls.header}>
          <span>Расписание</span>
          <span className={cls.headerWeekparity}>{weekParity ? 'Неч.' : 'Чет.'}</span>
          <span className={cls.mobileEdit}>{role.permissions.canEdit && <Button outline size='md' purpose='edit' onClick={() => {dispatch(scheduleModalActions.openModal());}} />}</span>
        </h1>,
        middle: <div className={classNames(cls.calendarHeaderMiddle, {}, [ cls.desktop ])}>
          {role.permissions.canEdit && <Button outline size='md' purpose='edit' onClick={() => {dispatch(scheduleModalActions.openModal());}}>Изменить расписание</Button>}
          <Button size='md' purpose='back' outline onClick={() => go('back')} />
          {currentDatesRange}
          <Button size='md' purpose='back' style={{ transform: 'rotate(180deg)' }} outline onClick={() => go('next')} />
        </div>,
        end: <Segmented
          defaultValue={window.innerWidth <= 1000 ? 'Неделя': 'Месяц'}
          className='mySegmented'
          onChange={(value: 'Месяц' | 'Неделя' | 'День') => changeView(value)}
          options={[ 'Месяц', 'Неделя', 'День' ]}
        />
      }}/>
      <Layout.BaseContent loading={!schedule}>
        <div className={classNames(cls.diaryWrapper, {}, [ 'myFullCalendar' ])}>
          <FullCalendar
            viewDidMount={updateCurrentViewDataRange}
            ref={calendar}
            initialView={window.innerWidth <= 1000 ? 'timeGridWeek': 'dayGridMonth'}
            slotLabelFormat={e => `${e.date.hour}:${e.date.minute <= 9 ? `0${e.date.minute}` : e.date.minute}`}//24h in rows time display
            eventTimeFormat={{ hour12: false, hour: '2-digit', minute: '2-digit' }} //24h in event time display
            slotMinTime={`06:30:00`}
            slotLabelInterval={`1:25`}
            defaultTimedEventDuration={`1:25`}
            firstDay={1} //monday
            locale={ruLocalce}
            buttonText={{ today: 'Today' }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek dayGridMonth timeGridDay listWeek"
            }}
            plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
            height={window.innerWidth <= 1190 ? 'calc(100vh - 160px - 60px)' : 'calc(100vh - 160px)'}
            events={schedule ? constructCalendar(schedule) as any : undefined }
            //displayEventTime={false} //убираем время начала
            eventDisplay="list-item"
            eventClassNames={(args) => {
              // const _isActive = !args.isFuture && !args.isPast; // think is working too
              const myEvent = args.event._def.extendedProps as unknown as FCEvent['info'];
              let extraClass = '';
              if (myEvent.isDO) {extraClass = cls.doEvent;}
              if (myEvent.isActiveNow) {extraClass = cls.activeEvent;}
              if (myEvent.weekparity == 'even' && weekParity == 1) {extraClass = cls.notEqualTodayWeekparity;}
              if (myEvent.weekparity == 'odd' && weekParity == 2) {extraClass = cls.notEqualTodayWeekparity;}
              if (myEvent.isCustom) {extraClass = cls.customEvent;}
              
              return [ extraClass, cls.commonEventClass ];
            }}
            nowIndicator={true}
            allDaySlot={true} //отключаем поле All Day
            eventDidMount={({ el, event }) => {
              const extraProps = event._def.extendedProps as unknown as FCEvent['info'];
              const eventDesc = {
                title: event._def.title,
                date: moment(event.start).format('DD.MM.YYYY'),
                start: !extraProps.isCustom ? moment(event.start).format('HH:mm') : moment(event.start).format('DD.MM HH:mm'),
                end: !extraProps.isCustom ? moment(event.end).format('HH:mm') : moment(event.end).format('DD.MM HH:mm'),
                info: event._def.extendedProps,
              } as FCEvent;
              const customLinkEvent = (e: any) => {
                e.preventDefault();
                store.dispatch(customActivityModalActions.openModal({ recordId: eventDesc.info.recordId }));
              };

              tippy(el, {
                content: TooltipTemplate(eventDesc),
                allowHTML: true,
                animation: 'shift-toward',
                interactive: true,
                interactiveBorder: 5,
                placement: 'top-start',
                offset: [ 0, 5 ],
                duration: [ 250, 100 ],
                appendTo: () => document.body,
                onMount: instance => {
                  document.getElementById(`custom-${eventDesc.info.recordId}`)?.addEventListener('click', customLinkEvent);
                },
                onDestroy: instance => {
                  document.getElementById(`custom-${eventDesc.info.recordId}`)?.removeEventListener('click', customLinkEvent);
                },
              });
              
            }}

          />
        </div>
        <div className={classNames(cls.mobileControls, {}, [ cls.mobile ])}>
          <div className={cls.calendarHeaderMiddle}>
            <Button size='md' purpose='back' outline onClick={() => go('back')} />
            {currentDatesRange}
            <Button size='md' purpose='back' style={{ transform: 'rotate(180deg)' }} outline onClick={() => go('next')} />
          </div>
          
        </div>
      </Layout.BaseContent>
    </Layout.Base>
  );
};

export default SchedulePage;