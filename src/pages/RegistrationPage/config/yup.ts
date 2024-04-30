import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('некорректный email').required('заполните поле'),
  password: Yup.string().min(6, 'минимум 6 символов').required('заполните поле'),
  passwordConfirmation: Yup.string().test('password-match', 'пароли должны совпадать', function (value) {
    return this.parent.password === value;
  }).required('заполните поле'),
  firstName: Yup.string().required('заполните поле'),
  lastName: Yup.string().required('заполните поле'),
  phone: Yup.string().min(11, 'введите корректный номер').required('заполните поле'),
  patronymic: Yup.string(),
  groupId: Yup.number().test('group-selected', 'выберите группу', function (value) {
    return value !== -1;
  }).required('заполните поле'),
  policy: Yup.string().test('password-match', 'нужно принять политику', function (value) {
    return value === '1';
  }).required('заполните поле'),
});