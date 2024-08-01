"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Signupform from './signup-form';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import {openModalSignup } from './slice';
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
    return <Slide direction="down" ref={ref} {...props} />;
  });

function SignupModal() {

    const openModeltrue = useAppSelector((state)=>state.authModal.openSign);
    const dispatch = useAppDispatch();

    const handleSetFalse = () => {
      dispatch(openModalSignup(false));
    };
  
    return (
      <React.Fragment>
        <BootstrapDialog
          fullWidth
          maxWidth="md"
          open={openModeltrue}
          onClose={handleSetFalse}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="customized-dialog-title"
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
              <Signupform/>
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
    );
  }

export default SignupModal