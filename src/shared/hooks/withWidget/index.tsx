import React, { FC } from 'react';

export const withWidget = (PageComponent: FC, Widget: FC[]) => {
  const WithWidget: FC = () => {
    return (
      <>
        <PageComponent />
        <div className='widgetsWrapper'>
          {Widget.map((AWidget, index) => <AWidget key={index}/>)}
        </div>
        
      </>
    );
  };
  return WithWidget;
};

