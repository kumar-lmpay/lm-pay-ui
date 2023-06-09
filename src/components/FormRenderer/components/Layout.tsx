import React from 'react';
import { Box } from '@mui/material';

interface ILayout {
  children: JSX.Element | JSX.Element[];
  title: string;
}

export const Layout = ({ children, title }: ILayout) => {
  return (
    <Box className="content-center">
      <h2 className="title">{title}</h2>
      {children}
    </Box>
  );
};
