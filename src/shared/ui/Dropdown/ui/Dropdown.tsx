import { ChangeEvent, FC, MouseEvent, ReactNode, useState } from 'react';

import { DefaultOptionType } from 'antd/es/select';
import DropdownArrow from 'shared/assets/img/select-arrow.svg';
import { Select } from 'antd';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Dropdown.module.scss';

export type Option = { value: string; label: string; default?: boolean};
interface DropdownProps {
  className?: string;
  onSelect: (value: string) => void;
  options: DefaultOptionType[];
}

export const Dropdown: FC<DropdownProps> = ({ className, options, onSelect }) => {
  const [ isSelect, setIsSelect ] = useState(false);
  
  return (
    <div className={classNames(cls.Dropdown, { 'justSelected': isSelect }, [ className, 'mySelect' ])}>
      <Select
        suffixIcon={<DropdownArrow />}
        defaultValue="Показать все"
        className={cls.select}
        onChange={onSelect}
        onDropdownVisibleChange={(e) => e && setIsSelect(false)}
        onBlur={() => setIsSelect(false)}
        onSelect={() => setIsSelect(true)}
        labelRender={({ value }) => <div className={classNames(cls.label, {}, [ 'myLabel' ])}>{value}</div>}
        options={options}
      />
    </div>
  );
};