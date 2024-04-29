import { AppFiles } from '@stud-log/news-types/models/files.model';
import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './RecordFiles.module.scss';
import { downloadFile } from 'shared/lib/helpers/downloadByClick';
import { getFilenameAndExtension } from 'shared/lib/helpers/getFileNameAndExt';

interface RecordFilesProps {
  className?: string;
  files?: AppFiles[];
}

export const RecordFiles: FC<RecordFilesProps> = ({ className, files }) => {

  return (
    <div className={classNames(cls.RecordFiles, {}, [ className ])}>
        
      {files?.map( (file, index) => {
        const [ filename, ext ] = getFilenameAndExtension(file.fileName);
        const sizeInMB = file.fileSize ? (file.fileSize / 1024 / 1024).toFixed(2) : 0;
        const download = () => downloadFile(file.url, file.fileName, ext);
        return (
          <div className={cls.file} key={index} >
            <div className={cls.fileExt} onClick={download}>
              {ext}
            </div>
            <div className={cls.info}>
              <div className={cls.fileName} onClick={download}>{filename}</div>
              <div className={cls.fileSize}>{sizeInMB}MB</div>
            </div>
          </div>
        );
      })}
         
    </div>
   
  );
};