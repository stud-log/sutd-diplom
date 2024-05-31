import { FC, useRef } from 'react';
import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';

import CrossIcon from 'shared/assets/img/icons/x-close-red.svg';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './UploadedFilesControl.module.scss';
import { getFilenameAndExtension } from 'shared/lib/helpers/getFileNameAndExt';

interface UploadedFilesControlProps {
  className?: string;
  name: string;
}

/**
 *
 * Formik initialValues must contain `filesToDelete as number[]`
 */
export const UploadedFilesControl: FC<UploadedFilesControlProps> = ({ className, name }) => {
  const { values, setFieldValue } = useFormikContext<{filesToDelete: number[]}>();

  return (
    <div className={classNames(cls.UploadedFilesControl, {}, [ className ])}>
      <FieldArray
        name={name}
        render={arrayHelpers => {
          return (
            (values[name as keyof typeof values] as unknown as File[]).map( (file, index) => {
              const [ filename, ext ] = getFilenameAndExtension(file.name);
              const sizeInMB = (file.size / 1024 / 1024).toFixed(2);
              return (
                <div className={cls.file} key={index}>
                  <div className={cls.fileExt}>
                    {ext}
                    <div className={cls.cross} onClick={() => {
                      arrayHelpers.remove(index);
                      /** if file was from server and we click 'delete' - push it's id to array */
                      if((file as any).id){
                        const anArray = ([] as number[]).concat(values.filesToDelete);
                        anArray.push((file as any).id);
                        setFieldValue('filesToDelete', anArray);
                      }
                    }}><CrossIcon /></div>
                  </div>
                  <div className={cls.info}>
                    <div className={cls.fileName}>{filename}</div>
                    <div className={cls.fileSize}>{sizeInMB}MB</div>
                  </div>
                </div>
              );
            })
          );
        }}
      />
    </div>
  );
};