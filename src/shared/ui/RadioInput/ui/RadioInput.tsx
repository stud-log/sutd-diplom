import { FC, ReactNode } from 'react';
import { Field, useFormikContext } from 'formik';

import { RegDTO } from '@stud-log/news-types/dto/reg.dto';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './RadioInput.module.scss';

interface IRadio {
  name: string;
  value: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}
export const RadioInput: FC<IRadio> = ({ name, value, children, required = false, className }) => {
  const { errors, touched } = useFormikContext();
  const hasError = !!errors[name as keyof typeof errors] && !!touched[name as keyof typeof touched];
  return (
    <label className={classNames(cls.radioInput, { [cls.errored]: hasError }, [ className ])}>
      <Field type="radio" name={name} value={value} required={required} />
      <span>{children}</span>
    </label>
  );
};

