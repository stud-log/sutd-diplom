import { FC, useRef } from 'react';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { FCEvent } from '../types';
import FullCalendar from '@fullcalendar/react';
import { GetSchedule } from '@stud-log/news-types/server/schedule.response';
import { Layout } from 'shared/ui/Layout';
import { TooltipTemplate } from '../helpers/tooltip';
import cls from './SchedulePage.module.scss';
import { constructCalendar } from '../helpers';
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from '@fullcalendar/list';
import moment from 'moment';
import ruLocalce from '@fullcalendar/core/locales/ru';
import timeGridPlugin from "@fullcalendar/timegrid";
import tippy from 'tippy.js';
import userService from 'services/user.service';

const SchedulePage: FC = () => {
  const { id } = userService.getGroup();
  const calendar = useRef<FullCalendar | null>(null);
  const {
    data: schedule,
    error,
    mutate,
  }: SWRResponse<GetSchedule[]> = useSWR(
    `/api/schedule/${id}?wholeTable=true`,
    $apiGet,
  );

  if(schedule) {
    console.log(constructCalendar(schedule));
  }
  return (
    <Layout.Sticky className={cls.SchedulePage}>
      <Layout.StickyHeader slots={{
        start: <h1>Расписание</h1>,
        
      }}/>
      <Layout.StickyContent loading={!schedule}>
        <div className={cls.diaryWrapper}>
          <FullCalendar
            ref={calendar}
            initialView={"dayGridMonth"}
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
            height='70vh'

            //displayEventTime={false} //убираем время начала
            events={constructCalendar(schedule!)}
            eventDisplay="list-item"
            nowIndicator={true}
            allDaySlot={true} //отключаем поле All Day
            eventDidMount={({ el, event }) => {
              const eventDesc = {
                title: event._def.title,
                date: moment(event.start).format('DD.MM.YYYY'),
                start: moment(event.start).format('HH:mm'),
                end: moment(event.end).format('HH:mm'),
                info: event._def.extendedProps,
              } as FCEvent;
              tippy(el, {
                content: TooltipTemplate(eventDesc),
                allowHTML: true,
                animation: 'shift-toward'
              });

            }}

          />
        </div>
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default SchedulePage;