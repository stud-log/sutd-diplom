import 'moment/locale/ru';

import { FC } from 'react';
import { GetEntity } from '@stud-log/news-types/server/post.response';
import { Interweave } from 'interweave';
import { Reaction } from 'features/Reaction';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './HomeworkCard.module.scss';
import { getRemainDeadline } from 'shared/lib/helpers/getRemainDeadline';
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
  const endDate = moment(hw.createdAt).format('D MMM').replace('.', '');
  const { remainTime, progress, remainShort } = getRemainDeadline(hw.startDate, hw.endDate);
  const navigate = useNavigate();

  return (
    <div className={classNames(cls.HomeworkCard, {}, [ className ])} >
      <div className={cls.block}>
        <div className={cls.cardHeader}>
          <div className={cls.createdAt}>{startDate}</div>
          <div className={cls.status}></div>
        </div>
        <div className={cls.subject}>{truncate.apply(hw.subject.title, [ 27, false ])}</div>
        <div className={cls.title} onClick={() => navigate(`/task/${hw.id}`)}>{truncate.apply(hw.title, [ 45, false ])}</div>
        <div className={cls.content}>
          <Interweave content={truncate.apply(hw.content, [ 92, false ])} transform={transform} />
        </div>
        <div className={classNames(cls.deadline, {
          [cls.less40]: progress > 40,
          [cls.less75]: progress > 75,
        }, [ cls.less100 ])}>дедлайн {endDate}</div>
        <div className={cls.controls}>
          <div>
            
            <Reaction className={cls.reactions} meReacted={record.meReacted} reactions={record.reactions} recordId={record.id}/>
            
          </div>
        </div>
      </div>
    </div>
  );
};