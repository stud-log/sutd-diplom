import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { Collapse, CollapseProps } from 'antd';
import { DistantOptions, InitialValues, TimetableType, WeekparityTypes } from '../../types';
import { FieldArray, FieldArrayRenderProps, FormikErrors, useFormikContext } from 'formik';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { TimePicker } from '@/shared/ui/DatePicker/TimePicker/TimePicker';
import { Timetable } from '@stud-log/news-types/models';
import { TimetableWeekdaysRU } from '@stud-log/news-types/enums';
import cls from './EditableWeekday.module.scss';
import useAllSubjects from '@/shared/hooks/useAllSubjects';
import userService from '@/services/user.service';

interface EditableWeekdayProps{
  className?: string;
  weekday: keyof InitialValues;
  activeKey: string | string[];
  setActiveKey: (key: string | string[]) => void;
}

const panelStyle: CSSProperties = {
  marginBottom: 15,
  border: 'none',
  background: 'var(--black-buttons-back)',
  borderRadius: 20
};

export const EditableWeekday: FC<EditableWeekdayProps> = ({ className, weekday, activeKey, setActiveKey }) => {
  const { values, touched, errors, setFieldValue } = useFormikContext<InitialValues>();
  const { id: groupId } = userService.getGroup();
  const subjects = useAllSubjects();
  const helperRef = useRef<FieldArrayRenderProps | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setActiveKey('Mon0');
    }, 100);

    return () => setActiveKey('');
  }, []);
  
  const items: CollapseProps['items'] = values[weekday].map((para, idx) => {
    const itTouched = touched[weekday]?.at(idx);
    const itErrored = errors[weekday]?.at(idx) as FormikErrors<Timetable> | undefined;
    
    return ({
      key: `${weekday}${idx}`,
      style: panelStyle,
      label: <div className={cls.label}>
        <span className={cls.labelSpanTitle}>{para.subject.title}</span>
        <span className={cls.labelSpanCircle}>&#9679;</span>
        <span className={cls.labelSpanType}>{para.type}, {para.classroom}</span>
      </div>,
      children:
  <div className={cls.collapsedWrapper}>
    <div className={cls.selectWrapper}>
      <Select
        asFormikField={{ error: itTouched?.subjectId ? itErrored?.subjectId as string : undefined, passed: !!itTouched?.subjectId && !itErrored?.subjectId }}
        className={cls.select}
        options={subjects}
        optionRender={(option) =>{
          return <div className={cls.subjectLabel} title={`${option.data.teacherName} - ${option.label}`}>{option.label} <span>{option.data.teacherName}</span></div>;
        }}
        onSelect={v => {
          setFieldValue(`${weekday}[${idx}].subjectId`, v.id);
          setFieldValue(`${weekday}[${idx}].subject`, { id: v.id, title: v.label });
        }}
        popupMatchSelectWidth={false}
        dropdownStyle={{ width: '400px' }}
        needSearch={true}
        defaultOption={subjects?.find(i => i.id == para.subjectId)}
        defaultText='Выбрать предмет'
      />
      <Select
        asFormikField={{ error: itTouched?.subjectId ? itErrored?.subjectId as string : undefined, passed: !!itTouched?.subjectId && !itErrored?.subjectId }}
        className={cls.select}
        options={TimetableType}
        onSelect={v => {
          setFieldValue(`${weekday}[${idx}].type`, v.value);
        }}
        defaultOption={TimetableType?.find(i => i.value == para.type) || TimetableType[0]}
      />

    </div>
    <div className={cls.secondRow}>
      <div className={cls.timepicker}>
        <TimePicker
          defaultValue={para.startTime && para.endTime ? [ para.startTime, para.endTime ] : undefined}
          asFormikField={{ error: itTouched?.startTime ? itErrored?.startTime as string || itErrored?.endTime as string : undefined, passed: !!itTouched?.startTime && !itErrored?.endTime }}
          onChange={(v, times) => {
            setFieldValue(`${weekday}[${idx}].startTime`, times[0]);
            setFieldValue(`${weekday}[${idx}].endTime`, times[1]);
          }} />
      </div>
      <div className={cls.selectWrapper}>
        <Select
          asFormikField={{ error: itTouched?.subjectId ? itErrored?.subjectId as string : undefined, passed: !!itTouched?.subjectId && !itErrored?.subjectId }}
          className={cls.select}
          options={DistantOptions}
          onSelect={v => {
            if(v.value == 'ДО') {
              setFieldValue(`${weekday}[${idx}].classroom`, v.value);
            } else {
              setFieldValue(`${weekday}[${idx}].classroom`, '');

            }
          }}
          defaultOption={DistantOptions.find(i => i.value == para.classroom) || DistantOptions[0]}
        />
        <Select
          asFormikField={{ error: itTouched?.subjectId ? itErrored?.subjectId as string : undefined, passed: !!itTouched?.subjectId && !itErrored?.subjectId }}
          className={cls.select}
          options={WeekparityTypes}
          onSelect={v => {
            setFieldValue(`${weekday}[${idx}].weekparity`, v.value);
          }}
          defaultOption={WeekparityTypes.find(i => i.value == para.weekparity) || WeekparityTypes[0]}
        />
      </div>
    </div>
    <div className={cls.thirdRow}>
      <Input name={para.classroom == 'ДО' ? `${weekday}[${idx}].link` : `${weekday}[${idx}].classroom`} label={para.classroom == 'ДО' ? 'Ссылка на пару' : 'Аудитория'}/>
      <Button size="md" purpose='delete' outline onClick={() => helperRef.current?.remove(idx)}>Удалить пару</Button>
    </div>

  </div>,
      
    });
  });

  return (
    <FieldArray
      name={weekday}
      render={helper => {
        helperRef.current = helper;
        return (
          <div className={cls.weekdayWrapper}>
            <div className={cls.weekdayName}>{TimetableWeekdaysRU[weekday as keyof typeof TimetableWeekdaysRU]}</div>
            <div className="myCollapse">
              <Collapse items={items} activeKey={activeKey} onChange={key => setActiveKey(key)} expandIconPosition='end'/>
            </div>
            <Button purpose='add' size='md' outline onClick={() => {
              helper.push({
                subjectId: '',
                subject: {
                  title: 'Новая пара',
                  id: '',
                },
                classroom: '',
                link: '',
                startTime: '',
                endTime: '',
                weekparity: WeekparityTypes[0].value,
                type: TimetableType[0].value,
                weekday,
                groupId
              });
              setActiveKey(`${weekday}${values[weekday].length}`);
            }}>Добавить пару</Button>
          </div>
        );
      }}
    />
  );
};