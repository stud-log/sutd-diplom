import * as Yup from 'yup';

export interface AddAndEditModalSchema {
  isModalOpen: boolean;
  recordTable: 'Homework' | 'News';
  recordId: number;
}

export const NewsLabelsOptions = [
  { label: 'Информация', value: 'Информация' },
  { label: 'Перенос пары', value: 'Перенос пары' },
  { label: 'Отмена пары', value: 'Отмена пары' },
  { label: 'Событие', value: 'Событие' }
];

export const HomeworksTypeOptions = [
  { value: 'individual', label: 'Индивидуальное' },
  { value: 'group', label: 'Групповое' }
];

export const validationSchema = Yup.object().shape({
  recordTable: Yup.string().required(),
  recordId: Yup.string().required(),
  title: Yup.string().required('заполните поле'),
  content: Yup.string().required('заполните поле'),
  label: Yup.string().when('recordTable', {
    is: 'News',
    then: (schema) => schema.required('выберите тему')
  }),
  subjectId: Yup.string().when('recordTable', {
    is: 'Homework',
    then: (schema) => schema.required('выберите предмет'),
  }),
  type: Yup.string().when('recordTable', {
    is: 'Homework',
    then: (schema) => schema.required('выберите тип'),
  }),
  
  startDate: Yup.string().when('recordTable', {
    is: 'Homework',
    then: (schema) => schema.required('укажите промежуток'),
  }),
  endDate: Yup.string().when('recordTable', {
    is: 'Homework',
    then: (schema) => schema.required('укажите промежуток'),
  }),
  
});

