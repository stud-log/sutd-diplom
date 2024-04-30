import { ChatBubble } from 'features/ChatBubble';
import { FC } from 'react';
import { FavoriteBubble } from 'features/FavoriteBubble';
import { FileLabel } from 'shared/ui/FileLabel';
import { GetEntity } from '@stud-log/news-types/server/post.response';
import { Interweave } from 'interweave';
import { NewsLabel } from '../components/NewsLabel';
import { Reactions } from 'features/Reactions';
import { UserWithAvatar } from 'shared/ui/UserWithAvatar';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './NewsCard.module.scss';
import { getStaticLink } from 'shared/lib/helpers/getStaticLink';
import moment from 'moment';
import { pluralize } from 'shared/lib/helpers/dates';
import { transform } from 'shared/lib/helpers/interweave';
import { truncate } from 'shared/lib/helpers/truncateWords';
import { useNavigate } from 'react-router-dom';

interface NewsCardProps extends GetEntity{
  className?: string;
}

export const NewsCard: FC<NewsCardProps> = ({ className, ...record }) => {
  const news = record.news!;
  const startDate = moment(news.createdAt).format('D MMM YYYY').replace('.', '');

  const navigate = useNavigate();
  const goToNews = () => navigate(`/news/${news.id}`);

  return (
    <div className={classNames(cls.NewsCard, {}, [ className ])}>
      <div className={cls.topRow}>
        <div className={cls.authorWrapper}>
          <div className={cls.newsAuthor}><UserWithAvatar user={news.author}/></div>
          <div className={cls.labelSpanCircle}>&#9679;</div>
          <div className={cls.newsDate}>{startDate}</div>
        </div>
        <div className={cls.infoLabels}>
          {record.files.length > 0 && <div className={cls.fileLabel}><FileLabel filesCount={record.files.length}/></div>}
          <div className={cls.infoLabel}><NewsLabel label={news.label}/></div>
        </div>
      </div>
      <div className={cls.title} onClick={goToNews}>{news.title}</div>
      {news.coverImage && <div className={cls.coverImage}>
        <img src={getStaticLink(news.coverImage)} alt="cover" />
      </div>}
      <div className={cls.content} >
        <Interweave content={truncate.apply(news.content, [ 143, false ])} transform={transform} />
      </div>
      <div className={cls.bottomInfo}>
        <div className={cls.controls}>
          <Reactions className={cls.reactions} meReacted={record.meReacted} variant='expanded' reactions={record.reactions} recordId={record.id}/>
          <ChatBubble comments={record.comments} recordId={record.id}/>
          <FavoriteBubble meFavorite={record.meFavorited} favorites={record.favorites} recordId={record.id} />
        </div>
        <div className={cls.views}>{record.views.length} {pluralize(record.views.length, 'просмотр', "просмотра", "просмотров")}</div>
      </div>
    </div>
  );
};