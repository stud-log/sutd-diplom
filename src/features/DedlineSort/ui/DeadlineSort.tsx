import { DefaultOptionType, Select } from 'shared/ui/Select';

import { FC } from 'react';
import SortSelectIcon from 'shared/assets/img/select-sort.svg';
import cls from './DeadlineSort.module.scss';

interface DeadlineSortProps {
  className?: string;
  onSelect: (value: DefaultOptionType) => void;
}

export const DeadlineSort: FC<DeadlineSortProps> = ({ className, onSelect }) => {
  const options = [
    {
      label: 'По дате',
      title: 'publishDateSort',
      options: [
        { label: 'Сначала новое', value: 'publishDateSort.DESC' },
        { label: 'Сначала старое', value: 'publishDateSort.ASC' },
      ],
    },
    {
      label: 'По дедлайну',
      title: 'deadlineDateSort',
      options: [
        { label: <span className={cls.red}>По убыванию</span>, value: 'deadlineDateSort.ASC' },
        { label: <span className={cls.green}>По возрастанию</span>, value: 'deadlineDateSort.DESC' },
      ],
    },
  ] as DefaultOptionType[];
  return (
    <Select defaultOption={options[0].options[0]} onSelect={onSelect} options={options} suffixIcon={<SortSelectIcon />} />
  );
};