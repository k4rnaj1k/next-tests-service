import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '@/app/layout'; // Шлях до вашого компонента

describe('Layout', () => {
    it('applies the correct font class to the body', async () => {
        render(<Layout>Test children</Layout>);

        // Дочекаємось, поки клас буде застосовано
        await waitFor(() => {
            const body = document.querySelector('body > div > html > body'); // Перевіряємо клас на правильному body
            expect(body).toHaveClass('inter'); // Перевіряємо на 'inter'
        });
    });

    it('renders children properly', () => {
        render(<Layout>Test children</Layout>);

        // Перевіряємо, що дочірній контент відображається
        expect(screen.getByText('Test children')).toBeInTheDocument();
    });
});




