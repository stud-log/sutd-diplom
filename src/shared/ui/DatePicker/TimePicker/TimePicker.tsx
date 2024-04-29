import dayjs, { Dayjs } from 'dayjs';

import { TimePicker as ANTDTimePicker } from 'antd';
import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './TimePicker.module.scss';
import ru from 'antd/es/date-picker/locale/ru_RU';

const buddhistLocale: typeof ru = {
  ...ru,
  lang: {
    ...ru.lang,
    fieldDateFormat: 'DD-MM-YYYY',
    fieldDateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
  }
  
};

interface TimePickerProps {
  className?: string;
  onChange: ((dates: any, dateStrings: string | string[]) => void);
  defaultValue?: [string, string];
  asFormikField?: {
    error?: string;
    passed?: boolean;
    required?: boolean;
  };
}

export const TimePicker: FC<TimePickerProps> = ({ className, onChange, defaultValue, asFormikField }) => {
// Convert default values to dayjs objects if provided
  const defaultValues = defaultValue ? defaultValue.map(date => {
    const [ hours, minutes ] = date.split(':');
    return dayjs().hour(Number(hours)).minute(Number(minutes)).second(0);
  
  }) : undefined;
  return (
    <ANTDTimePicker.RangePicker
      locale={buddhistLocale}
      format={"HH:mm"}
      {...(defaultValues && defaultValues.length == 2 ? { defaultValue: (defaultValues as any) } : {})}
      onChange={onChange}
      className={classNames(cls.RangePicker, { 'errored': !!asFormikField?.error }, [ className, 'myRangePicker' ])}
    />
  );
};