import React, { FC } from 'react';

export const withWidget = (PageComponent: FC, Widget: FC) => {
  const WithWidget: FC = () => {
    return (
      <>
        <PageComponent />
        <Widget />
      </>
    );
  };
  return WithWidget;
};

