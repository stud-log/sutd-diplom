import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { Button } from 'shared/ui/Button';
import { ChatBubble } from 'features/ChatBubble';
import { Comments } from 'widgets/Comments';
import { Deadline } from 'features/Deadline';
import { FavoriteBubble } from 'features/FavoriteBubble';
import { GetEntity } from '@stud-log/news-types/server/post.response';
import { HomeworkType } from '@stud-log/news-types/enums';
import { Interweave } from 'interweave';
import { Layout } from 'shared/ui/Layout';
import { Reactions } from 'features/Reactions';
import { Record } from '@stud-log/news-types/models';
import { RecordFiles } from 'features/RecordFiles';
import { Schedule } from 'widgets/Schedule';
import { Select } from 'shared/ui/Select';
import { addAndEditModalActions } from 'widgets/Modals/ProfileModals/AddAndEditModal/slice';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './SingleTaskPage.module.scss';
import { getRemainDeadline } from 'shared/lib/helpers/getRemainDeadline';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import userService from 'services/user.service';
import { withWidget } from 'shared/hooks/withWidget';

const SingleTaskPage: FC = () => {
  const { recordId } = useParams();
  const { group, role } = userService.getUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: record,
    error,
    mutate,
  }: SWRResponse<GetEntity> = useSWR(
    recordId ? `/api/record/post/Homework/${recordId}` : null,
    $apiGet,
  );

  const hw = record?.homework;
  const meWorked = record?.meWorked;
  const startDate = moment(hw?.createdAt).format('D MMM YYYY').replace('.', '');
  
  const { remainTime, progress, remainShort } = getRemainDeadline(hw?.startDate, hw?.endDate);
  
  return (
    <Layout.Sticky className={cls.SchedulePage}>
      <Layout.StickyHeader slots={{
        start: <Button outline purpose='back' size='md' onClick={() => navigate(-1)}>Назад</Button>,
        end: <>
          {role.permissions.canEdit && recordId && <Button outline size='md' purpose='edit' className={cls.headerBtn} onClick={() => {dispatch(addAndEditModalActions.openModal({ recordTable: 'Homework', recordId: Number(recordId) }));}}>Редактировать</Button>}
          {hw?.type == HomeworkType.group && meWorked?.length == 0 && <Button size='md' outline className={cls.headerBtn}>Выполнить в группе</Button>}
          {hw?.type == HomeworkType.individual && meWorked?.length == 0 && <Button size='md' outline>Начать выполнение</Button>}
          {/* <Select options={[]} onSelect={console.log}/> */}
        </>
      }}/>
      <Layout.StickyContent loading={!record}>
        <div className={cls.top}>
          <span className={cls.subject}>{hw?.subject?.title}</span>
          <span className={cls.date}>{startDate}</span>
        </div>
        <div className={cls.title}>{hw?.title}</div>
        <Deadline startDate={hw?.createdAt} endDate={hw?.endDate} className={cls.deadline}/>
        <div className={classNames(cls.content, {}, [ 'ck-content' ])}>
          <Interweave content={hw?.content}/>
        </div>
        <div className={cls.filesWrapper}>
          <RecordFiles files={record?.files} />
        </div>
        {record &&
        <div className={cls.controls}>
          <Reactions className={cls.reactions} meReacted={record.meReacted} variant='expanded' reactions={record.reactions} recordId={record.id}/>
          <ChatBubble comments={record.comments} recordId={record.id}/>
          <FavoriteBubble meFavorite={record.meFavorited} favorites={record.favorites} recordId={record.id} />
        </div>
        }
        {record && <div className={cls.comments}>
          <Comments comments={record.comments} recordId={record.id}/>
        </div>}
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default withWidget(SingleTaskPage, Schedule);