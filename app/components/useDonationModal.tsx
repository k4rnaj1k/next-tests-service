'use client'

import { ContentCopy } from "@mui/icons-material";
import { Box, Button, Modal, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";


const style = {
    position: 'absolute' as 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    bgcolor: 'background.paper',
    border: '1px solid grey',
    boxShadow: 24,
    p: 4,
};

const DonationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const matches = useMediaQuery('min-width:600px');
    return <Modal
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
    >
        <Box sx={{...style, width: '100wv'}}>
            <Typography whiteSpace="wrap" variant={!matches? 'inherit': 'h6'} component={matches? "h2": 'h6'}>
                Сайт простий, але трохи часу і ресурсів його розробка зайняла, тож якщо хочете віддячити - <Button onClick={() => navigator.clipboard.writeText('4149499348223015')} startIcon={<ContentCopy />}>4149499348223015</Button> 
                (копіюється при натисканні)
            </Typography>
        </Box>
    </Modal>
};

export const useDonationModal = (): [() => void, JSX.Element] => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const ModalComponent = <DonationModal isOpen={modalOpen} onClose={closeModal} />
    return [openModal, ModalComponent];
};