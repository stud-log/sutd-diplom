import EmojiPicker, { Emoji, EmojiClickData } from 'emoji-picker-react';
import { FC, useState } from 'react';

import HeartIcon from 'shared/assets/img/icons/heart.svg';
import { UserReaction } from '@stud-log/news-types/models';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Reactions.module.scss';
import { groupedReactions } from '../helpers';
import postService from 'services/post.service';
import { useOutsideClick } from 'shared/hooks/useClickOutside';
import userService from 'services/user.service';

interface ReactionProps {
  className?: string;
  recordId: number;
  meReacted: UserReaction[];
  reactions: UserReaction[];
  variant?: 'small' | 'expanded';
}

export const Reactions: FC<ReactionProps> = ({ className, meReacted, recordId, reactions, variant = 'small' }) => {
  const { id } = userService.getUser();
  const [ meReact, setMyReact ] = useState<UserReaction | boolean>(meReacted.length == 0 ? false : meReacted[0]);
  
  const handleClose = () => {
    setOpen(false);
  };
      
  const ref = useOutsideClick(handleClose);
  const [ open, setOpen ] = useState(false);
  const similarReactionsCount = reactions.filter(i => i.type == (meReact as UserReaction).type && i.userId != id).length;
  const grouped = groupedReactions(reactions);

  return (
    <div ref={ref} className={classNames(cls.Reaction, { [cls.meReacted]: !!meReact }, [ className, cls[variant] ])}>
      { variant == 'small' && <div className={cls.reactWrapper}>
        {!meReact && <div className={cls.heart}><HeartIcon onClick={() => setOpen(true)} /> {reactions.length} </div>}
        {meReact && <div className={cls.liked} onClick={() => setOpen(true)} ><Emoji size={16} unified={(meReact as UserReaction).type} /> {meReact ? similarReactionsCount + 1 : similarReactionsCount} </div>}
      </div> }
      {!meReact && variant == 'expanded' && <div className={cls.reactWrapper}><HeartIcon onClick={() => setOpen(true)} /> {reactions.length} </div>}
      {variant == 'expanded' && meReact && (
        /**my reaction firstly */
        <div className={cls.meReacted}>
          <div className={cls.reactWrapper} onClick={async () => {
            setMyReact(false);
            postService.reactPost(recordId, { unified: (meReact as UserReaction).type, imageUrl: (meReact as UserReaction).type || '' } as EmojiClickData);
          }}>
            <Emoji size={16} unified={(meReact as UserReaction).type} /> {similarReactionsCount + 1}
          </div>
        </div>
      )}
      {variant == 'expanded' && (
        /**others reactions */
        Object.keys(grouped).filter(type => !grouped[type].find(i => i.userId == id)).map(type => {
          const typeReactions = grouped[type];
          return (
            <div key={type} className={cls.reactWrapper} onClick={async () => {
              setMyReact({ type } as UserReaction);
              postService.reactPost(recordId, { unified: type, imageUrl: typeReactions.at(0)?.imageUrl || '' } as EmojiClickData);
            }}>
              <Emoji size={16} unified={type} /> {typeReactions.length}
            </div>
          );
        })
      )}
        
      <div className={cls.pickerWrapper} >
        <EmojiPicker
          open={open}
          reactionsDefaultOpen
          onReactionClick={async reaction => {
            setMyReact({ type: reaction.unified } as UserReaction);
            setOpen(false);
            postService.reactPost(recordId, reaction);
          }}
          allowExpandReactions={false}
        />
      </div>
    </div>
  );
};