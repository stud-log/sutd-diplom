import { useField, useFormikContext } from 'formik';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './RichEditor.module.scss';

interface RichEditorProps {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
  
}

export const RichEditor:FC<RichEditorProps> = ({ required = false, label, className, ...props }) => {
  const { setFieldValue, setTouched, touched, errors } = useFormikContext();
  const [ field ] = useField(props);
  const hasError = !!errors[field.name as keyof typeof errors] && !!touched[field.name as keyof typeof touched];
  const passedValidation = !errors[field.name as keyof typeof errors] && !!touched[field.name as keyof typeof touched];
  return (
    <div className={classNames(cls.InputConrainer, { [cls.errored]: hasError, [cls.passed]: passedValidation }, [ className, "myCKEDITOR" ])}>
      <div className={cls.label}><span className={classNames('', { [cls.required]: required }, [])}>{label}</span> <span className={cls.error}>{hasError && errors[field.name as keyof typeof errors]}</span></div>
      <CKEditor
        editor={ClassicEditor}
        {...field}
        {...props}
        data={field.value}
        onChange={(event, editor) => {
          setFieldValue(field.name, editor.getData());
        }}
        onBlur={() => setTouched({ ...touched, [field.name]: true })}
        config={{
          ckfinder: {
            uploadUrl: `${process.env.API_URL}/api/uploads/ckeditor`,
          },
        }}
        
      />
    </div>
  );
};
