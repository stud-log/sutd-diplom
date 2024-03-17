import { ButtonHTMLAttributes, FC } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size: "md" | "lg";
  outline?: boolean;
  purpose?: "back" | "edit";
  loading?: boolean;
}

const Loader: FC = () => (<div className={cls.loader}></div>);

export const Button: FC<ButtonProps> = ({ size, outline = false, className, children, loading = false, ...rest }) => {
  const classes = classNames(cls.Button, { [cls.outline]: outline, [cls.pressed]: loading, [cls.loading]: loading }, [ className, cls[size] ]);
  return (
    <button className={classes} type='button' disabled={loading} {...rest}>{loading && <Loader/>}{children}</button>
  );
};