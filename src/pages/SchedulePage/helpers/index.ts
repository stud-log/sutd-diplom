import { CustomActivity, Timetable } from "@stud-log/news-types/models";
import { FCEvent, FCExtendedProps } from "../types";

import { CalendarActivityType } from "@stud-log/news-types/enums";
import { GetSchedule } from "@stud-log/news-types/server/schedule.response";
import moment from "moment";
import { truncate } from "shared/lib/helpers/truncateWords";

export const constructCalendar = (schedule: GetSchedule[]) => {
  return schedule.map(record => {
    const type = record.calendar.activityType;
    const isTT = type == CalendarActivityType.timetable;
    const calendarElement = type == CalendarActivityType.custom ? record.calendar.customActivity[0] : record.calendar.timetable[0];
      
    if(calendarElement) {
    
      const tt = calendarElement as Timetable;
      const ca = calendarElement as CustomActivity;
    
      const start = record.calendar.startDate;
      const end = record.calendar.endDate;
      const isActiveNow = moment().isBetween(moment(start), moment(end));
      const isDO = isTT && tt.classroom == 'ДО';

      return ({
        id: record.id,
        title: truncate.apply(isTT ? tt.subject.title : ca.title, [ 44, false ]),
        start,
        end,
        extendedProps: {
          isActiveNow,
          isDO,
          isCustom: !isTT,
          weekparity: isTT ? tt.weekparity : 'both',
          recordId: record.id,
          room: isTT ? `${tt.classroom}` : 'Событие',
          link: isTT ? tt.link : '',
          teacher: isTT ? tt.subject.teacherName : '',
          type: isTT ? tt.type : '',
          fullTitle: isTT ? tt.subject.title : ca.title
        } as FCExtendedProps,
      });
    }
    return undefined;
  }).filter(item => !!item);
};