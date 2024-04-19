import { FC, useState } from 'react';

import ChatBubbleIcon from 'shared/assets/img/icons/chatbubble.svg';
import EmojiPicker from 'emoji-picker-react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './CommentCounter.module.scss';
import postService from 'services/post.service';
import { useOutsideClick } from 'shared/hooks/useClickOutside';

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