import React from 'react';

//Component used to show loading screen in different scenarios
const Loading = ({loadingText}) => {
  return (
    <div className="loading">
      <h2>{loadingText}</h2>
    </div>
  );
};

export default Loading;