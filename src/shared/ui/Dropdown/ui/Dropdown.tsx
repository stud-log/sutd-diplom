import { ChangeEvent, FC, MouseEvent, useState } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Dropdown.module.scss';
import { dropdownAnimationSettings } from '../config/animation.config';
import { motion } from 'framer-motion';

export type Option = { value: string; label: string; default?: boolean};
interface DropdownProps {
  className?: string;
  onSelect: (value: string) => void;
  options: Option[];
}

export const Dropdown: FC<DropdownProps> = ({ className, options, onSelect }) => {
  const [ selected, setSelected ] = useState<Option>(options.find(i => i.default)!);
  const [ isHover, toggleHover ] = useState(false);
  
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const onChangeSelected = (e: MouseEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLDivElement).dataset.value!;
    onSelect(value);
    setSelected(options.find(i => i.value == value)!);
  };

  return (
    <div className={classNames(cls.Dropdown, {}, [ className ])}>
      <motion.div
        className={cls.menuWrapper}
        onClick={toggleHoverMenu}
      >
        <span>{selected.label}</span>
        <motion.div
          className={cls.subMenu}
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={dropdownAnimationSettings}
        >
          
          {options.map((item, idx) => (
            <div key={idx} className={cls.subMenuItem} data-value={item.value} onClick={onChangeSelected}>{item.label}</div>
          ))}
         
        </motion.div>
      </motion.div>
    </div>
  );
};