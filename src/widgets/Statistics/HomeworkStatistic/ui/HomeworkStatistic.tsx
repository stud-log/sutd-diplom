import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './HomeworkStatistic.module.scss';

interface HomeworkStatisticProps {
  className?: string;
}

const getPercent = (part: number, total: number) => {
  return Math.min((part / total) * 100, 100) + '%';
};

export const HomeworkStatistic: FC<HomeworkStatisticProps> = ({ className }) => {
  const {
    data: hwStats,
    error,
    mutate,
  }: SWRResponse<{
    total: number;
    inProgress: number;
    passed: number;
    feedback: number;
    unTaken: number;
  }> = useSWR(
    `/api/users/statistic/hw`,
    $apiGet,
  );
  return (
    <div className={classNames(cls.HomeworkStatistic, {}, [ className ])}>
      {hwStats && <div className={cls.wrapper}>
        <div className={cls.header}>Статистика <br /> по домашкам</div>
        <div className={cls.description}>
          Позже тут сформируется статистика за месяц
        </div>
        <div className={cls.tumbsWrapper}>
          <div className={classNames(cls.tumb, {}, [ cls.unTaken ])} style={{ height: getPercent(hwStats.unTaken, hwStats.total) }}>{hwStats.unTaken}</div>
          <div className={classNames(cls.tumb, {}, [ cls.passed ])} style={{ height: getPercent(hwStats.passed, hwStats.total) }}>{hwStats.passed}</div>
          <div className={classNames(cls.tumb, {}, [ cls.inProgress ])} style={{ height: getPercent(hwStats.inProgress + hwStats.feedback, hwStats.total) }}>{hwStats.inProgress + hwStats.feedback}</div>
        </div>
        <div className={cls.legend}>
          <div className={classNames(cls.legendItem, {}, [ cls.inProgressLegend ])}>В процессе</div>
          <div className={classNames(cls.legendItem, {}, [ cls.unTakenLegend ])}>Не начато</div>
          <div className={classNames(cls.legendItem, {}, [ cls.passedLegend ])}>Сделано</div>
        </div>
      </div>}
    </div>
  );
};