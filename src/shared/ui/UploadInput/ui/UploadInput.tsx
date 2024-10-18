import { ChangeEvent, FC, ReactNode, useState } from 'react';
import { useField, useFormikContext } from 'formik';

import FileIcon from '@/shared/assets/img/icons/file.svg?react';
import ImageIcon from '@/shared/assets/img/icons/image.svg?react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './UploadInput.module.scss';
import { notification } from 'antd';

interface UploadInputProps {
  className?: string;
  name: string;
  required?: boolean;
  inputClassName?: string;
  multiple?: boolean;
  /**
   * in MB
   */
  maxWeight?: number;
  size?: "md" | "lg";
  children: ReactNode;
  accept?: string;
}

const Loader: FC = () => (<div className={cls.loader}></div>);

export const UploadInput: FC<UploadInputProps> = ({ className, children, required = false, inputClassName, accept, size = 'md', multiple = false, maxWeight, ...props }) => {
  const [ loading, setLoading ] = useState(false);
  const { errors, touched, setFieldValue, values } = useFormikContext();
  const [ field ] = useField(props);
  
  const classes = classNames(cls.UploadInput, {
    [cls.outline]: true,
    [cls.pressed]: loading,
    [cls.loading]: loading,
  }, [ className, cls[size], cls.withIcon ]);
  
  const Icon = accept && accept.startsWith('image/') ? ImageIcon : FileIcon;
  
  return (
    <div className={cls.wrapper}>
      <label className={classes} htmlFor={`${field.name}-upload`}>
        {loading && <Loader/>}{<Icon />}{children}
      </label>
      <input
        id={`${field.name}-upload`}
        {...field}
        {...(accept ? { accept } : {})}
        type='file'
        disabled={loading}
        required={required}
        value=''
        className={classNames(cls.inputField, {}, [ inputClassName ])}
        multiple={multiple}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setLoading(true);
          const newFiles = event.currentTarget.files;
          const prevFiles = (values as any)[field.name] as File[];
          const updatedFiles: File[] = Array.from(prevFiles);
          
          if(!newFiles || newFiles.length == 0) {
            return;
          }
          if(multiple){
            for (const file of newFiles) {
              if(maxWeight) {
                if (file.size < maxWeight * 1024 * 1024) {
                  updatedFiles.push(file);
                } else {
                  notification.warning({
                    message: 'Слишком тяжелый файл',
                    description: `${file.name} превышает ${maxWeight}MB`,
                  });
                }
              } else {
                updatedFiles.push(file);
              }
            }
            setFieldValue(field.name, updatedFiles);
          }
          else {
            setFieldValue(field.name, newFiles[0]);
          }
          setLoading(false);
        }}
      />
      
    </div>
  );
};