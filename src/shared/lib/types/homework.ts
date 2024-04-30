import { DefaultOptionType } from "antd/es/select";
import { UserTaskStatus } from "@stud-log/news-types/enums";

export const HomeworksStatusOptions: DefaultOptionType[] = [
  { label: 'В процессе', value: UserTaskStatus.inProgress },
  { label: 'На проверке', value: UserTaskStatus.feedback },
  { label: 'Сдано', value: UserTaskStatus.passed },
];

export const HomeworksStatusRU = {
  [UserTaskStatus.inProgress]: 'В процессе',
  [UserTaskStatus.feedback]: 'На проверке',
  [UserTaskStatus.passed]: 'Сдано',
};