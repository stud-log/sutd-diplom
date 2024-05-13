import { FC, useEffect, useState } from 'react';
import { HomeworkType, UserTaskStatus } from '@stud-log/news-types/enums';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { Button } from 'shared/ui/Button';
import { ChatBubble } from 'features/ChatBubble';
import { Comments } from 'widgets/Comments';
import { Deadline } from 'features/Deadline';
import { FavoriteBubble } from 'features/FavoriteBubble';
import { GetEntity } from '@stud-log/news-types/server/post.response';
import { HomeworkDones } from 'widgets/HomeworkDones';
import { HomeworksStatusOptions } from 'shared/lib/types/homework';
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
import { mutate as globalMutate } from 'swr';
import moment from 'moment';
import { pluralize } from 'shared/lib/helpers/dates';
import postService from 'services/post.service';
import taskService from 'services/task.service';
import { useDispatch } from 'react-redux';
import userService from 'services/user.service';
import { withWidget } from 'shared/hooks/withWidget';

//TODO: write normal conditions to avoid .? anywhere
const SingleTaskPage: FC = () => {
  const { recordId } = useParams();
  const { group, role } = userService.getUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false);
  const {
    data: record,
    error,
    mutate,
  }: SWRResponse<GetEntity> = useSWR(
    recordId ? `/api/record/post/Homework/${recordId}` : null,
    $apiGet,
  );

  useEffect(() => {
    // add views to record
    if(record) {
      postService.viewPost(record.id).then(() => mutate());
    }
  }, [ record ]);

  const hw = record?.homework;
  const meWorked = record?.meWorked;
  const startDate = moment(hw?.createdAt).format('D MMM YYYY').replace('.', '');
    
  return (
    <Layout.Sticky className={cls.SchedulePage}>
      <Layout.StickyHeader slots={{
        start: <Button outline purpose='back' size='md' onClick={() => navigate(-1)}>Назад</Button>,
        end: <>
          {role.permissions.canEdit && recordId && <Button outline size='md' purpose='edit' className={classNames(cls.headerBtn, {}, [ cls.mobileHidden ])} onClick={() => {dispatch(addAndEditModalActions.openModal({ recordTable: 'Homework', recordId: Number(recordId) }));}}>Редактировать</Button>}
          {role.permissions.canEdit && recordId && <Button outline size='md' purpose='edit' className={classNames(cls.headerBtn, {}, [ cls.mobileShow ])} onClick={() => {dispatch(addAndEditModalActions.openModal({ recordTable: 'Homework', recordId: Number(recordId) }));}} />}
          {hw?.type == HomeworkType.group && meWorked?.length == 0 && <Button size='md' outline className={cls.headerBtn}>Выполнить в группе</Button>}
          {hw?.type == HomeworkType.individual && meWorked?.length == 0 && <Button size='md' outline loading={loading} onClick={async () => {
            setLoading(true);
            if (record) {
              const res = await taskService.changeStatus(UserTaskStatus.inProgress, record.id);
              if(res) mutate();
            }
            setLoading(false);
          }}>Начать выполнение</Button>}
          {hw?.type == HomeworkType.individual && meWorked?.length != 0 &&
          <Select
            options={HomeworksStatusOptions}
            onSelect={async (v) => {
              setLoading(true);
              if (record) {
                const res = await taskService.changeStatus(v.value as keyof typeof UserTaskStatus, record.id);
                if(res) globalMutate((key: string) => key.includes('api/record'));
              }
              setLoading(false);
            }}
            defaultOption={HomeworksStatusOptions.find(i => i.value == meWorked?.at(0)?.status)}
            className={cls.selectWithStatuses}
          />
          }
          
        </>
      }}/>
      <Layout.StickyContent loading={!record} className={cls.onMobileContent}>
        
        {record && hw &&
        <div>
          <div className={cls.top}>
            <span className={cls.subject}>{hw.subject?.title}</span>
            <span className={cls.date}>{startDate}</span>
          </div>
          <div className={cls.title}>{hw.title}</div>
          <Deadline startDate={hw.createdAt} endDate={hw.endDate} className={classNames(cls.deadline, {}, [ cls.mobileHidden ])}/>
          <div className={classNames(cls.content, {}, [ 'ck-content' ])}>
            <Interweave content={hw.content}/>
          </div>
          <Deadline startDate={hw.createdAt} endDate={hw.endDate} className={classNames(cls.mobileDeadline, {}, [ cls.mobileShow ])}/>
          <div className={cls.filesWrapper}>
            <RecordFiles files={record.files} />
          </div>
          <div className={cls.bottomInfo}>
            <div className={cls.controls}>
              <Reactions afterChange={mutate} className={cls.reactions} meReacted={record.meReacted} variant='expanded' reactions={record.reactions} recordId={record.id}/>
              <ChatBubble comments={record.comments} recordId={record.id}/>
              <FavoriteBubble meFavorite={record.meFavorited} favorites={record.favorites} recordId={record.id} />
            </div>
            <div className={cls.views}>{record.views.length} {pluralize(record.views.length, 'просмотр', "просмотра", "просмотров")}</div>
          </div>
          {window.innerWidth <= 576 && <HomeworkDones className={cls.mobileWidget}/>}
          <div className={cls.comments}>
            <Comments comments={record.comments} recordId={record.id}/>
          </div>
        </div>
        }
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default withWidget(SingleTaskPage, [ HomeworkDones, Schedule ]);