import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { Button } from 'shared/ui/Button';
import { ChatBubble } from 'features/ChatBubble';
import { Comments } from 'widgets/Comments';
import { FavoriteBubble } from 'features/FavoriteBubble';
import { GetEntity } from '@stud-log/news-types/server/post.response';
import { Interweave } from 'interweave';
import { Layout } from 'shared/ui/Layout';
import { NewsLabel } from 'shared/ui/Cards/NewsCard/components/NewsLabel';
import { Reactions } from 'features/Reactions';
import { RecordFiles } from 'features/RecordFiles';
import { Schedule } from 'widgets/Schedule';
import { UserWithAvatar } from 'shared/ui/UserWithAvatar';
import { addAndEditModalActions } from 'widgets/Modals/ProfileModals/AddAndEditModal/slice';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './SingleNewsPage.module.scss';
import { getStaticLink } from 'shared/lib/helpers/getStaticLink';
import moment from 'moment';
import { pluralize } from 'shared/lib/helpers/dates';
import postService from 'services/post.service';
import { useDispatch } from 'react-redux';
import userService from 'services/user.service';
import { withWidget } from 'shared/hooks/withWidget';

interface SingleNewsPageProps {
  className?: string;
}

const SingleNewsPage: FC<SingleNewsPageProps> = ({ className }) => {
  const { recordId } = useParams();
  const { group, role } = userService.getUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: record,
    error,
    mutate,
  }: SWRResponse<GetEntity> = useSWR(
    recordId ? `/api/record/post/News/${recordId}` : null,
    $apiGet,
  );

  useEffect(() => {
    // add views to record
    if(record) {
      postService.viewPost(record.id).then(() => mutate());
    }
  }, [ record ]);

  const news = record?.news;
  const startDate = moment(news?.createdAt).format('D MMM YYYY').replace('.', '');
  return (
    <Layout.Sticky className={cls.SchedulePage}>
      <Layout.StickyHeader slots={{
        start: <Button outline purpose='back' size='md' onClick={() => navigate(-1)}>Назад</Button>,
        end: <>
          {role.permissions.canEdit && recordId && <Button outline size='md' purpose='edit' className={cls.headerBtn} onClick={() => {dispatch(addAndEditModalActions.openModal({ recordTable: 'News', recordId: Number(recordId) }));}}>Редактировать</Button>}

        </>
      }} />
      <Layout.StickyContent loading={!record}>
        {record && news && <div>
          <div className={cls.topRow}>
            <div className={cls.authorWrapper}>
              <div className={cls.newsAuthor}><UserWithAvatar user={news.author}/></div>
              <div className={cls.labelSpanCircle}>&#9679;</div>
              <div className={cls.newsDate}>{startDate}</div>
            </div>
            <div className={cls.infoLabels}>
              <div className={cls.infoLabel}><NewsLabel label={news.label}/></div>
            </div>
          </div>
          <div className={cls.title}>{news.title}</div>
          {news.coverImage && <div className={cls.coverImage}>
            <img src={getStaticLink(news.coverImage)} alt="cover" />
          </div>}
          <div className={classNames(cls.content, {}, [ 'ck-content' ])}>
            <Interweave content={news.content}/>
          </div>
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
          <div className={cls.comments}>
            <Comments comments={record.comments} recordId={record.id}/>
          </div>
        </div>
        }
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default withWidget(SingleNewsPage, [ Schedule ]);