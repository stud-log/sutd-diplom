import { FC, useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { GetAllEntities } from '@stud-log/news-types/server/post.response';
import { HomeworkCard } from 'shared/ui/Cards/HomeworkCard';
import { NewsCard } from 'shared/ui/Cards/NewsCard';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './FavoriteTab.module.scss';

interface ProfileTabProps {
  className?: string;
  favoriteTable: 'Домашка' | 'Новости';
}

export const FavoriteTab: FC<ProfileTabProps> = ({ className, favoriteTable }) => {
  const [ queryOptions, setQueryOptions ] = useState({ page: 1, limit: 25 });

  const {
    data: favorites,
    error,
    mutate,
  }: SWRResponse<GetAllEntities> = useSWR(
    `/api/record/posts/${favoriteTable == 'Домашка' ? 'Homework' : 'News'}?page=${queryOptions.page}&limit=${queryOptions.limit}&favorites=1`,
    $apiGet,
  );

  return (
    <div className={classNames(cls.FavoriteTab, {}, [ className ])}>
      {favorites && (favoriteTable == 'Домашка' ?
        <div className={cls.homeworkWrapper}>
          {favorites.rows.map((record, index) => (
            <HomeworkCard key={index} {...record}/>
          ))}
        </div> :
        <div className={cls.newsWrapper} >
          {favorites.rows.map((record, index) => (
            <NewsCard key={index} {...record}/>
          ))}
        </div>)}
    </div>
  );
};