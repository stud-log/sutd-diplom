import { ButtonHTMLAttributes, FC, ReactNode, useMemo } from 'react';

import AddIcon from '@/shared/assets/img/icons/add.svg?react';
import BackIcon from '@/shared/assets/img/icons/back.svg?react';
import EditGroupIcon from '@/shared/assets/img/icons/edit-group.svg?react';
import EditIcon from '@/shared/assets/img/icons/edit.svg?react';
import EditScheduleIcon from '@/shared/assets/img/icons/edit-schedule.svg?react';
import LogoutIcon from '@/shared/assets/img/icons/log-out.svg?react';
import SettingsIcon from '@/shared/assets/img/icons/settings.svg?react';
import TrashIcon from '@/shared/assets/img/icons/trash.svg?react';
import TrophyIcon from '@/shared/assets/img/icons/trophy.svg?react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size: "md" | "lg";
  outline?: boolean;
  purpose?: "back" | "edit" | "add" | "editGroup" | "editSchedule" | "delete" | 'settings' | 'logout' | 'trophy';
  loading?: boolean;
  showIcon?: boolean;
}

const Loader: FC = () => (<div className={cls.loader}></div>);

export const Button: FC<ButtonProps> = ({ size, outline = false, showIcon= true, className, children, loading = false, purpose, ...rest }) => {
  const classes = classNames(cls.Button, {
    [cls.outline]: outline,
    [cls.pressed]: loading,
    [cls.loading]: loading,
    [cls.withIcon]: !!purpose,
    [cls.purposeDelete]: purpose == 'delete' || purpose == 'logout',
    [cls.disabled]: !!rest.disabled
  }, [ className, cls[size] ]);
  const Icon = purpose == 'edit' ?
    EditIcon : purpose == 'back' ?
      BackIcon : purpose == 'add' ?
        AddIcon : purpose == 'editGroup' ?
          EditGroupIcon : purpose == 'editSchedule' ?
            EditScheduleIcon : purpose == 'delete' ?
              TrashIcon : purpose == 'settings' ?
                SettingsIcon : purpose == 'logout' ?
                  LogoutIcon : purpose == 'trophy' ?
                    TrophyIcon : null;
  return (
    <button className={classes} type='button' disabled={loading} {...rest}>{loading && <Loader/>}{Icon && showIcon && <Icon />}{children}</button>
  );
};