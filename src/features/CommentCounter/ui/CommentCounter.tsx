import { FC, useState } from 'react';

import ChatBubbleIcon from '@/shared/assets/img/icons/chatbubble.svg?react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './CommentCounter.module.scss';

interface ReactionProps {
  className?: string;
  commentsCount: number;
}

export const CommentCounter: FC<ReactionProps> = ({ className, commentsCount }) => {
  
  return (
    <div className={classNames(cls.CommentCounter, { }, [ className ])}>
      <div className={cls.bubble}><ChatBubbleIcon /> {commentsCount} </div>
      
    </div>
  );
};