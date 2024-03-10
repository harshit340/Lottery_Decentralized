import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { SignUpButton , SignUp , SignIn } from '@clerk/nextjs';
import { Button } from '@mui/material';
export default function SigninModal({ open, onClose }) {

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius : "15px",
  bgcolor: 'background.paper',
};
    return (
        <div>
            <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={style}>
                <SignIn />
            </Box>
        </Modal>
        </div>
    )
}