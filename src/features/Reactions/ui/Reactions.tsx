import EmojiPicker, { Emoji, EmojiClickData } from 'emoji-picker-react';
import { FC, useState } from 'react';

import HeartAddIcon from '@/shared/assets/img/icons/heart.svg?reactrepo-com.svg?react';
import HeartIcon from '@/shared/assets/img/icons/heart.svg?react';
import { UserReaction } from '@stud-log/news-types/models';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './Reactions.module.scss';
import { groupedReactions } from '../helpers';
import postService from '@/services/post.service';
import { useOutsideClick } from '@/shared/hooks/useClickOutside';
import userService from '@/services/user.service';

interface ReactionProps {
  className?: string;
  recordId: number;
  meReacted: UserReaction[];
  reactions: UserReaction[];
  variant?: 'small' | 'expanded';
  afterChange: () => void;
}

export const Reactions: FC<ReactionProps> = ({ className, meReacted, recordId, reactions, variant = 'small', afterChange }) => {
  const { id } = userService.getUser();
  
  const handleClose = () => {
    setOpen(false);
  };
    
  const myReaction = reactions.find(i => i.userId == id);
  const similarReactionsCount = reactions.filter(i => myReaction ? i.type == myReaction.type : true).length;

  const ref = useOutsideClick(handleClose);
  const [ open, setOpen ] = useState(false);
  const grouped = groupedReactions(reactions);

  return (
    <div ref={ref} className={classNames(cls.Reaction, { [cls.meReacted]: !!myReaction }, [ className, cls[variant] ])}>
      { variant == 'small' && <div className={cls.reactWrapper}>
        {!myReaction && <div className={cls.heart}><HeartIcon onClick={() => setOpen(true)} /> {reactions.length} </div>}
        {myReaction && <div className={cls.liked} onClick={() => setOpen(true)} ><Emoji size={16} unified={myReaction.type} /> {similarReactionsCount} </div>}
      </div> }
      <div className={cls.reactionsWrapper}>
        {variant == 'expanded' && !myReaction && reactions.length == 0 && <div className={cls.reactWrapper}><div className={cls.heart}><HeartIcon onClick={() => setOpen(true)} /> {reactions.length} </div> </div>}
        {variant == 'expanded' && myReaction && (
        /** my reaction firstly */
          <div className={cls.meReacted}>
            <div className={cls.reactWrapper} onClick={async () => {
              await postService.reactPost(recordId, { unified: myReaction.type, imageUrl: myReaction.type || '' } as EmojiClickData);
              afterChange();
            }}>
              <Emoji size={16} unified={myReaction.type} /> {similarReactionsCount}
            </div>
          </div>
        )}
        {variant == 'expanded' && (
        /**others reactions */
          Object.keys(grouped).filter(type => myReaction ? myReaction.type != type : true ).map(type => {
            const typeReactions = grouped[type];
            return (
              <div key={type} className={cls.reactWrapper} onClick={async () => {
                
                await postService.reactPost(recordId, { unified: type, imageUrl: typeReactions.at(0)?.imageUrl || '' } as EmojiClickData);
                afterChange();
              }}>
                <Emoji size={16} unified={type} /> {typeReactions.length}
              </div>
            );
          })
        )}

        {variant == 'expanded' && <div className={cls.addReact} onClick={() => setOpen(true)}><HeartAddIcon /></div>}

      </div>
        
      <div className={cls.pickerWrapper} >
        <EmojiPicker
          open={open}
          reactionsDefaultOpen
          onReactionClick={async reaction => {
           
            setOpen(false);
            await postService.reactPost(recordId, reaction);
            afterChange();
          }}
          allowExpandReactions={false}
        />
      </div>
    </div>
  );
};