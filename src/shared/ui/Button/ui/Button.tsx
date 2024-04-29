import { ButtonHTMLAttributes, FC, ReactNode, useMemo } from 'react';

import AddIcon from 'shared/assets/img/icons/add.svg';
import BackIcon from 'shared/assets/img/icons/back.svg';
import EditGroupIcon from 'shared/assets/img/icons/edit-group.svg';
import EditIcon from 'shared/assets/img/icons/edit.svg';
import EditScheduleIcon from 'shared/assets/img/icons/edit-schedule.svg';
import TrashIcon from 'shared/assets/img/icons/trash.svg';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size: "md" | "lg";
  outline?: boolean;
  purpose?: "back" | "edit" | "add" | "editGroup" | "editSchedule" | "delete";
  loading?: boolean;
}

const Loader: FC = () => (<div className={cls.loader}></div>);

export const Button: FC<ButtonProps> = ({ size, outline = false, className, children, loading = false, purpose, ...rest }) => {
  const classes = classNames(cls.Button, {
    [cls.outline]: outline,
    [cls.pressed]: loading,
    [cls.loading]: loading,
    [cls.withIcon]: !!purpose,
    [cls.purposeDelete]: purpose == 'delete',
  }, [ className, cls[size] ]);
  const Icon = purpose == 'edit' ?
    EditIcon : purpose == 'back' ?
      BackIcon : purpose == 'add' ?
        AddIcon : purpose == 'editGroup' ?
          EditGroupIcon : purpose == 'editSchedule' ?
            EditScheduleIcon : purpose == 'delete' ?
              TrashIcon : null;
  return (
    <button className={classes} type='button' disabled={loading} {...rest}>{loading && <Loader/>}{Icon && <Icon />}{children}</button>
  );
};