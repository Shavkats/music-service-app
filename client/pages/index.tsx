import React from 'react';
import { Typography } from '@material-ui/core';
import MainLayout from '../layouts/MainLayout';

const Index = () => {
  return (
    <>
      <MainLayout>
        <div className="center">
          <Typography variant='h2' color='textSecondary'>
            Welcome to Music Portal!
          </Typography>
          <Typography variant='h3' color='textSecondary'>
            Great collection of beautiful music!
          </Typography>
        </div>
      </MainLayout>

      <style jsx>
        {`
          .center {
            margin-top: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
};

export default Index;
