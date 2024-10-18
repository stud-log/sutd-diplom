import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from '@/shared/http/helpers/apiGet';
import { FC } from 'react';
import { ScrumTable } from '@/widgets/ScrumTable';
import { UserTask } from '@stud-log/news-types/models';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './TodoTab.module.scss';

interface TodoTabProps {
  className?: string;
}

export const TodoTab: FC<TodoTabProps> = ({ className }) => {
  
  const {
    data: tasks,
    error,
    mutate,
  }: SWRResponse<UserTask[]> = useSWR(
    `/api/users/myTasks`,
    $apiGet,
  );

  return (
    <div className={classNames(cls.TodoTab, {}, [ className ])}>
      {tasks && <ScrumTable tasks={tasks}/>}
    </div>
  );
};