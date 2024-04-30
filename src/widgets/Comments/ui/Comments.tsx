import { FC, useState } from 'react';
import { Form, Formik } from 'formik';

import AvatarPlaceholder from 'shared/assets/img/avatar-placeholder.svg';
import { Button } from 'shared/ui/Button';
import { EmptyData } from 'shared/ui/EmptyData';
import { Input } from 'shared/ui/Input';
import { UploadInput } from 'shared/ui/UploadInput/ui/UploadInput';
import { UploadedFilesControl } from 'shared/ui/UploadInput/components/UploadedFilesControl/UploadedFilesControl';
import { UserComment } from '@stud-log/news-types/models';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Comments.module.scss';
import { getStaticLink } from 'shared/lib/helpers/getStaticLink';
import { mutate as globalMutate } from 'swr';
import postService from 'services/post.service';

interface CommentsProps {
  className?: string;
  comments: UserComment[];
  recordId: number;
  isNote?: boolean;
}

export const Comments: FC<CommentsProps> = ({ className, comments, recordId, isNote = false }) => {
  const [ loading, setLoading ] = useState(false);

  return (
    <div className={classNames(cls.Comments, {}, [ className ])}>
      <div className="h1">Комментарии</div>
      
      <Formik
        initialValues={{
          content: '',
          parentId: -1,
          files: [] as File[],
          recordId,
          title: '',
          isNote
        }}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          setLoading(true);
          const result = await postService.commentPost(values);
          setLoading(false);
          if(result == true) {
            globalMutate((key: string) => key.includes('api/record/post/Homework'));
            resetForm();
          }
        }}
        enableReinitialize
      >
        {({ values, submitForm }) =>
          <Form>
            <div className={cls.commentsWrapper}>
              {comments.length == 0 ? <div className={cls.empty}>Здесь пока ничего нет</div>
                : comments.map(comment =>
                  <div className={cls.comment} key={comment.id}>
                    <div className={cls.commentHeader}>
                      <div className={cls.commentAuthor}>
                        <div className={cls.avatar}>{comment.user.avatarUrl ? <img src={getStaticLink(comment.user.avatarUrl)} alt="user-avatar" /> : <AvatarPlaceholder /> }</div>
                        <div className={cls.name}>{comment.user.firstName} {comment.user.lastName}</div>
                      </div>
                      <div className={cls.commentDate}>{comment.createdAt}</div>
                    </div>
                    <div className={cls.commentContent}>
                      {comment.content}
                    </div>
                  </div>)}
              
            </div>
            <div className={cls.inputWrapper}>
              <Input name='content' />
            </div>
            <div className={cls.controls}>
              <UploadInput name='files' multiple maxWeight={10} >Добавить файлы</UploadInput>
              <Button size='md' onClick={submitForm} loading={loading}>Отправить</Button>
            </div>
            <div className={cls.uploadedFiles}>
              <UploadedFilesControl className={cls.fileControls}/>
            </div>
          </Form>
        }
      </Formik>
    </div>
  );
};