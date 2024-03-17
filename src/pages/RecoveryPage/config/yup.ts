import * as Yup from 'yup';

export const validationSchema1 = Yup.object().shape({
  email: Yup.string().email('некорректный email').required('заполните поле'),
});

export const validationSchema2 = Yup.object().shape({
  password: Yup.string().min(6, 'минимум 6 символов').required('заполните поле'),
  passwordConfirmation: Yup.string().test('password-match', 'пароли должны совпадать', function (value) {
    return this.parent.password === value;
  }).required('заполните поле'),
});