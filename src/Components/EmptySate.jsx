import React from 'react';

const EmptyState = ({ title }) => {
  return (
    <div>
      <h3 className={'empty-title'}>{title}</h3>
    </div>
  )
};

export default EmptyState;