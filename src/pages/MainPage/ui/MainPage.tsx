import { FC, useEffect, useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { GetAllEntities } from '@stud-log/news-types/server/post.response';
import { Layout } from 'shared/ui/Layout';
import { NewsCard } from 'shared/ui/Cards/NewsCard';
import { NewsLabelsOptions } from 'widgets/Modals/ProfileModals/AddAndEditModal/types';
import { Schedule } from 'widgets/Schedule';
import { Select } from 'shared/ui/Select';
import cls from './MainPage.module.scss';
import { dropdownFilterOptions } from '../config';
import { withWidget } from 'shared/hooks/withWidget';

const MainPage: FC = () => {
  const [ queryOptions, setQueryOptions ] = useState({ page: 1, limit: 25, label: '-1' });

  const {
    data: news,
    error,
    mutate,
  }: SWRResponse<GetAllEntities> = useSWR(
    `/api/record/posts/News?page=${queryOptions.page}&limit=${queryOptions.limit}&label=${queryOptions.label}`,
    $apiGet,
  );
  return (
    <Layout.Sticky className={cls.MainPage}>
      <Layout.StickyHeader slots={{
        start: <h1>Новости</h1>,
        end: <>
          <Select options={NewsLabelsOptions} onSelect={v => setQueryOptions(prev => ({ ...prev, label: v.value as string }))}/>
          
        </>
      }} />
      <Layout.StickyContent loading={!news} emptyData={news && news.rows.length == 0 ? 'Здесь пока ничего нет' : undefined}>
        <div className={cls.newsWrapper}>
          {news && news.rows.map((record, index) => (
            <NewsCard key={index} {...record}/>
          ))}
        </div>
    
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default withWidget(MainPage, [ Schedule ]);