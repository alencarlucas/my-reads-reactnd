import React from 'react';

const EmptyState = ({ title, description }) => {
  return (
    <div>
      <h3 className={'empty-title'}>{title}</h3>
      <p>{description}</p>
    </div>
  )
};

export default EmptyState;