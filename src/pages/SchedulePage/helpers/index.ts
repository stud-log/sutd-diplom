import { CustomActivity, Timetable } from "@stud-log/news-types/models";

import { CalendarActivityType } from "@stud-log/news-types/enums";
import { GetSchedule } from "@stud-log/news-types/server/schedule.response";
import moment from "moment";

export const constructCalendar = (schedule: GetSchedule[]) => {
  return schedule.map(record => {
    const type = record.calendar.activityType;
    const isTT = type == CalendarActivityType.timetable;
    const calendarElement = type == CalendarActivityType.custom ? record.calendar.customActivity[0] : record.calendar.timetable[0];
      
    const tt = calendarElement as Timetable;
    const ca = calendarElement as CustomActivity;
    
    const start = moment(record.calendar.startDate);
    const end = moment(record.calendar.endDate);
    // const isActive = moment().isBetween(start, end);
    const isDO = isTT && tt.classroom == 'ДО';

    return {
      id: record.id,
      title: isTT ? tt.subject.title : ca.title,
      start,
      end,
      extendedProps: {
        isDO,
        isCustom: !isTT,
        room: isTT ? `${tt.type}, ${tt.classroom}` : 'Событие',
        teacher: isTT ? tt.subject.teacherName : '',
        type: isTT ? tt.type : ''
      },
      ...(!end ? {
        display: 'block'
      } : {})
    };
  });
};