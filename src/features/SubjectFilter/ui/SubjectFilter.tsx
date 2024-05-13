import { DefaultOptionType, Select } from 'shared/ui/Select';

import { FC } from 'react';
import FilterSelectIcon from 'shared/assets/img/select-filter.svg';
import useGroupSubjects from 'shared/hooks/useGroupSubjects';

interface SubjectFilterProps {
  className?: string;
  onSelect: (value: DefaultOptionType) => void;
}

export const SubjectFilter: FC<SubjectFilterProps> = ({ className, onSelect }) => {
  const subjects = useGroupSubjects();
  const options = [ { id: -1, value: -1, label: 'Показать все', teacherName: '' } as DefaultOptionType ].concat(subjects);
  return (
    <Select className='onMobileSubjectFilter' onSelect={onSelect} options={options} suffixIcon={<FilterSelectIcon />} />
  );
};