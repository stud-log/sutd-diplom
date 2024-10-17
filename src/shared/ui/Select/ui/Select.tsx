import { CSSProperties, FC, ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import AddIcon from '@/shared/assets/img/icons/add.svg?react';
import EditScheduleIcon from '@/shared/assets/img/icons/edit-schedule.svg?react';

import { Select as ANTDSelect } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import DropdownArrow from '@/shared/assets/img/select-arrow.svg?react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './Select.module.scss';

export type Option = { value: string; label: string; default?: boolean};
interface SelectProps {
  className?: string;
  onSelect: (value: DefaultOptionType) => void;
  options: DefaultOptionType[];
  defaultText?: string;
  defaultOption?: DefaultOptionType;
  needSearch?: boolean;
  suffixIcon?: ReactNode;
  prefixIcon?: ReactNode;
  prefixVariant?: 'add' | 'schedule';
  mobileCentered?: boolean;
  /**
   * defaultText must be set
   */
  shouldChangeValueOnSelect?: boolean;
  dropdownStyle?: CSSProperties;
  asFormikField?: {
    error?: string;
    passed?: boolean;
    required?: boolean;
  };
  optionRender?: ((oriOption: DefaultOptionType, info: {
    index: number;
  }) => ReactNode);
  popupMatchSelectWidth?: boolean;
  id?: string;
}

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: DefaultOptionType) =>
  (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase());

export const Select: FC<SelectProps> = ({ id, className, prefixVariant, options, onSelect, mobileCentered = false, defaultOption, defaultText, popupMatchSelectWidth = true, needSearch = false, optionRender, suffixIcon, dropdownStyle, prefixIcon, shouldChangeValueOnSelect = true, asFormikField }) => {
  const [ isSelect, setIsSelect ] = useState(false);
  const isMobile = window.innerWidth <= 1400; // слабо

  return (
    <div className={classNames(cls.Dropdown, {
      'errored': !!asFormikField?.error,
      'justSelected': isSelect,
      'noRotateSuffixIcon': !!suffixIcon || !!prefixIcon,
      'prefixIcon': !!prefixIcon,
      'centered': isMobile && mobileCentered
    }, [ className, 'mySelect', `id-${id}` ])}>
      <ANTDSelect
        popupMatchSelectWidth={popupMatchSelectWidth}
        labelInValue={true}
        suffixIcon={suffixIcon || prefixIcon || <DropdownArrow />}
        defaultValue={defaultOption ? defaultOption : defaultText ? { label: defaultText, value: defaultText } : options[0].value }
        className={cls.select}
        defaultActiveFirstOption={true}
        {...(!shouldChangeValueOnSelect ? { value: { label: defaultText!, value: defaultText! } }: {})}
        {...(id ? { id }: {})}
        onChange={(v, o) => onSelect(o)}
        onDropdownVisibleChange={(e) => e && setIsSelect(false)}
        onBlur={() => setIsSelect(false)}
        onSelect={() => setIsSelect(true)}
      
        labelRender={({ label }) => {
          //TODO: Какой-то костыль вышел - переделать
          if(prefixVariant && isMobile && mobileCentered) {
            switch(prefixVariant) {
              case 'add':
                return <>
                  <div className='mobile-select-arrow-centered'>
                    <AddIcon />
                    <div className={classNames(cls.label, {}, [ 'myLabel' ])}>{label}</div>
                  </div>
                </>;
              case 'schedule':
                return <>
                  <div className='mobile-select-arrow-centered'>
                    <EditScheduleIcon />
                    <div className={classNames(cls.label, {}, [ 'myLabel' ])}>{label}</div>
                  </div>
                </>;
            }
            
          }
          return <div className={classNames(cls.label, {}, [ 'myLabel' ])}>{label}</div>;
        }}
        
        {...(needSearch ? {
          showSearch: true,
          filterOption
        } : {})}
        {...(dropdownStyle ? { dropdownStyle } : {})}
        {...(optionRender ? { optionRender } : {})}
        options={options}
        
      />
    </div>
  );
};