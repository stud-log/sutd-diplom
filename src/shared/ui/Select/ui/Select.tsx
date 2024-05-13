import { CSSProperties, FC, ReactNode, useState } from 'react';

import { Select as ANTDSelect } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import DropdownArrow from 'shared/assets/img/select-arrow.svg';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
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
}

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: DefaultOptionType) =>
  (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase());

export const Select: FC<SelectProps> = ({ className, options, onSelect, mobileCentered = false, defaultOption, defaultText, popupMatchSelectWidth = true, needSearch = false, optionRender, suffixIcon, dropdownStyle, prefixIcon, shouldChangeValueOnSelect = true, asFormikField }) => {
  const [ isSelect, setIsSelect ] = useState(false);
  const isMobile = window.innerWidth <= 1400; // слабо
  return (
    <div className={classNames(cls.Dropdown, {
      'errored': !!asFormikField?.error,
      'justSelected': isSelect,
      'noRotateSuffixIcon': !!suffixIcon || !!prefixIcon,
      'prefixIcon': !!prefixIcon,
      'centered': isMobile && mobileCentered
    }, [ className, 'mySelect' ])}>
      <ANTDSelect
        popupMatchSelectWidth={popupMatchSelectWidth}
        labelInValue={true}
        suffixIcon={suffixIcon || prefixIcon || <DropdownArrow />}
        defaultValue={defaultOption ? defaultOption : defaultText ? { label: defaultText, value: defaultText } : options[0].value }
        className={cls.select}
        defaultActiveFirstOption={true}
        {...(!shouldChangeValueOnSelect ? { value: { label: defaultText!, value: defaultText! } }: {})}
        onChange={(v, o) => onSelect(o)}
        onDropdownVisibleChange={(e) => e && setIsSelect(false)}
        onBlur={() => setIsSelect(false)}
        onSelect={() => setIsSelect(true)}
        
        labelRender={({ label }) => <div className={classNames(cls.label, {}, [ 'myLabel' ])}>{label}</div>}
        
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