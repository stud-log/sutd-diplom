import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('некорректный email').required('заполните поле'),
  password: Yup.string().required('заполните поле'),
  
});