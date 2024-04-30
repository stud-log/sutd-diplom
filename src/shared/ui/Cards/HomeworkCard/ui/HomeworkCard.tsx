import 'moment/locale/ru';

import { ChatBubble } from 'features/ChatBubble';
import { Deadline } from 'features/Deadline';
import { FC } from 'react';
import { FavoriteBubble } from 'features/FavoriteBubble';
import { GetEntity } from '@stud-log/news-types/server/post.response';
import { Interweave } from 'interweave';
import { Reactions } from 'features/Reactions';
import { TaskStatusLabel } from 'shared/ui/TaskStatusLabel';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './HomeworkCard.module.scss';
import moment from 'moment';
import { transform } from 'shared/lib/helpers/interweave';
import { truncate } from 'shared/lib/helpers/truncateWords';
import { useNavigate } from 'react-router-dom';

interface HomeworkCardProps extends GetEntity {
  className?: string;
}

export const HomeworkCard: FC<HomeworkCardProps> = ({ className, ...record }) => {
  const hw = record.homework!;
  const startDate = moment(hw.createdAt).format('D MMM YYYY').replace('.', '');
  
  const navigate = useNavigate();
  const goToTask = () => navigate(`/task/${hw.id}`);
  return (
    <div className={classNames(cls.HomeworkCard, {}, [ className ])} >
      <div className={cls.block}>
        <div className={cls.cardHeader}>
          <div className={cls.cardHeaderInner}>
            <div className={cls.createdAt}>от {startDate}</div>
            <div className={cls.status}><TaskStatusLabel recordId={record.id} status={record.meWorked.at(0)?.status}/></div>
          </div>
        </div>
        <div className={cls.subject} onClick={goToTask}>{truncate.apply(hw.subject.title, [ 27, false ])}</div>
        <div className={cls.title} onClick={goToTask}>{truncate.apply(hw.title, [ 45, false ])}</div>
        <div className={cls.content} onClick={goToTask}>
          <Interweave content={truncate.apply(hw.content, [ 92, false ])} transform={transform} />
        </div>
        <Deadline onClick={goToTask} startDate={hw.startDate} endDate={hw.endDate} />
        <div className={cls.controls}>
          <Reactions className={cls.reactions} meReacted={record.meReacted} reactions={record.reactions} recordId={record.id}/>
          <ChatBubble comments={record.comments} recordId={record.id}/>
          <FavoriteBubble meFavorite={record.meFavorited} favorites={record.favorites} recordId={record.id} />
        </div>
      </div>
    </div>
  );
};