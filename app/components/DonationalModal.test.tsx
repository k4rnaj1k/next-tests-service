// from useDonationModal.tsx to DonationModal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDonationModal } from './useDonationModal';
import { act } from 'react';

import expect from "expect";
import '@testing-library/jest-dom';
/*
const MockComponent = () => {
    const [openModal, ModalComponent] = useDonationModal();

    return (
        <>
            <button onClick={openModal}>Open Modal</button>
            {ModalComponent}
        </>
    );
};

describe('DonationModal', () => {
    it('renders modal content when open', () => {
        render(<MockComponent />);

        // Відкриваємо модальне вікно
        fireEvent.click(screen.getByText('Open Modal'));

        // Перевіряємо, що текст відображається
        const modalContent = screen.queryByText(/Сайт простий/i);
        expect(modalContent).not.toBeNull(); // Перевірка, що елемент існує
    });

    it('does not render modal content when closed', () => {
        render(<MockComponent />);

        // Перевіряємо, що текст відсутній при закритому модальному вікні
        const modalContent = screen.queryByText(/Сайт простий/i);
        expect(modalContent).toBeNull(); // Перевірка, що елемент відсутній
    });

    it('copies text to clipboard on button click', async () => {
        render(<MockComponent />);

        // Мокаємо буфер обміну
        const originalClipboard = navigator.clipboard;
        const mockClipboard = { writeText: jest.fn() };
        Object.assign(navigator, { clipboard: mockClipboard });

        // Відкриваємо модальне вікно
        fireEvent.click(screen.getByText('Open Modal'));

        // Копіюємо текст
        const copyButton = screen.getByRole('button', { name: /4149499348223015/i });
        await act(async () => {
            fireEvent.click(copyButton);
        });

        // Перевіряємо, що текст копіюється
        expect(mockClipboard.writeText).toHaveBeenCalledWith('4149499348223015');

        // Відновлюємо оригінальний буфер обміну
        Object.assign(navigator, { clipboard: originalClipboard });
    });

    it('closes the modal when clicking outside', () => {
        render(<MockComponent />);

        // Відкриваємо модальне вікно
        fireEvent.click(screen.getByText('Open Modal'));

        // Закриваємо модальне вікно
        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

        // Перевіряємо, що модальне вікно закрилося
        const modalContent = screen.queryByText(/Сайт простий/i);
        expect(modalContent).toBeNull();
    });
});
*/

const MockComponent = () => {
    const [openModal, ModalComponent] = useDonationModal();

    return (
        <>
            <button onClick={openModal}>Open Modal</button>
            {ModalComponent}
        </>
    );
};

describe('DonationModal', () => {
    it('does not render modal content when closed', () => {
        render(<MockComponent />);

        // Перевіряємо, що текст відсутній при закритому модальному вікні
        const modalContent = screen.queryByText(/Сайт простий/i);
        expect(modalContent).toBeNull(); // Перевірка, що елемент відсутній
    });

    it('copies text to clipboard on button click', async () => {
        render(<MockComponent />);

        // Мокаємо буфер обміну
        const originalClipboard = navigator.clipboard;
        const mockClipboard = { writeText: jest.fn() };
        Object.defineProperty(navigator, 'clipboard', {
            value: mockClipboard,
            configurable: true,
        });

        // Відкриваємо модальне вікно
        fireEvent.click(screen.getByText('Open Modal'));

        // Копіюємо текст
        const copyButton = screen.getByRole('button', { name: /4149499348223015/i });
        await act(async () => {
            fireEvent.click(copyButton);
        });

        // Перевіряємо, що текст копіюється
        expect(mockClipboard.writeText).toHaveBeenCalledWith('4149499348223015');

        // Відновлюємо оригінальний буфер обміну
        Object.defineProperty(navigator, 'clipboard', {
            value: originalClipboard,
            configurable: true,
        });
    });

    it('closes the modal when clicking outside', () => {
        render(<MockComponent />);

        // Відкриваємо модальне вікно

        fireEvent.click(screen.getByText('Open Modal'));

        // Симулюємо клік поза модальним вікном
        fireEvent.keyDown(screen.getByText(/Сайт простий/i), {
            key: "Escape",
            code: "Escape",
        });


        // Перевіряємо, що модальне вікно закрилося
        const modalContent = screen.queryByText(/Сайт простий/i);
        expect(modalContent).toBeNull();
    });
});