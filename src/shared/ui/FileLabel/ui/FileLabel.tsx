import { FC } from 'react';
import FileIcon from '@/shared/assets/img/icons/file.svg?react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './FileLabel.module.scss';
import { pluralize } from '@/shared/lib/helpers/dates';

interface FileLabelProps {
  className?: string;
  filesCount: number;
}

export const FileLabel: FC<FileLabelProps> = ({ className, filesCount }) => {

  return (
    <div className={classNames(cls.FileLabel, {}, [ className ])}>{filesCount} {pluralize(filesCount, 'файл', "файла", "файлов")} <FileIcon /></div>
  );
};