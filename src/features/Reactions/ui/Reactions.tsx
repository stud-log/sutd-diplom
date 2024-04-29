import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { FC, useState } from 'react';

import HeartIcon from 'shared/assets/img/icons/heart.svg';
import { UserReaction } from '@stud-log/news-types/models';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Reactions.module.scss';
import postService from 'services/post.service';
import { useOutsideClick } from 'shared/hooks/useClickOutside';

interface ReactionProps {
  className?: string;
  recordId: number;
  meReacted: UserReaction[];
  reactions: UserReaction[];
}

export const Reactions: FC<ReactionProps> = ({ className, meReacted, recordId, reactions }) => {
  const [ meReact, setMyReact ] = useState<UserReaction | boolean>(meReacted.length == 0 ? false : meReacted[0]);

  const handleClose = () => {
    setOpen(false);
  };
      
  const ref = useOutsideClick(handleClose);
  const [ open, setOpen ] = useState(false);
  
  return (
    <div ref={ref} className={classNames(cls.Reaction, { [cls.meReacted]: !!meReact }, [ className ])}>
      <div className={cls.reactWrapper}>
        {!meReact && <div className={cls.heart}><HeartIcon onClick={() => setOpen(true)} /> {reactions.length} </div>}
        {meReact && <div className={cls.liked} onClick={() => setOpen(true)} ><Emoji size={16} unified={(meReact as UserReaction).type} /> {reactions.filter(i => i.type == (meReact as UserReaction).type).length} </div>}
      </div>
      <div className={cls.pickerWrapper} >
        <EmojiPicker
          open={open}
          reactionsDefaultOpen
          onReactionClick={async reaction => {
            setOpen(false);
            await postService.reactPost(recordId, reaction)
              .then(r => setMyReact(r));
            
          }}
          allowExpandReactions={false}
        />
      </div>
    </div>
  );
};