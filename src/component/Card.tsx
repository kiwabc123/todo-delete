import React, { useEffect, useRef, useState } from 'react';
import { ListType } from '../interface/List';
import { Avatar, Box, keyframes } from '@mui/material';

export const Card = (props: {
  item: ListType;
  idx: number;
  image: string;
  autoDelete?:boolean |false;
  forceDelete?: (item: ListType) => void;
}) => {
  const [isfade,setIsFade ] =useState<boolean>(false)
  const fadeTimer = useRef<NodeJS.Timeout | null>(null);
  const deleteTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!props.autoDelete) return;

    fadeTimer.current = setTimeout(() => setIsFade(true), 4000);

    deleteTimer.current = setTimeout(() => {
      props.forceDelete?.(props.item);
    }, 5000);

    return () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      if (deleteTimer.current) clearTimeout(deleteTimer.current);
    };
  }, [props.autoDelete, props.item, props.forceDelete]);

  return (
    <Box key={props.idx} sx={{ ...itemBoxStyle, animation: isfade?`${fadeOut} 1s linear forwards`:"" }}>
    <Avatar alt={props.item.name} src={props.image} sx={avatarStyle} />
    <span>{props.item.name}</span>
  </Box>
  );
};

const itemBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 10px',
  marginBottom: '4px',
  background: 'linear-gradient(90deg, rgb(254, 249, 242) 0%, rgb(120, 157, 188) 100%)',

  borderRadius: '4px',
  borderBottom: '2px solid #789DBC',
  borderRight: '2px solid #789DBC',
  ':hover': {
    cursor: 'pointer',
  background: 'linear-gradient(90deg, rgb(255, 227, 227) 70%, rgb(254, 249, 242) 100%)',

  },
};
const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;
const avatarStyle = {
  width: '40px',
  height: '40px',
  marginRight: '10px',
};
