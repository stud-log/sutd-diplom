import { FC, useRef } from 'react';
import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';

import CrossIcon from 'shared/assets/img/icons/x-close-red.svg';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './UploadedFilesControl.module.scss';
import { getFilenameAndExtension } from 'shared/lib/helpers/getFileNameAndExt';

interface UploadedFilesControlProps {
  className?: string;
  name?: string;
}

/**
 * __NOTE__: Formik initial values must have `{files: File[]}` as one of available properties
 */
export const UploadedFilesControl: FC<UploadedFilesControlProps> = ({ className }) => {
  const { values } = useFormikContext<{files: File[]}>();
  
  return (
    <div className={classNames(cls.UploadedFilesControl, {}, [ className ])}>
      <FieldArray
        name='files'
        render={arrayHelpers => {
          return (
            values.files.map( (file, index) => {
              const [ filename, ext ] = getFilenameAndExtension(file.name);
              const sizeInMB = (file.size / 1024 / 1024).toFixed(2);
              return (
                <div className={cls.file} key={index}>
                  <div className={cls.fileExt}>
                    {ext}
                    <div className={cls.cross} onClick={() => arrayHelpers.remove(index)}><CrossIcon /></div>
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