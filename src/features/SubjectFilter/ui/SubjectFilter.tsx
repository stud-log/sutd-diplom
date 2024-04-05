import { DefaultOptionType, Select } from 'shared/ui/Select';

import { FC } from 'react';
import FilterSelectIcon from 'shared/assets/img/select-filter.svg';
import useGroupSubjects from 'shared/hooks/useGroupSubjects';

interface SubjectFilterProps {
  className?: string;
  onSelect: (value: string) => void;
}

export const SubjectFilter: FC<SubjectFilterProps> = ({ className, onSelect }) => {
  const subjects = useGroupSubjects();
  const options = [ { id: -1, value: 'Показать все', label: 'Показать все', teacherName: '' } as DefaultOptionType ].concat(subjects);
  return (
    <Select onSelect={onSelect} options={options} suffixIcon={<FilterSelectIcon />} />
  );
};