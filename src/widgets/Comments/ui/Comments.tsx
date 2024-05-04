import { FC, useRef, useState } from 'react';
import { Form, Formik } from 'formik';

import { Button } from 'shared/ui/Button';
import { Comment } from '../components/Comment/Comment';
import { Input } from 'shared/ui/Input';
import { Reactions } from 'features/Reactions';
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

export const Comments: FC<CommentsProps> = ({ className, comments, recordId, variant = 'comments', afterChange }) => {
  const { id: myUserId } = userService.getUser();
  const [ loading, setLoading ] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const globMutate = () => globalMutate((key: string) => key.includes('api/record'));

  const handleCommentSubmit = async (values: any, resetForm: () => void) => {
    if (values.content.length === 0) return;

    if (!values.content.startsWith('@')) {
      values.parentId = -1;
    }
    setLoading(true);
    const result = await postService.commentPost(values);
    setLoading(false);
    if (result === true) {
      globMutate();
      afterChange?.();
      resetForm();
    }
  };
  return (
    <div className={classNames(cls.Comments, {}, [ className ])}>
      <div className="h1">{variant == 'comments' ? 'Комментарии' : 'Заметки'}</div>
      
      <Formik
        initialValues={{
          content: '',
          parentId: -1,
          replyToUserId: -1,
          commentFiles: [] as File[],
          recordId,
          title: '',
          isNote: variant === 'comments' ? 0 : 1,
        }}
        onSubmit={(values, { resetForm }) => handleCommentSubmit(values, resetForm)}
        enableReinitialize
      >
        {({ values, submitForm, setFieldValue }) => (
          <Form>
            <div className={cls.commentsWrapper}>
              {comments.length === 0 ? (
                <div className={cls.empty}>Здесь пока ничего нет</div>
              ) : (
                comments.filter(comment => comment.parentId == null).map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    variant={variant}
                    onReply={
                      (parentId, replyToUserId, content) => {
                        setFieldValue('parentId', parentId);
                        setFieldValue('replyToUserId', replyToUserId);
                        setFieldValue('content', content);
                        inputRef.current?.focus();
                      }
                    }
                    myUserId={myUserId}
                    globalMutate={globMutate}
                  />
                ))
              )}
            </div>
            <div className={cls.inputWrapper}>
              <Input innerRef={inputRef} name="content" autoComplete="off" />
            </div>
            <div className={cls.controls}>
              <UploadInput name="commentFiles" multiple maxWeight={10} >Добавить файлы</UploadInput>
              <Button size="md" onClick={submitForm} loading={loading}>Отправить</Button>
            </div>
            <div className={cls.uploadedFiles}>
              <UploadedFilesControl name="commentFiles" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};