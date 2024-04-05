import { FC, ReactNode, useState } from 'react';

import { Select as ANTDSelect } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import DropdownArrow from 'shared/assets/img/select-arrow.svg';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Select.module.scss';

export type Option = { value: string; label: string; default?: boolean};
interface SelectProps {
  className?: string;
  onSelect: (value: string) => void;
  options: DefaultOptionType[];
  defaultText?: string;
  needSearch?: boolean;
  suffixIcon?: ReactNode;
}

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: DefaultOptionType) =>
  (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase());

export const Select: FC<SelectProps> = ({ className, options, onSelect, defaultText, needSearch = false, suffixIcon }) => {
  const [ isSelect, setIsSelect ] = useState(false);
  
  return (
    <div className={classNames(cls.Dropdown, { 'justSelected': isSelect, 'noRotateSuffixIcon': !!suffixIcon }, [ className, 'mySelect' ])}>
      <ANTDSelect
        suffixIcon={suffixIcon || <DropdownArrow />}
        defaultValue={defaultText || "Показать все"}
        className={cls.select}
        defaultActiveFirstOption={true}
        onChange={onSelect}
        onDropdownVisibleChange={(e) => e && setIsSelect(false)}
        onBlur={() => setIsSelect(false)}
        onSelect={() => setIsSelect(true)}
        labelRender={({ value }) => <div className={classNames(cls.label, {}, [ 'myLabel' ])}>{value}</div>}
        {...(needSearch ? {
          showSearch: true,
          filterOption
        } : {})}
        options={options}
        
      />
    </div>
  );
};