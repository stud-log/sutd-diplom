import { Field, FieldProps, useFormikContext } from 'formik';

import { FC } from 'react';
import RPIPhoneInput from 'react-phone-input-2';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './PhoneInput.module.scss';

interface PhoneInputProps {
  className?: string;
  label?: string;
  required?: boolean;
  type?: string;
  name: string;
  onChange: (value: string) => void;
}

export const PhoneInput: FC<PhoneInputProps> = ({ className, name, onChange, label, type = 'text', required = false }) => {
  const { errors, touched } = useFormikContext();
  const hasError = !!errors[name as keyof typeof errors] && !!touched[name as keyof typeof touched];
  const passedValidation = !errors[name as keyof typeof errors] && !!touched[name as keyof typeof touched];
  return (
    <div className={classNames(cls.PhoneInput, { [cls.errored]: hasError, [cls.passed]: passedValidation }, [ className ])}>
      <div className={cls.label}><span className={classNames('', { [cls.required]: required }, [])}>{label}</span> <span className={cls.error}>{hasError && errors[name as keyof typeof errors]}</span></div>
      <Field name={name} type={type} required={required}>
        {({ field }: FieldProps) =>
          <RPIPhoneInput
            country="ru"
            inputClass={cls.inputField}
            inputProps={{ name }}
            disableDropdown
            specialLabel=""
            placeholder="+7 (921) 555-55-55"
            onlyCountries={[ 'ru' ]}
            {...field}
            onChange={onChange}
          />}
      </Field>
    </div>
  );
};