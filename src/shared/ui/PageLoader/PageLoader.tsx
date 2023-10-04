import { FC } from 'react';
import classes from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader: FC<PageLoaderProps> = ({className}) => {

  return (
    <div className={classes.PageLoader}>Loading...</div>
  );
}