import { User, UserTask } from '@stud-log/news-types/models';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { FC } from 'react';
import { Layout } from 'shared/ui/Layout';
import { UserTaskStatus } from '@stud-log/news-types/enums';
import { UserWithAvatar } from 'shared/ui/UserWithAvatar';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './HomeworkDones.module.scss';
import { useDispatch } from 'react-redux';
import userService from 'services/user.service';

interface HomeworkDonesProps {
  className?: string;
}

export const HomeworkDones: FC<HomeworkDonesProps> = ({ className }) => {
  const { recordId } = useParams();
  const { group, role } = userService.getUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    data: userTasks,
    error,
    mutate,
  }: SWRResponse<UserTask[]> = useSWR(
    recordId ? `/api/record/post/Homework/${recordId}/userTasks` : null,
    $apiGet,
  );

  const usersDone = userTasks?.filter(i => i.status == UserTaskStatus.passed);

  return (
    <div className={classNames(cls.HomeworkDones, {}, [ className ])}>
      <Layout.Sticky>
        <Layout.StickyHeader slots={{
          start: <h2 className={classNames(cls.header, {}, [ 'h1' ])}>
            <span>Выполнили</span>
            <span className={cls.headerWeekparity}>{usersDone?.length} чел.</span>
          </h2>
        }}/>
        <Layout.StickyContent loading={!usersDone} emptyData={usersDone && usersDone.length == 0 ? 'Еще никто не выполнил это задание' : undefined}>
          <div className={cls.usersWrapper}>
            {usersDone && usersDone.length > 0 && usersDone.map(userTask => {
              return <UserWithAvatar user={userTask.user!} key={userTask.id}/>;
            })}
          </div>
        </Layout.StickyContent>
      </Layout.Sticky>
    </div>
  );
};