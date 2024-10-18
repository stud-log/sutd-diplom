import * as Yup from 'yup';

export interface AddAndEditCustomActivitySchema {
  isModalOpen: boolean;
  recordId: number;
}

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('заполните поле'),
  startDate: Yup.string().when('recordTable', {
    is: 'Homework',
    then: (schema) => schema.required('укажите промежуток'),
  }),
  endDate: Yup.string().when('recordTable', {
    is: 'Homework',
    then: (schema) => schema.required('укажите промежуток'),
  }),
  
});

