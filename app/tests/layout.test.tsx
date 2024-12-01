import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestLayout from './layout'; // Шлях до файлу компонента
import { useMessageModal } from '../components/useMessageModal';

// Мокаємо useMessageModal для тесту
jest.mock('../components/useMessageModal');

describe('TestLayout', () => {
    it('opens the message modal when the feedback button is clicked', () => {
        // Мокаємо поведінку хука useMessageModal
        const mockOpenMessageModal = jest.fn();
        const mockMessageModal = <div>Test Modal</div>;
        (useMessageModal as jest.Mock).mockReturnValue([mockOpenMessageModal, mockMessageModal]);

        // Рендеримо компонент
        render(<TestLayout>Test children</TestLayout>);

        // Перевіряємо, що кнопка "Зворотній зв&apos;язок" є на сторінці
        const feedbackButton = screen.getByText('Зворотній зв\'язок');
        expect(feedbackButton).toBeInTheDocument();

        // Симулюємо клік по кнопці
        fireEvent.click(feedbackButton);

        // Перевіряємо, що викликано mockOpenMessageModal
        expect(mockOpenMessageModal).toHaveBeenCalled();

        // Перевіряємо, що модальне вікно відображається
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('renders children properly', () => {
        render(<TestLayout>Test children</TestLayout>);

        // Перевіряємо, що дочірній контент відображається
        expect(screen.getByText('Test children')).toBeInTheDocument();
    });
});
