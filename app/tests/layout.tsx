'use client'
import React from 'react';
import { Button, Container, Grid } from "@mui/material";
import { useMessageModal } from "../components/useMessageModal";


export default function TestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [openMessageModal, messageModal] = useMessageModal();

    return (<Container>
        {messageModal}
        <Grid container columnGap={2} pb={2}>
            <Grid item>
            <Button color="success" variant="outlined" onClick={() => openMessageModal()}>Зворотній зв&apos;язок</Button>
            </Grid>
        </Grid>
        {children}
    </Container>)
}