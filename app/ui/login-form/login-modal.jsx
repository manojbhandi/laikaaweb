"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from './login-form';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { openModalLogin } from './slice';
import { Slide } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(0),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(0),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginModal() {
  
  const {openLogin} = useAppSelector((state)=>state.authModal);
  const dispatch = useAppDispatch()

  const handleSetFalse = () => {
    dispatch(openModalLogin(false));
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        fullWidth
        maxWidth="md"
        onClose={handleSetFalse}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        open={openLogin}
      >
        <IconButton
          aria-label="close"
          onClick={handleSetFalse}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 999,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
            <LoginForm/>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
