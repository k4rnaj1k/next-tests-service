'use client'

import { ContentCopy } from "@mui/icons-material";
import { Box, Button, FormControl, Modal, Snackbar, TextField, Typography, useFormControl, useMediaQuery } from "@mui/material";
import { useState } from "react";
import sendMessage from "../utils/telegramHelper";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    bgcolor: 'background.paper',
    border: '1px solid grey',
    boxShadow: 24,
    p: 4,
};

const MessageModal = ({ isOpen, onClose, onSend }: { isOpen: boolean, onClose: () => void, onSend: () => void }) => {
    const matches = useMediaQuery('min-width:600px');
    const [messageText, setMessageText] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    return <Modal
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
    >
        <Box minWidth="50vw" sx={{ ...style }}>
            <Typography whiteSpace="wrap" variant={!matches ? 'inherit' : 'h6'} component={matches ? "h2" : 'h6'}>
                Є зауваження? Нудно? Можеш написати анонімне повідомлення для адміна.
            </Typography>
            <Box
                m={1}
                width="100%"
                display="flex"
            >
                <TextField
                    onChange={(e) => setMessageText(e.target.value)}
                    id="outlined-textarea"
                    label="Текст повідомлення"
                    error={error}
                    rows={3}
                    multiline
                    required
                    value={messageText}
                    fullWidth
                />
            </Box>
            <Box
                m={1}
                width="100%"
                display="flex"
            >
                <TextField
                    id="outlined-textarea"
                    label="Спосіб зв'язку з тобою(опціонально)"
                    placeholder="Як з тобою зв'язатись? (Тг/пошта)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
            </Box>
            <Button color="success" variant="outlined" onClick={async () => {
                if (messageText == '') {
                    setError(true)
                } else {
                    await sendMessage(messageText, email);
                    onSend()
                    onClose()
                }
            }}>Відправити</Button>
        </Box>
    </Modal>
};

export const useMessageModal = (): [() => void, JSX.Element] => {
    const [modalOpen, setModalOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleClose = (_e: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    };

    const ModalComponent = <><Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Повідомлення відправлене"
    /><MessageModal isOpen={modalOpen} onClose={closeModal} onSend={() => setSnackOpen(true)} /></>
    return [openModal, ModalComponent];
};