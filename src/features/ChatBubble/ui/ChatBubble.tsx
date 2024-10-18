import { FC, useState } from 'react';
import { UserComment } from '@stud-log/news-types/models';

import ChatIcon from '@/shared/assets/img/icons/chatbubble.svg?react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './ChatBubble.module.scss';

interface ReactionProps {
  className?: string;
  recordId: number;
  comments: UserComment[];
}

export const ChatBubble: FC<ReactionProps> = ({ className, comments }) => {
  
  return (
    <div className={classNames(cls.Reaction, { }, [ className ])}>
      <ChatIcon /> {comments.length}
    </div>
  );
};