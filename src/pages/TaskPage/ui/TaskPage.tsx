import { FC, useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { DeadlineSort } from 'features/DedlineSort';
import { GetAllEntities } from '@stud-log/news-types/server/post.response';
import { HomeworkCard } from 'shared/ui/Cards/HomeworkCard';
import { Layout } from 'shared/ui/Layout';
import { Schedule } from 'widgets/Schedule';
import { SubjectFilter } from 'features/SubjectFilter';
import cls from './TaskPage.module.scss';
import { withWidget } from 'shared/hooks/withWidget';

const TaskPage: FC = () => {
  const [ queryOptions, setQueryOptions ] = useState({ page: 1, limit: 25, subjectId: -1, publishDateSort: 'DESC', deadlineDateSort: 'none' });

  const {
    data: tasks,
    error,
    mutate,
  }: SWRResponse<GetAllEntities> = useSWR(
    `/api/record/posts/Homework?page=${queryOptions.page}&limit=${queryOptions.limit}&subjectId=${queryOptions.subjectId}&deadlineDateSort=${queryOptions.deadlineDateSort}&publishDateSort=${queryOptions.publishDateSort}`,
    $apiGet,
  );

  return (
    <Layout.Sticky className={cls.SchedulePage}>
      <Layout.StickyHeader slots={{
        start: <h1>Домашка</h1>,
        end: <>
          <DeadlineSort
            onSelect={v => {
              const [ type, sort ] = (v.value as string).split('.');
              setQueryOptions(prev => ({ ...prev, [type]: sort }));
            }}/>
          <SubjectFilter onSelect={v => setQueryOptions(prev => ({ ...prev, subjectId: v.value as number }))}/>
        </>
      }}/>
      <Layout.StickyContent loading={!tasks} emptyData={tasks && tasks.rows.length == 0 ? 'Здесь пока ничего нет' : undefined}>
        <div className={cls.hwWrapper}>
          {tasks && tasks.rows.map((record, index) => (
            <HomeworkCard key={index} {...record}/>
          ))}
        </div>
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default withWidget(TaskPage, [ Schedule ]);