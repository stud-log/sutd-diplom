import { Field, FieldProps, useFormikContext } from 'formik';

import { FC } from 'react';
import { RegDTO } from '@stud-log/news-types/dto/reg.dto';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Input.module.scss';

interface InputProps {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
  inputClassName?: string;
}

export const Input: FC<InputProps> = ({ className, name, label, type, required = false, maxLength, inputClassName }) => {
  const { errors, touched } = useFormikContext();
  const hasError = !!errors[name as keyof typeof errors] && !!touched[name as keyof typeof touched];
  const passedValidation = !errors[name as keyof typeof errors] && !!touched[name as keyof typeof touched];
  return (
    <div className={classNames(cls.InputConrainer, { [cls.errored]: hasError, [cls.passed]: passedValidation }, [ className ])}>
      <div className={cls.label}><span className={classNames('', { [cls.required]: required }, [])}>{label}</span> <span className={cls.error}>{hasError && errors[name as keyof typeof errors]}</span></div>
      <div className={cls.limit}>{maxLength && `лимит ${maxLength} символов`}</div>
      <Field name={name} type={type || 'text'} required={required}>
        {({ field }: FieldProps) => <input type={type || "text"} {...(maxLength ? { maxLength } : {})} className={classNames(cls.inputField, {}, [ inputClassName ])} {...field} />}
      </Field>
    </div>
  );
};