import { GetSchedule } from "@stud-log/news-types/server/schedule.response";
import moment from "moment";

export const groupByDay = (data: GetSchedule[]) => {
  const grouped: {[key: string] : GetSchedule[]} = {};
  data.forEach(item => {
    const date = moment(item.calendar.startDate).format('YYYY-MM-DD');
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });
  return grouped;
};