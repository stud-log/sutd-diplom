import { FC, useMemo, useState } from 'react';
import { UserFavorite, UserReaction } from '@stud-log/news-types/models';

import FavoriteIcon from 'shared/assets/img/icons/favorite.svg';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './FavoriteBubble.module.scss';
import postService from 'services/post.service';
import userService from 'services/user.service';

interface ReactionProps {
  className?: string;
  recordId: number;
  meFavorite: boolean;
  favorites: UserFavorite[];
}

export const FavoriteBubble: FC<ReactionProps> = ({ className, meFavorite, recordId, favorites }) => {
  const { id } = userService.getUser();
  const [ _meFavorite, setMeFavorite ] = useState<boolean>(meFavorite);
  const favoritesCount = favorites.filter(i => i.userId != id).length;
  
  return (
    <div className={classNames(cls.Favorite, { [cls.meFavorite]: _meFavorite }, [ className ])}>
      <FavoriteIcon onClick={() => {
        setMeFavorite(!_meFavorite);
        postService.favoritePost(recordId);
      }}/> {_meFavorite ? favoritesCount + 1 : favoritesCount}
    </div>
  );
};