import dayjs, { Dayjs } from 'dayjs';

import { DatePicker } from 'antd';
import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './RangePicker.module.scss';
import ru from 'antd/es/date-picker/locale/ru_RU';

const buddhistLocale: typeof ru = {
  ...ru,
  lang: {
    ...ru.lang,
    fieldDateFormat: 'DD-MM-YYYY',
    fieldDateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
  }
  
};

interface RangePickerProps {
  className?: string;
  onChange: ((dates: any, dateStrings: [string, string]) => void);
  showTime?: boolean;
  defaultValue?: [string, string];
  asFormikField?: {
    error?: string;
    passed?: boolean;
    required?: boolean;
  };
}

export const RangePicker: FC<RangePickerProps> = ({ className, onChange, defaultValue, showTime = false, asFormikField }) => {
// Convert default values to dayjs objects if provided
  const defaultValues = defaultValue ? defaultValue.map(date => dayjs(date)) : undefined;
  return (
    <DatePicker.RangePicker
      locale={buddhistLocale}
      {...(defaultValues && defaultValues.length == 2 ? { defaultValue: (defaultValues as any) } : {})}
      showTime={showTime}
      onChange={onChange}
      className={classNames(cls.RangePicker, { 'errored': !!asFormikField?.error }, [ className, 'myRangePicker' ])}
    />
  );
};