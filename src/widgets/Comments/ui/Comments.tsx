import { FC, useRef, useState } from 'react';
import { Form, Formik } from 'formik';

import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Reactions } from 'features/Reactions';
import ReplyIcon from 'shared/assets/img/icons/reply.svg';
import { UploadInput } from 'shared/ui/UploadInput/ui/UploadInput';
import { UploadedFilesControl } from 'shared/ui/UploadInput/components/UploadedFilesControl/UploadedFilesControl';
import { UserComment } from '@stud-log/news-types/models';
import { UserWithAvatar } from 'shared/ui/UserWithAvatar';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Comments.module.scss';
import { formatDate } from '../helpers';
import { mutate as globalMutate } from 'swr';
import postService from 'services/post.service';
import userService from 'services/user.service';

interface CommentsProps {
  className?: string;
  comments: UserComment[];
  recordId: number;
  variant?: 'comments' | 'notes';
  afterChange?: () => void;
}

//TODO: Write normal recursion comments.
export const Comments: FC<CommentsProps> = ({ className, comments, recordId, variant = 'comments', afterChange }) => {
  const { id: myUserId } = userService.getUser();
  const [ loading, setLoading ] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className={classNames(cls.Comments, {}, [ className ])}>
      <div className="h1">{variant == 'comments' ? 'Комментарии' : 'Заметки'}</div>
      
      <Formik
        initialValues={{
          content: '',
          parentId: -1,
          commentFiles: [] as File[],
          recordId,
          title: '',
          isNote: variant == 'comments' ? 0 : 1,
        }}
        onSubmit={async (values, { resetForm }) => {
          if(values.content.length == 0) return;
          
          if(!values.content.startsWith('@')) {
            values.parentId = -1;
          }
          setLoading(true);
          const result = await postService.commentPost(values);
          setLoading(false);
          if(result == true) {
            globalMutate((key: string) => key.includes('api/record'));
            afterChange?.();
            resetForm();
          }
        }}
        enableReinitialize
      >
        {({ values, submitForm, setFieldValue }) =>
          <Form>
            <div className={cls.commentsWrapper}>
              {comments.length == 0 ? <div className={cls.empty}>Здесь пока ничего нет</div>
                : comments.filter(i => i.parentId == null).map(comment =>
                {

                  /** FIRST COMMENTS LEVEL */
                  
                  return (
                    <div className={cls.withChildrenWrapper} key={comment.id}>
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
                          {variant == 'comments' && <Reactions meReacted={comment.myRecord.reactions.find( react => react.userId == myUserId) ? [ comment.myRecord.reactions.find( react => react.userId == myUserId)! ] : []} reactions={comment.myRecord.reactions} recordId={comment.myRecordId}/>}
                          {variant == 'comments' && <div className={cls.replyBtn} role='button' onClick={() => {
                            setFieldValue('parentId', comment.id);
                            setFieldValue('content', `@${comment.user.nickname || comment.user.firstName}, `);
                            inputRef.current?.focus();
                          }}><ReplyIcon /> Ответить</div> }
                        </div>
                      </div>
                      <div className={cls.children}>
                        {
                        /** SECOND COMMENTS LEVEL */
                          variant == 'comments' && comment.children.map(childComment => {
                            const meChildReacted = childComment.myRecord.reactions.find( react => react.userId == myUserId);
                            return (
                              <div className={cls.comment} key={childComment.id}>
                                <div className={cls.commentHeader}>
                                  <div className={cls.commentAuthor}><UserWithAvatar user={childComment.user}/></div>
                                  <div className={cls.labelSpanCircle}>&#9679;</div>
                                  <div className={cls.commentDate}>{formatDate(childComment.createdAt)}</div>
                                </div>
                                <div className={cls.commentContent}>
                                  {childComment.content}
                                </div>
                                <div className={cls.commentControls}>
                                  <Reactions meReacted={meChildReacted ? [ meChildReacted ] : []} reactions={childComment.myRecord.reactions} recordId={childComment.myRecordId}/>
                                  <div className={cls.replyBtn} role='button' onClick={() => {
                                    setFieldValue('parentId', comment.id);
                                    setFieldValue('content', `@${childComment.user.nickname || childComment.user.firstName}, `);
                                    inputRef.current?.focus();
                                  }}><ReplyIcon /> Ответить</div>
                                </div>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  );})}
              
            </div>
            <div className={cls.inputWrapper}>
              <Input innerRef={inputRef} name='content' autoComplete='off'/>
            </div>
            <div className={cls.controls}>
              <UploadInput name='commentFiles' multiple maxWeight={10} >Добавить файлы</UploadInput>
              <Button size='md' onClick={submitForm} loading={loading}>Отправить</Button>
            </div>
            <div className={cls.uploadedFiles}>
              <UploadedFilesControl name='commentFiles' className={cls.fileControls}/>
            </div>
          </Form>
        }
      </Formik>
    </div>
  );
};