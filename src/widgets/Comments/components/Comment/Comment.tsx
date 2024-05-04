import { FC } from 'react';
import { Reactions } from 'features/Reactions';
import ReplyIcon from 'shared/assets/img/icons/reply.svg';
import { UserComment } from '@stud-log/news-types/models';
import { UserWithAvatar } from 'shared/ui/UserWithAvatar';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Comment.module.scss';
import { formatDate } from 'widgets/Comments/helpers';

interface CommentProps {
  className?: string;
  comment: UserComment;
  variant: 'comments' | 'notes';
  myUserId: number;
  onReply: (parentId: number, replyToUser: number, content: string) => void;
  globalMutate: () => void;
}

export const Comment: FC<CommentProps> = ({ className, onReply, comment, myUserId, globalMutate, variant }) => {

  return (
    <div className={cls.withChildrenWrapper} >
      <div className={cls.comment}>
        <div className={cls.commentHeader}>
          <div className={cls.commentAuthor}><UserWithAvatar user={comment.user}/></div>
          <div className={cls.labelSpanCircle}>&#9679;</div>
          <div className={cls.commentDate}>{formatDate(comment.createdAt)}</div>
        </div>
        <div className={cls.commentContent}>
          {comment.content}
        </div>
        <div className={cls.commentControls}>
          {variant == 'comments' && <Reactions variant='expanded' afterChange={globalMutate} meReacted={comment.myRecord.reactions.find( react => react.userId == myUserId) ? [ comment.myRecord.reactions.find( react => react.userId == myUserId)! ] : []} reactions={comment.myRecord.reactions} recordId={comment.myRecordId}/>}
          {variant == 'comments' && <div className={cls.replyBtn} role='button' onClick={() => onReply(comment.id, comment.user.id, `@${comment.user.nickname || comment.user.firstName}, `)}><ReplyIcon /> Ответить</div> }
        </div>
      </div>
      <div className={cls.children}>
        {
          /** CHILD COMMENTS LEVEL */
          variant == 'comments' && comment.children && comment.children.map(childComment => {
            return (
              <Comment
                key={childComment.id}
                comment={childComment}
                variant={variant}
                onReply={() => onReply(comment.id, childComment.user.id, `@${childComment.user.nickname || childComment.user.firstName}, `)}
                myUserId={myUserId}
                globalMutate={globalMutate}
              />
            );
          })
        }
      </div>
    </div>
  );
};