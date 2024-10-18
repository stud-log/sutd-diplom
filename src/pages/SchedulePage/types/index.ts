import { TimetableWeekparities } from "@stud-log/news-types/enums";

export interface FCEvent{
  title: string;
  date: string;
  start: string;
  end: string;
  info: FCExtendedProps;
}

export interface FCExtendedProps {
  recordId: number;
  isActiveNow: boolean;
  weekparity: keyof typeof TimetableWeekparities;
  isDO: boolean;
  isCustom: boolean;
  room: string;
  teacher: string | null;
  type: string;
  fullTitle: string;
  link: string;
  desc: string;
}