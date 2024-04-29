import * as Yup from 'yup';

import { TimetableTypes, TimetableWeekparities } from '@stud-log/news-types/enums';

import { Timetable } from '@stud-log/news-types/models';

export interface ScheduleModalSchema {
  isModalOpen: boolean;
}

export const WeekparityTypes = [
  { label: 'По четным', value: TimetableWeekparities.even },
  { label: 'По нечетным', value: TimetableWeekparities.odd },
  { label: 'Всегда', value: TimetableWeekparities.both },
];

export const TimetableType = [
  { label: 'Лекция', value: "Лек" },
  { label: 'Практика', value: "Пр" },
];

export const DistantOptions = [
  { value: 'Очно', label: 'Очно' },
  { value: 'ДО', label: 'Дистанционно' },
];

export interface InitialValues {
  Mon: Timetable[];
  Tue: Timetable[];
  Wed: Timetable[];
  Thu: Timetable[];
  Fri: Timetable[];
  Sat: Timetable[];
  Sun: Timetable[];
}

export const validationSchema = Yup.object().shape({
  
});

