import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ListItem, ListItemAvatar,Avatar ,ListItemText,Divider} from '@mui/material'
import { getUserList } from '../redux/AuthSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};
const tasks=[1,1,1,1]

export default function UserList({handleClose,open}) {
  const dispatch = useDispatch();
  const { task,auth } = useSelector(store => store);

  useEffect(() => {
    dispatch(getUserList(auth.jwt ))
    
   

  }, [auth.jwt]);
  console.log("auth list user lisr",auth.users);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            tasks.map((item,index)=><div className='flex items-center justify-between w-full' key={index}>
              <>
              <div>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>C</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                  secondary="@codewithzosh"
                  primary={"code with zosh"}/>
                  
                </ListItem>
              </div>
              <div>
                <Button className='customButton'>select</Button>

              </div>

              </>
            </div>)
          }
          
        </Box>
      </Modal>
    </div>
  );
}