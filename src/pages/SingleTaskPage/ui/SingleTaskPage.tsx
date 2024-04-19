import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { Button } from 'shared/ui/Button';
import { GetEntity } from '@stud-log/news-types/server/post.response';
import { HomeworkType } from '@stud-log/news-types/enums';
import { Layout } from 'shared/ui/Layout';
import { Record } from '@stud-log/news-types/models';
import { Schedule } from 'widgets/Schedule';
import { Select } from 'shared/ui/Select';
import cls from './SingleTaskPage.module.scss';
import { withWidget } from 'shared/hooks/withWidget';

const SingleTaskPage: FC = () => {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const {
    data: record,
    error,
    mutate,
  }: SWRResponse<GetEntity> = useSWR(
    recordId ? `/api/record/post/Homework/${recordId}` : null,
    $apiGet,
  );

  const hw = record?.homework;
  const meWorked = record?.meWorked;
  return (
    <Layout.Sticky className={cls.SchedulePage}>
      <Layout.StickyHeader slots={{
        start: <Button outline purpose='back' size='md' onClick={() => navigate(-1)}>Назад</Button>,
        end: <>
          {hw?.type == HomeworkType.group && meWorked?.length == 0 && <Button size='md' outline className={cls.headerBtn}>Выполнить в группе</Button>}
          {hw?.type == HomeworkType.individual && meWorked?.length == 0 && <Button size='md' outline>Начать выполнение</Button>}
          {/* <Select options={[]} onSelect={console.log}/> */}
        </>
      }}/>
      <Layout.StickyContent loading={!record}>
        s
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default withWidget(SingleTaskPage, Schedule);